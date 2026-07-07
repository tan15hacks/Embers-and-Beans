import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import {
  createAdminSession,
  isAdminAuthenticated,
  validateAdminCredentials,
} from "@/lib/admin-auth";

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!validateAdminCredentials(email, password)) {
    redirect("/admin/login?error=invalid");
  }

  await createAdminSession();
  redirect("/admin/dashboard");
}

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    loggedOut?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin/dashboard");
  }

  const params = await searchParams;
  const hasError = params?.error === "invalid";
  const loggedOut = params?.loggedOut === "1";

  return (
    <main className="min-h-screen bg-[#2B1E18] text-[#FFFDFB]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <div className="flex items-center justify-between">
          <Logo light />
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-[#F8F4EF]/20 px-5 py-2 text-sm font-semibold text-[#F8F4EF]/80 transition hover:bg-[#F8F4EF]/10 hover:text-[#FFFDFB]"
          >
            <ArrowLeft className="mr-2" size={17} /> Back to site
          </Link>
        </div>

        <section className="grid flex-1 place-items-center py-16">
          <div className="w-full max-w-md rounded-[2rem] border border-[#F8F4EF]/10 bg-[#FFFDFB] p-8 text-[#2B1E18] shadow-[0_30px_110px_rgba(0,0,0,0.25)]">
            <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
              <LockKeyhole size={26} />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
              Admin Access
            </p>
            <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-tight">
              Sign in to manage the café.
            </h1>
            <p className="mt-4 leading-7 text-[#4A342A]/70">
              Use the admin credentials from your environment variables.
            </p>

            {hasError && (
              <p className="mt-6 rounded-2xl border border-[#9B3A2F]/20 bg-[#9B3A2F]/10 px-4 py-3 text-sm font-semibold text-[#9B3A2F]">
                Invalid admin email or password.
              </p>
            )}

            {loggedOut && (
              <p className="mt-6 rounded-2xl border border-[#6E7A5C]/20 bg-[#6E7A5C]/10 px-4 py-3 text-sm font-semibold text-[#4F5F3F]">
                You have been signed out.
              </p>
            )}

            <form action={loginAction} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#4A342A]/70">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-14 w-full rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 text-sm text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none"
                  placeholder="admin@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#4A342A]/70">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="h-14 w-full rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 text-sm text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none"
                  placeholder="••••••••••"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#2B1E18] px-8 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]"
              >
                Sign in
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
