import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { parsePesoAmount } from "@/lib/money";

type OrderPayload = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  pickupTime?: string;
  notes?: string;
  items?: Array<{
    id?: string;
    quantity?: number;
  }>;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload;
    const customerName = String(body.customerName ?? "").trim();
    const customerEmail = String(body.customerEmail ?? "").trim();
    const customerPhone = String(body.customerPhone ?? "").trim();
    const pickupTime = String(body.pickupTime ?? "").trim();
    const notes = String(body.notes ?? "").trim();
    const submittedItems = Array.isArray(body.items) ? body.items : [];

    if (customerName.length < 2) {
      return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(customerEmail)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    if (pickupTime.length < 3) {
      return NextResponse.json({ message: "Please enter your preferred pickup time." }, { status: 400 });
    }

    const requestedItems = submittedItems
      .map((item) => ({
        id: String(item.id ?? ""),
        quantity: Math.max(0, Math.min(99, Number(item.quantity ?? 0))),
      }))
      .filter((item) => item.id && item.quantity > 0);

    if (requestedItems.length === 0) {
      return NextResponse.json({ message: "Please choose at least one item." }, { status: 400 });
    }

    const prisma = getPrisma();
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: requestedItems.map((item) => item.id),
        },
        active: true,
      },
    });

    if (menuItems.length === 0) {
      return NextResponse.json({ message: "Selected items are no longer available." }, { status: 400 });
    }

    const menuItemMap = new Map(menuItems.map((item) => [item.id, item]));
    const orderItems = requestedItems.flatMap((requestedItem) => {
      const menuItem = menuItemMap.get(requestedItem.id);

      if (!menuItem) {
        return [];
      }

      const unitPrice = parsePesoAmount(menuItem.price);

      return [
        {
          menuItemId: menuItem.id,
          name: menuItem.name,
          category: menuItem.category,
          unitPrice,
          quantity: requestedItem.quantity,
          lineTotal: unitPrice * requestedItem.quantity,
        },
      ];
    });

    if (orderItems.length === 0) {
      return NextResponse.json({ message: "Selected items are no longer available." }, { status: 400 });
    }

    const totalAmount = orderItems.reduce((total, item) => total + item.lineTotal, 0);

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        pickupTime,
        notes: notes || null,
        totalAmount,
        items: {
          create: orderItems,
        },
      },
    });

    return NextResponse.json({
      message: "Order request received. We will confirm availability by email.",
      orderId: order.id,
      totalAmount,
    });
  } catch (error) {
    console.error("Order submit error", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
