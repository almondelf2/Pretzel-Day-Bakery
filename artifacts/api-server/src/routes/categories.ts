import { Router } from "express";
import { db, categoriesTable } from "@workspace/db";
import { ListCategoriesResponse } from "@workspace/api-zod";
import { asc } from "drizzle-orm";

const router = Router();

router.get("/categories", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(categoriesTable)
    .orderBy(asc(categoriesTable.displayOrder));
  res.json(ListCategoriesResponse.parse(rows));
});

export default router;
