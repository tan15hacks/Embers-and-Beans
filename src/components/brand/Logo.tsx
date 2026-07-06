import Link from "next/link";

type LogoProps = {
  light?: boolean;
};

export function Logo({ light = false }: LogoProps) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span
        className={`flex size-12 items-center justify-center rounded-full border ${
          light
            ? "border-[#E5C7A1]/40 bg-[#F8F4EF] text-[#2B1E18]"
            : "border-[#2B1E18]/10 bg-[#2B1E18] text-[#F8F4EF]"
        }`}
      >
        <svg
          viewBox="0 0 64 64"
          className="size-7"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 29h24v8c0 7-5 12-12 12s-12-5-12-12v-8Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M44 32h3a5 5 0 0 1 0 10h-3"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M25 22c-3-4 3-6 0-10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M33 22c-3-4 3-6 0-10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M41 22c-3-4 3-6 0-10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M18 52h28"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className="leading-none">
        <span
          className={`block font-[var(--font-display)] text-3xl font-semibold tracking-tight ${
            light ? "text-[#F8F4EF]" : "text-[#2B1E18]"
          }`}
        >
          Ember & Bean
        </span>
        <span
          className={`mt-1 block text-xs font-bold uppercase tracking-[0.22em] ${
            light ? "text-[#E5C7A1]" : "text-[#B7793C]"
          }`}
        >
          Coffee Co.
        </span>
      </span>
    </Link>
  );
}