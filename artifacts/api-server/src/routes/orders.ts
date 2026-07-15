import { Router } from "express";
import { db, ordersTable, orderItemsTable } from "@workspace/db";
import { CreateOrderBody, CreateOrderResponse, ListOrdersResponse } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/orders", async (req, res): Promise<void> => {
  const orders = await db.select().from(ordersTable).orderBy(ordersTable.createdAt);
  const orderItems = await db.select().from(orderItemsTable);

  const result = orders.map((o) => ({
    ...o,
    eventDate: o.eventDate,
    createdAt: o.createdAt.toISOString(),
    items: orderItems
      .filter((oi) => oi.orderId === o.id)
      .map((oi) => ({ menuItemId: oi.menuItemId, quantity: oi.quantity, notes: oi.notes })),
  }));
  res.json(ListOrdersResponse.parse(result));
});

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { items, ...orderData } = parsed.data;

  const [order] = await db
    .insert(ordersTable)
    .values({
      type: orderData.type,
      customerName: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      eventDate: orderData.eventDate,
      eventLocation: orderData.eventLocation ?? null,
      guestCount: orderData.guestCount ?? null,
      notes: orderData.notes ?? null,
      status: "pending",
    })
    .returning();

  await db.insert(orderItemsTable).values(
    items.map((item) => ({
      orderId: order.id,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      notes: item.notes ?? null,
    }))
  );

  res.status(201).json(
    CreateOrderResponse.parse({
      ...order,
      createdAt: order.createdAt.toISOString(),
      items: items.map((i) => ({ menuItemId: i.menuItemId, quantity: i.quantity, notes: i.notes ?? null })),
    })
  );
});

export default router;
