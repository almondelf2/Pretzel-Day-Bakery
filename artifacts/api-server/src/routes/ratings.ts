import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, ratingsTable, menuItemsTable } from "@workspace/db";
import {
  CreateRatingBody,
  CreateRatingResponse,
  GetMenuItemRatingsParams,
  GetRatingsStatsResponse,
} from "@workspace/api-zod";

const router = Router();

router.get("/menu-items/:id/ratings", async (req, res): Promise<void> => {
  const parsed = GetMenuItemRatingsParams.safeParse({ id: parseInt(req.params.id, 10) });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const rows = await db
    .select()
    .from(ratingsTable)
    .where(eq(ratingsTable.menuItemId, parsed.data.id))
    .orderBy(ratingsTable.createdAt);

  res.json(
    rows.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    }))
  );
});

router.post("/ratings", async (req, res): Promise<void> => {
  const parsed = CreateRatingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { menuItemId, rating, comment, customerName } = parsed.data;
  if (rating < 1 || rating > 5) {
    res.status(400).json({ error: "Rating must be between 1 and 5" });
    return;
  }
  const [row] = await db
    .insert(ratingsTable)
    .values({ menuItemId, rating, comment, customerName })
    .returning();
  res.status(201).json(
    CreateRatingResponse.parse({
      ...row,
      createdAt: row.createdAt.toISOString(),
    })
  );
});

router.get("/ratings/stats", async (req, res): Promise<void> => {
  const allRatings = await db.select().from(ratingsTable);
  const allItems = await db.select().from(menuItemsTable);

  const statsMap = new Map<number, { sum: number; count: number }>();
  for (const r of allRatings) {
    const existing = statsMap.get(r.menuItemId) ?? { sum: 0, count: 0 };
    statsMap.set(r.menuItemId, { sum: existing.sum + r.rating, count: existing.count + 1 });
  }

  const stats = [];
  for (const [menuItemId, { sum, count }] of statsMap.entries()) {
    const item = allItems.find((i) => i.id === menuItemId);
    if (item) {
      stats.push({
        menuItemId,
        menuItemName: item.name,
        averageRating: Math.round((sum / count) * 10) / 10,
        ratingCount: count,
      });
    }
  }

  res.json(GetRatingsStatsResponse.parse(stats));
});

export default router;
