// .. Product.ts
export type Category = "aquariums" | "fish" | "equipment";

export interface Product {
  id: string; // У вашому JSON id — це string, наприклад "aquarium-clearsea-60"
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  mainSpec: string; // Наприклад: "60 Л", "12 см", "700 L/h"
  sizeOrVolume: string; // Наприклад: "60L", "Medium", "250L"
  color: string; // Наприклад: "black", "blue", "silver"
  typeOrMaterial: string; // Наприклад: "Glass 6mm", "Peaceful", "15 W"
  year: number;
  image: string;
}
