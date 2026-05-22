import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import axios from "axios"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const grouped = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) acc[product.category] = {};
      if (!acc[product.category][product.subcategory])
        acc[product.category][product.subcategory] = [];
      acc[product.category][product.subcategory].push(product);
      return acc;
    },
    {} as Record<string, Record<string, Product[]>>,
  );

  return { products, grouped, loading };
}
