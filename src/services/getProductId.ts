// getProductId.ts

import type { ProductDetails } from "../types/ProductDetails";

export function getProductId(productId: string): Promise<ProductDetails> {
  // Гарантуємо, що після BASE_URL завжди є слеш
  const BASE = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return Promise.all([
    fetch(`${BASE}api/aquariums.json`).then((res) => res.json()),
    fetch(`${BASE}api/equipment.json`).then((res) => res.json()),
    fetch(`${BASE}api/fish.json`).then((res) => res.json()),
  ]).then(([aquariums, equipment, fish]) => {
    const allDetails: ProductDetails[] = [...aquariums, ...equipment, ...fish];

    const found = allDetails.find((item) => item.id === productId);

    if (!found) {
      throw new Error("Product not found 😕");
    }

    return found;
  });
}
