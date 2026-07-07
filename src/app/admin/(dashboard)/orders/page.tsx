import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Mail, MessageSquareText, Phone, ShoppingBag } from "lucide-react";
import { CopyOrderMessageButton } from "@/components/admin/CopyOrderMessageButton";
import { OrdersAutoRefresh } from "@/components/admin/OrdersAutoRefresh";
import { getPrisma } from "@/lib/db";
import { formatPesoAmount } from "@/lib/money";
import { sendOrderStatusNotifications } from "@/lib/order-notifications";

const orderStatuses = ["new", "confirmed", "ready", "completed", "cancelled"];

const statusLabels: Record<string, string> = {
  new: "New",
  confirmed: "Confirmed",
  ready: "Ready",
  completed: "Completed",
  cancelled: "Cancelled",
};

const statusCustomerMessages: Record<string, string> = {
  new: "your pickup order request has been received",
  confirmed: "your pickup order has been confirmed",
  ready: "your pickup order is ready for pickup",
  completed: "your pickup order has been completed. Thank you",
  cancelled: "your pickup order has been cancelled. Please contact us for details",
};

const paymentLabels: Record<string, string> = {
  gcash: "GCash",
  bank: "Bank Transfer",
};

const statusClasses: Record<string, string> = {
  new: "bg-[#B7793C]/15 text-[#B7793C]",
  confirmed: "bg-[#6E7A5C]/15 text-[#4F5F3F]",
  ready: "bg-[#2B1E18] text-[#FFFDFB]",
  completed: "bg-[#6E7A5C]/20 text-[#4F5F3F]",
  cancelled: "bg-[#9B3A2F]/10 text-[#9B3A2F]",
};

type AdminOrdersPageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

type OrderItemRecord = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  lineTotal: number;
};

type OrderRecord = {
  id: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  pickupTime: string;
  paymentMethod: string;
  notes: string | null;
  status: string;
  totalAmount: number;
  createdAt: Date;
  items: OrderItemRecord[];
};

type OrderDelegate = {
  findMany: (args: unknown) => Promise<OrderRecord[]>;
  update: (args: unknown) => Promise<OrderRecord>;
};

