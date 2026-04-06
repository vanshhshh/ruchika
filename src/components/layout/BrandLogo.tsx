import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
  sizes?: string;
  variant?: "framed" | "immersive";
};

function BrandLogoImage({
  className,
  imageClassName,
  preload,
  sizes,
  variant = "framed",
}: Omit<BrandLogoProps, "href">) {
  return (
    <div className={cn("w-38", className)}>
      <Image
        src="/brand-logo-removebg.png"
        alt="Nourished with Ruchika Chawla logo"
        width={500}
        height={500}
        preload={preload}
        sizes={sizes}
        className={cn(
          variant === "framed"
            ? "h-auto w-full object-contain drop-shadow-[0_16px_32px_rgba(37,48,20,0.12)]"
            : "h-auto w-full object-contain drop-shadow-[0_20px_42px_rgba(37,48,20,0.22)] brightness-[1.03] contrast-[1.04] saturate-[1.05]",
          imageClassName
        )}
      />
    </div>
  );
}

export default function BrandLogo({
  href = "/",
  className,
  imageClassName,
  preload,
  sizes,
  variant,
}: BrandLogoProps) {
  const logo = (
    <BrandLogoImage
      className={className}
      imageClassName={imageClassName}
      preload={preload}
      sizes={sizes}
      variant={variant}
    />
  );

  if (!href) {
    return logo;
  }

  return (
    <Link
      href={href}
      aria-label="Go to the homepage"
      className="inline-flex items-center justify-center"
    >
      {logo}
    </Link>
  );
}
