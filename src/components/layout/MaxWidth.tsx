import { cn } from "@/lib/utils";

type MaxWidthProps = {
  children: React.ReactNode;
  className?: string;
};

export function MaxWidth({ children, className }: MaxWidthProps) {
  return (
    <div className={cn("mx-auto max-w-5xl", className)}>
      {children}
    </div>
  );
}