type PrismaWithOrder = ReturnType<typeof getPrisma> & {
  order?: OrderDelegate;
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getOrderDelegate() {
  const prisma = getPrisma() as PrismaWithOrder;
  return prisma.order ?? null;
}

function formatPickupTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function getOrderItemsText(order: OrderRecord) {
  return order.items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(", ");
}

function getManualSmsMessage(order: OrderRecord) {
  const statusText =
    statusCustomerMessages[order.status] ?? `your pickup order status is now ${order.status}`;
  const paymentLabel = paymentLabels[order.paymentMethod] ?? order.paymentMethod;
  const itemText = getOrderItemsText(order);

  return `Hi ${getFirstName(order.customerName)}, ${statusText}. Pickup: ${formatPickupTime(order.pickupTime)}. Total: ${formatPesoAmount(order.totalAmount)}. Payment: ${paymentLabel}. Items: ${itemText}. - Ember & Bean`;
}

function getSmsHref(order: OrderRecord) {
  const phone = order.customerPhone?.trim() ?? "";
  return `sms:${phone}?&body=${encodeURIComponent(getManualSmsMessage(order))}`;
}

async function updateOrderStatus(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const status = getString(formData, "status");

  if (!orderStatuses.includes(status)) {
    return;
  }

  const order = getOrderDelegate();

  if (!order) {
    return;
  }

  const updatedOrder = await order.update({
    where: { id },
    data: { status },
    include: { items: true },
  });

  await sendOrderStatusNotifications({
    id: updatedOrder.id,
    customerName: updatedOrder.customerName,
    customerEmail: updatedOrder.customerEmail,
    customerPhone: updatedOrder.customerPhone,
    pickupTime: formatPickupTime(updatedOrder.pickupTime),
    paymentMethod: updatedOrder.paymentMethod,
    totalAmount: updatedOrder.totalAmount,
    status: updatedOrder.status,
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin/dashboard");
}

async function getOrders(status?: string) {
  try {
    const order = getOrderDelegate();

    if (!order) {
      return { databaseReady: false, orders: [] as OrderRecord[] };
    }

    const orders = await order.findMany({
      where: status && status !== "all" ? { status } : undefined,
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

    return { databaseReady: true, orders };
  } catch (error) {
    console.error("Admin orders error", error);
    return { databaseReady: false, orders: [] as OrderRecord[] };
  }
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const params = (await searchParams) ?? {};
  const selectedStatus = params.status ?? "all";
  const { databaseReady, orders } = await getOrders(selectedStatus);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
            Orders
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
            Pickup order queue.
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-[#4A342A]/75">
            Review incoming pickup requests, see ordered items, and move each order through the shop workflow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <OrdersAutoRefresh intervalMs={8000} />
          <Link
            href="/order"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#2B1E18] px-6 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]"
          >
            Test order page
          </Link>
        </div>
      </div>

      {!databaseReady && (
        <div className="mt-8 rounded-[2rem] border border-[#9B3A2F]/20 bg-[#9B3A2F]/10 p-5 text-sm font-semibold leading-7 text-[#9B3A2F]">
          Ordering database is not ready yet. Run <code>npx prisma generate</code> and <code>npx prisma db push</code>, then restart the dev server.
        </div>
      )}

      <section className="mt-8 rounded-[1.5rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-5 shadow-[0_18px_70px_rgba(43,30,24,0.05)]">
        <form method="get" className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label htmlFor="status" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#4A342A]/60">
              Filter by status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={selectedStatus}
              className="h-11 w-full rounded-xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-3 text-sm text-[#2B1E18] focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none"
            >
              <option value="all">All orders</option>
              {orderStatuses.map((status) => (
                <option key={status} value={status}>{statusLabels[status]}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="h-11 rounded-full bg-[#2B1E18] px-6 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]">
            Apply
          </button>
        </form>
      </section>

      <section className="mt-8 space-y-5">
        {orders.length === 0 ? (
          <div className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 text-[#4A342A]/75 shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
            {databaseReady ? "No orders yet. Submit a test pickup order from the public order page." : "Orders will appear here after the ordering database is synced."}
          </div>
        ) : (
          orders.map((order) => {
            const manualSmsMessage = getManualSmsMessage(order);

            return (
              <article key={order.id} className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-6 shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="flex items-start gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
                      <ShoppingBag size={26} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-[var(--font-display)] text-3xl font-semibold">
                          {order.customerName}
                        </h2>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${statusClasses[order.status] ?? statusClasses.new}`}>
                          {statusLabels[order.status] ?? order.status}
                        </span>
                      </div>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#4A342A]/75">
                        <Phone size={15} /> {order.customerPhone || "No phone"}
                      </p>
                      {order.customerEmail && (
                        <p className="mt-2 text-sm text-[#4A342A]/55">
                          {order.customerEmail}
                        </p>
                      )}
                      <p className="mt-2 text-sm font-semibold text-[#4A342A]/75">
                        Pickup: {formatPickupTime(order.pickupTime)}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#B7793C]">
                        Payment: {paymentLabels[order.paymentMethod] ?? order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="text-left lg:text-right">
                    <p className="font-[var(--font-display)] text-4xl font-semibold">
                      {formatPesoAmount(order.totalAmount)}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#4A342A]/50">
                      {order.createdAt.toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-[#F8F4EF] p-4">
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-[#4A342A]/80">
                          {item.quantity}× {item.name} <span className="text-[#4A342A]/45">· {item.category}</span>
                        </span>
                        <span className="font-semibold text-[#2B1E18]">
                          {formatPesoAmount(item.lineTotal)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {order.notes && (
                    <p className="mt-4 border-t border-[#2B1E18]/10 pt-4 text-sm leading-6 text-[#4A342A]/75">
                      Notes: {order.notes}
                    </p>
                  )}
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                  <form action={updateOrderStatus} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                    <input type="hidden" name="id" value={order.id} />
                    <div>
                      <label htmlFor={`${order.id}-status`} className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#4A342A]/60">
                        Update status
                      </label>
                      <select
                        key={`${order.id}-${order.status}`}
                        id={`${order.id}-status`}
                        name="status"
                        defaultValue={order.status}
                        className="h-11 w-full rounded-xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-3 text-sm text-[#2B1E18] focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none"
                      >
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>{statusLabels[status]}</option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="h-11 rounded-full bg-[#2B1E18] px-6 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]">
                      Save
                    </button>
                  </form>

                  <div className="flex flex-wrap gap-3">
                    {order.customerEmail && (
                      <Link
                        href={`mailto:${order.customerEmail}`}
                        className="inline-flex h-11 items-center justify-center rounded-full border border-[#2B1E18]/10 px-6 text-sm font-semibold text-[#4A342A]/70 transition hover:bg-[#F8F4EF]"
                      >
                        <Mail className="mr-2" size={16} /> Email
                      </Link>
                    )}
                    {order.customerPhone && (
                      <>
                        <Link
                          href={getSmsHref(order)}
                          className="inline-flex h-11 items-center justify-center rounded-full border border-[#2B1E18]/10 px-6 text-sm font-semibold text-[#4A342A]/70 transition hover:bg-[#F8F4EF]"
                        >
                          <MessageSquareText className="mr-2" size={16} /> SMS
                        </Link>
                        <CopyOrderMessageButton message={manualSmsMessage} />
                        <Link
                          href={`tel:${order.customerPhone}`}
                          className="inline-flex h-11 items-center justify-center rounded-full border border-[#2B1E18]/10 px-6 text-sm font-semibold text-[#4A342A]/70 transition hover:bg-[#F8F4EF]"
                        >
                          <Phone className="mr-2" size={16} /> Call
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
