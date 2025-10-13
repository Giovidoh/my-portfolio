import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  variantStyle?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
  isLink?: boolean;
  href?: string;
  onClick?: (e: any) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const BaseButton: FC<BaseButtonProps> = ({
  variantStyle = "primary",
  size = "md",
  className,
  children,
  isLink = false,
  href,
  onClick,
  type,
  disabled,
  ...restProps
}) => {
  let style =
    variantStyle === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/80 leading-0"
      : variantStyle === "secondary"
      ? "bg-black text-white hover:bg-primary leading-0"
      : variantStyle === "outline"
      ? "border border-[#5B5B5B] bg-transparent hover:bg-primary hover:text-white hover:border-primary text-black"
      : variantStyle === "ghost"
      ? "border-none bg-transparent hover:text-primary text-[#505050] hover:bg-white"
      : "";

  if (size === "sm") {
    style +=
      " px-[clamp(10px,_3vw,_15px)] h-[clamp(30px,_0.909rem_+_1.7vw,_35px)] text-sm";
  } else if (size === "lg") {
    // You can add lg-specific styles here if needed
  } // else (md) doesn't add anything extra.

  if (isLink) {
    return (
      <Link
        href={href || "#"}
        className={cn(
          "flex h-[clamp(35px,_0.909rem_+_1.7vw,_40px)] w-fit items-center justify-center gap-2 rounded-full px-[clamp(20px,_3vw,_32px)] text-center text-[clamp(14px,_1.5vw,_16px)] shadow-none transition duration-300",
          style,
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <Button
      className={cn(
        "h-[clamp(35px,_0.909rem_+_1.7vw,_40px)] w-fit cursor-pointer rounded-full px-[clamp(20px,_3vw,_32px)] text-[clamp(14px,_1.5vw,_16px)] shadow-none transition duration-300",
        style,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
