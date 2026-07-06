import Image from "next/image";
import { cn } from "@/lib/utils";

export type ProductCardProps = {
  name: string;
  description: string;
  price: string;
  image?: string;
  imageAlt?: string;
  priority?: boolean;
  className?: string;
};

export function ProductCard({
  name,
  description,
  price,
  image,
  imageAlt,
  priority = false,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[2rem] border border-[#2B1E18]/10 bg-[#F8F4EF] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(43,30,24,0.12)]",
        className,
      )}
    >
      <div className="relative mb-7 h-64 overflow-hidden rounded-[1.5rem] bg-[#E5C7A1]">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[#B7793C]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E18]/35 via-transparent to-transparent" />
      </div>

      <div className="flex items-start justify-between gap-4 px-2 pb-3">
        <div>
          <h3 className="font-[var(--font-display)] text-3xl font-semibold leading-tight">
            {name}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#4A342A]/75">{description}</p>
        </div>

        <span className="rounded-full bg-[#2B1E18] px-4 py-2 text-sm font-semibold text-[#FFFDFB]">
          {price}
        </span>
      </div>
    </article>
  );
}
