type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
        {eyebrow}
      </p>

      <h2 className="mt-5 font-display text-5xl font-semibold leading-tight md:text-7xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-muted">
          {description}
        </p>
      )}
    </div>
  );
}