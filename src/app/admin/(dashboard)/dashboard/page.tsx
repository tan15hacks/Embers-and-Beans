import Link from "next/link";
import { ArrowRight, Coffee, Mail, MessageSquareText, Settings } from "lucide-react";
import { getPrisma } from "@/lib/db";

async function getDashboardStats() {
  try {
    const prisma = getPrisma();

    const [menuItems, messages, faqs, settings] = await Promise.all([
      prisma.menuItem.count(),
      prisma.contactMessage.count(),
      prisma.faq.count(),
      prisma.siteSetting.count(),
    ]);

    return {
      databaseReady: true,
      menuItems,
      messages,
      faqs,
      settings,
    };
  } catch (error) {
    console.error("Admin dashboard stats error", error);

    return {
      databaseReady: false,
      menuItems: 0,
      messages: 0,
      faqs: 0,
      settings: 0,
    };
  }
}

const quickActions = [
  {
    title: "Manage menu",
    description: "Add drinks, pastries, prices, categories, and featured items.",
    href: "/admin/menu",
    icon: Coffee,
  },
  {
    title: "Read messages",
    description: "Review pickup orders, visit questions, and event inquiries.",
    href: "/admin/messages",
    icon: Mail,
  },
  {
    title: "Edit FAQs",
    description: "Keep customer answers updated without changing code.",
    href: "/admin/faqs",
    icon: MessageSquareText,
  },
  {
    title: "Shop settings",
    description: "Prepare the admin area for hours, contact details, and promos.",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: "Menu items", value: stats.menuItems },
    { label: "Messages", value: stats.messages },
    { label: "FAQs", value: stats.faqs },
    { label: "Settings", value: stats.settings },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
            Admin Dashboard
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
            Manage Ember & Bean.
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-[#4A342A]/75">
            This is the foundation for editing content, checking customer messages, and turning the static café website into a client-ready admin system.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#2B1E18] px-6 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]"
        >
          Test public form
        </Link>
      </div>

      {!stats.databaseReady && (
        <div className="mt-8 rounded-[2rem] border border-[#9B3A2F]/20 bg-[#9B3A2F]/10 p-5 text-sm font-semibold leading-7 text-[#9B3A2F]">
          Database connection is not available yet. Add DATABASE_URL and DIRECT_URL to Vercel, then redeploy.
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => (
          <article
            key={item.label}
            className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-6 shadow-[0_18px_70px_rgba(43,30,24,0.06)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4A342A]/60">
              {item.label}
            </p>
            <p className="mt-4 font-[var(--font-display)] text-5xl font-semibold">
              {item.value}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {quickActions.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-6 shadow-[0_18px_70px_rgba(43,30,24,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_90px_rgba(43,30,24,0.1)]"
          >
            <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
              <item.icon size={24} />
            </div>
            <h2 className="font-[var(--font-display)] text-3xl font-semibold">
              {item.title}
            </h2>
            <p className="mt-3 leading-7 text-[#4A342A]/70">{item.description}</p>
            <span className="mt-6 inline-flex items-center text-sm font-semibold text-[#B7793C]">
              Open <ArrowRight className="ml-2 transition group-hover:translate-x-1" size={17} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
