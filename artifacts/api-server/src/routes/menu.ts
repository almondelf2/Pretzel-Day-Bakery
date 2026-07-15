import { Router } from "express";
import { eq, avg, count, sql } from "drizzle-orm";
import { db, menuItemsTable, categoriesTable, ratingsTable } from "@workspace/db";
import {
  ListMenuItemsQueryParams,
  ListMenuItemsResponse,
  GetMenuItemParams,
  GetMenuItemResponse,
  GetFeaturedMenuItemsResponse,
  GetMenuSummaryResponse,
} from "@workspace/api-zod";

const router = Router();

async function getItemsWithRatings(whereClause?: ReturnType<typeof eq>) {
  const items = whereClause
    ? await db
        .select()
        .from(menuItemsTable)
        .innerJoin(categoriesTable, eq(menuItemsTable.categoryId, categoriesTable.id))
        .where(whereClause)
    : await db
        .select()
        .from(menuItemsTable)
        .innerJoin(categoriesTable, eq(menuItemsTable.categoryId, categoriesTable.id));

  const allRatings = await db.select().from(ratingsTable);

  return items.map((row) => {
    const itemRatings = allRatings.filter((r) => r.menuItemId === row.menu_items.id);
    const ratingCount = itemRatings.length;
    const averageRating =
      ratingCount > 0
        ? Math.round((itemRatings.reduce((sum, r) => sum + r.rating, 0) / ratingCount) * 10) / 10
        : null;

    return {
      id: row.menu_items.id,
      name: row.menu_items.name,
      description: row.menu_items.description,
      price: parseFloat(row.menu_items.price),
      imageUrl: row.menu_items.imageUrl,
      available: row.menu_items.available,
      featured: row.menu_items.featured,
      categoryId: row.menu_items.categoryId,
      categoryName: row.categories.name,
      averageRating,
      ratingCount,
    };
  });
}

router.get("/menu-items", async (req, res): Promise<void> => {
  const queryParams = ListMenuItemsQueryParams.safeParse({
    categoryId: req.query.categoryId !== undefined ? parseInt(req.query.categoryId as string, 10) : undefined,
  });
  if (!queryParams.success) {
    res.status(400).json({ error: queryParams.error.message });
    return;
  }
  const { categoryId } = queryParams.data;
  const whereClause = categoryId != null ? eq(menuItemsTable.categoryId, categoryId) : undefined;
  const items = await getItemsWithRatings(whereClause);
  res.json(ListMenuItemsResponse.parse(items));
});

router.get("/menu-items/featured", async (req, res): Promise<void> => {
  const items = await getItemsWithRatings(eq(menuItemsTable.featured, true));
  res.json(GetFeaturedMenuItemsResponse.parse(items));
});

router.get("/menu-items/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const parsed = GetMenuItemParams.safeParse({ id: parseInt(raw, 10) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const items = await getItemsWithRatings(eq(menuItemsTable.id, parsed.data.id));
  if (items.length === 0) {
    res.status(404).json({ error: "Menu item not found" });
    return;
  }
  res.json(GetMenuItemResponse.parse(items[0]));
});

router.get("/menu-summary", async (req, res): Promise<void> => {
  const categories = await db
    .select()
    .from(categoriesTable)
    .orderBy(categoriesTable.displayOrder);

  const allItems = await getItemsWithRatings();

  const totalItems = allItems.length;
  const categorySummaries = categories.map((cat) => {
    const catItems = allItems.filter((i) => i.categoryId === cat.id);
    return {
      id: cat.id,
      name: cat.name,
      itemCount: catItems.length,
      items: catItems,
    };
  });

  res.json(
    GetMenuSummaryResponse.parse({
      totalItems,
      categories: categorySummaries,
    })
  );
});

export default router;
