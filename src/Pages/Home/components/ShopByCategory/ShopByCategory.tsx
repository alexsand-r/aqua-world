// .. ShopByCategory.tsx
import styles from "./ShopByCategory.module.scss";
import { Link } from "react-router-dom";
import type { Product } from "../../../../types/Product";

import fishImg from "../../../../assets/images/category/fish.png";
import aquariumsImg from "../../../../assets/images/category/aquariums.png";
import equipmentImg from "../../../../assets/images/category/equipment.png";

interface ShopByCategoryProps {
  products: Product[];
}

export const ShopByCategory = ({ products }: ShopByCategoryProps) => {
  const fish = products.filter((item) => item.category === "fish");
  const aquariums = products.filter((item) => item.category === "aquariums");
  const equipment = products.filter((item) => item.category === "equipment");

  return (
    <section className={styles.shopByCategory}>
      <div className="shopByCategory__container">
        <div className={styles.body}>
          <h2 className={`${styles.title} section-title-h2`}>
            Shop by category
          </h2>
          <ul className={styles.list}>
            <li className={styles.li}>
              <Link to="/fish" className={styles.link}>
                {/* 1. Створюємо фоновий блок-обгортку навколо картинки */}
                <div className={styles.imageWrapper}>
                  <img
                    src={fishImg}
                    alt="category-fish"
                    className={styles.image}
                  />
                </div>

                {/* 2. Опис залишається ПОЗА фоновим блоком */}
                <div className={styles.description}>
                  <h3 className={styles.descriptionTitle}>Fish</h3>
                  <p className={styles.descriptionModels}>
                    <span>{fish.length}</span> products
                  </p>
                </div>
              </Link>
            </li>
            <li className={styles.li}>
              <Link to="/aquariums" className={styles.link}>
                <div className={styles.imageWrapper}>
                  <img
                    src={aquariumsImg}
                    alt="category-aquariums"
                    className={styles.image}
                  />
                </div>
                <div className={styles.description}>
                  <h3 className={styles.descriptionTitle}>Aquariums</h3>
                  <p className={styles.descriptionModels}>
                    <span>{aquariums.length}</span> products
                  </p>
                </div>
              </Link>
            </li>
            <li className={styles.li}>
              <Link to="/equipment" className={styles.link}>
                <div className={styles.imageWrapper}>
                  <img
                    src={equipmentImg}
                    alt="category-equipment"
                    className={styles.image}
                  />
                </div>
                <div className={styles.description}>
                  <h3 className={styles.descriptionTitle}>Equipment</h3>
                  <p className={styles.descriptionModels}>
                    <span>{equipment.length}</span> products
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
