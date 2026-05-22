import axios from "axios";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL)
      .then((res) => setProducts(res.data))
      .then((res) => console.log(res))
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
