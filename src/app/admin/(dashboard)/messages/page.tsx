import { contactTopicLabels } from "@/lib/contact";
import { getPrisma } from "@/lib/db";

async function getMessages() {
  try {
    const prisma = getPrisma();

    return await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });
  } catch (error) {
    console.error("Admin messages error", error);
    return [];
  }
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
        Messages
      </p>
      <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
        Contact inquiries.
      </h1>
      <p className="mt-5 max-w-2xl leading-8 text-[#4A342A]/75">
        Review pickup orders, event box requests, visit questions, and general customer messages submitted from the public contact form.
      </p>

      <div className="mt-10 space-y-5">
        {messages.length === 0 ? (
          <div className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 text-[#4A342A]/75 shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
            No messages yet. Submit a test message from the public contact page after DATABASE_URL is configured in Vercel.
          </div>
        ) : (
          messages.map((message) => (
            <article
              key={message.id}
              className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-6 shadow-[0_18px_70px_rgba(43,30,24,0.06)]"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#B7793C]">
                    {contactTopicLabels[message.topic as keyof typeof contactTopicLabels] ?? message.topic}
                  </p>
                  <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold">
                    {message.name}
                  </h2>
                  <p className="mt-2 text-sm text-[#4A342A]/65">
                    {message.email} {message.phone ? `· ${message.phone}` : ""}
                  </p>
                </div>
                <div className="rounded-full bg-[#F8F4EF] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#4A342A]/60">
                  {message.createdAt.toLocaleString("en-PH", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>

              {message.visitDate && (
                <p className="mt-5 rounded-2xl bg-[#F8F4EF] px-4 py-3 text-sm font-semibold text-[#4A342A]/75">
                  Preferred date/time: {message.visitDate}
                </p>
              )}

              <p className="mt-5 whitespace-pre-wrap leading-8 text-[#4A342A]/75">
                {message.message}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
