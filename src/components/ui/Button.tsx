import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  const base =
    "inline-flex h-14 items-center justify-center rounded-full px-8 text-sm font-semibold transition-all duration-300";

  const styles = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 shadow-[var(--shadow-soft)]",
    secondary:
      "border border-[color:var(--border)] bg-surface text-foreground hover:bg-background",
  };

  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {children}
    </Link>
  );
}