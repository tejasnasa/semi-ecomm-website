import { Router } from "express";
import { prisma } from "..//lib/prisma";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const { category, subcategory } = req.query;

  const products = await prisma.product.findMany({
    where: {
      ...(category && { category: String(category) }),
      ...(subcategory && { subcategory: String(subcategory) }),
    },
  });

  res.json(products).status(200);
});

productRouter.get("/:partNo", async (req, res) => {
  const { partNo } = req.params;

  const products = await prisma.product.findMany({
    where: { partNo },
  });

  res.json(products).status(200);
});

export default productRouter;
