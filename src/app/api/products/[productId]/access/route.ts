import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { PRODUCTS } from "@/lib/data";
import { getAuthOptions } from "@/lib/authOptions";
import { getDatabase } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const product = PRODUCTS.find((item) => item.id === productId);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const session = await getServerSession(getAuthOptions());
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const db = await getDatabase();
  const purchases = db.collection("purchases");
  const purchase = await purchases.findOne({
    userEmail,
    productId: product.id,
    paymentStatus: "paid",
  });

  if (!purchase) {
    return NextResponse.json({ error: "You have not purchased this product." }, { status: 403 });
  }

  const storageRoot = "protected-products";
  const configuredSubdir = process.env.DIGITAL_PRODUCTS_DIR?.trim();
  const scopedSegments =
    configuredSubdir && configuredSubdir !== storageRoot
      ? configuredSubdir.split(/[\\/]+/).filter(Boolean)
      : [];
  const filePath = path.join(
    process.cwd(),
    storageRoot,
    ...scopedSegments,
    product.storagePath
  );

  try {
    await access(filePath);
  } catch {
    return NextResponse.json(
      {
        error: "Product file not found on server.",
      },
      { status: 404 }
    );
  }

  const fileBuffer = await readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();

  const contentType =
    ext === ".pdf"
      ? "application/pdf"
      : ext === ".epub"
      ? "application/epub+zip"
      : "application/octet-stream";

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${path.basename(filePath)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
