// ProductDetails;

export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;

  // Варіанти вибору:
  capacityAvailable: string[]; // Розміри рибок ("3-5cm", "6-8cm") або об'єми ("60L", "120L")
  capacity: string;
  colorsAvailable: string[]; // Варіанти забарвлення або кольори обладнання
  color: string;

  priceRegular: number;
  priceDiscount: number;
  images: string[];

  // Блок "About" (заголовок + параграфи)
  description: {
    title: string;
    text: string[];
  }[];

  // Основні параметри для таблиці "Tech specs":
  origin: string; // Походження (напр. "Amazon")
  waterTemp: string; // Температура води (напр. "24-28°C")
  phRange: string; // pH (напр. "6.5 - 7.5")
  minTankVolume: string; // Мін. об'єм (напр. "100L")
  adultSize: string; // Макс. розмір (напр. "15 cm")
  temperament: string; // Характер (напр. "Peaceful")
  careLevel: string; // Складність (напр. "Easy")
  diet: string; // Тип харчування (напр. "Omnivore")
}
