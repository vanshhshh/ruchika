import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
  sizes?: string;
};

function BrandLogoImage({
  className,
  imageClassName,
  preload,
  sizes,
}: Omit<BrandLogoProps, "href">) {
  return (
    <div
      className={cn(
        "w-[9.5rem] rounded-[1.75rem] border border-sage-200/70 bg-white/90 p-1.5 shadow-[0_18px_40px_rgba(121,138,114,0.16)] backdrop-blur-sm",
        className
      )}
    >
      <Image
        src="/brand-logo-trimmed.jpg"
        alt="Nourished with Ruchika Chawla logo"
        width={756}
        height={653}
        preload={preload}
        sizes={sizes}
        className={cn("h-auto w-full rounded-[1.2rem]", imageClassName)}
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
}: BrandLogoProps) {
  const logo = (
    <BrandLogoImage
      className={className}
      imageClassName={imageClassName}
      preload={preload}
      sizes={sizes}
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
