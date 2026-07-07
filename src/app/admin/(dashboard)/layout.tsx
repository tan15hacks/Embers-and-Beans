import Link from "next/link";
import { redirect } from "next/navigation";
import { Coffee, LayoutDashboard, LogOut, Mail, MessageSquareText, Settings, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { clearAdminSession, requireAdmin } from "@/lib/admin-auth";

async function logoutAction() {
  "use server";

  await clearAdminSession();
  redirect("/admin/login?loggedOut=1");
}

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menu", icon: Coffee },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/faqs", label: "FAQs", icon: MessageSquareText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-[#F8F4EF] text-[#2B1E18]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-[#2B1E18]/10 bg-[#2B1E18] p-6 text-[#FFFDFB] lg:sticky lg:top-0 lg:h-screen lg:self-start lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-[#2B1E18]/10">
          <div className="flex items-center justify-between gap-4 lg:block">
            <Logo light />
            <Link
              href="/"
              className="rounded-full border border-[#F8F4EF]/20 px-4 py-2 text-xs font-semibold text-[#F8F4EF]/70 transition hover:bg-[#F8F4EF]/10 hover:text-[#FFFDFB] lg:mt-8 lg:inline-flex"
            >
              View site
            </Link>
          </div>

          <nav className="mt-8 grid gap-2" aria-label="Admin navigation">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#F8F4EF]/70 transition hover:bg-[#FFFDFB]/10 hover:text-[#FFFDFB]"
              >
                <link.icon size={18} /> {link.label}
              </Link>
            ))}
          </nav>

          <form action={logoutAction} className="mt-8">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-2xl border border-[#F8F4EF]/10 px-4 py-3 text-sm font-semibold text-[#F8F4EF]/70 transition hover:bg-[#FFFDFB]/10 hover:text-[#FFFDFB]"
            >
              <LogOut size={18} /> Sign out
            </button>
          </form>
        </aside>

        <section className="p-6 sm:p-8 lg:p-10">{children}</section>
      </div>
    </main>
  );
}
