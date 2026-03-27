import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-300",
  {
    variants: {
      variant: {
        default: "bg-sage-600 text-white hover:bg-sage-700",
        secondary: "bg-sage-100 text-sage-700 hover:bg-sage-200",
        outline: "border border-sage-300 text-sage-700 hover:bg-sage-50",
        ghost: "text-sage-700 hover:bg-sage-100",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
