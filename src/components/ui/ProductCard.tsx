type ProductCardProps = {
  title: string;
  description: string;
  price: string;
  tag?: string;
  image?: string;
};

export function ProductCard({
  title,
  description,
  price,
  tag,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-surface transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-soft)]">
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-secondary to-primary transition-transform duration-700 group-hover:scale-105" />

        {tag && (
          <span className="absolute left-5 top-5 rounded-full bg-primary/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground backdrop-blur">
            {tag}
          </span>
        )}
      </div>

      <div className="space-y-5 p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-3xl font-semibold">
            {title}
          </h3>

          <span className="rounded-full bg-background px-4 py-2 text-sm font-bold text-secondary">
            {price}
          </span>
        </div>

        <p className="leading-7 text-muted/80">
          {description}
        </p>
      </div>
    </article>
  );
}