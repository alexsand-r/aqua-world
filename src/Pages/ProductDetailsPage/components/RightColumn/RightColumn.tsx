// RightColumn.tsx

import styles from "./RightColumn.module.scss";
import { Link } from "react-router-dom";
import type { ProductDetails } from "../../../../types/ProductDetails";
import { BtnAdd } from "../../../../components/BtnAdd";
import { BtnHeart } from "../../../../components/BtnHeart";

interface RightColumnProps {
  product: ProductDetails;
  category: string;
}

const getNewProductId = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  const numericCapacity = capacity.toLowerCase().replace("l", "");

  // Якщо це NanoCube, суфікс обов'язково включає колір (-white або -black)
  if (namespaceId === "aquarium-nano-cube") {
    return `${namespaceId}-${numericCapacity}-${color}`;
  }

  // Якщо це ClearSea 60L, у нього є специфічний суфікс -black
  if (namespaceId === "aquarium-clearsea" && numericCapacity === "60") {
    return `${namespaceId}-60-black`;
  }

  // Стандартний шаблон для інших
  return `${namespaceId}-${numericCapacity}`;
};

export const RightColumn = ({ product, category }: RightColumnProps) => {
  const {
    namespaceId,
    capacity: currentCapacity,
    capacityAvailable,
    color: currentColor,
  } = product;

  return (
    <article>
      {/* 2. Вибір розміру або об'єму */}
      <div className={styles.select}>
        <div className={styles.block}>
          <p className={styles.text}>Select size / volume</p>
          <div className={styles.rowBtn}>
            {capacityAvailable.map((item) => {
              const isActive = item === currentCapacity;
              const newProductId = getNewProductId(
                namespaceId,
                item,
                currentColor,
              );

              return (
                <Link
                  key={item}
                  to={`/${category}/${newProductId}`}
                  className={`${styles.gb} ${isActive ? styles.activeGb : ""}`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Блок ціни та кнопок дії */}
      <div className={styles.price}>
        <div className={styles.blocks}>
          <div className={styles.priceBlock}>
            <p className={styles.priceText}>${product.priceDiscount}</p>
            {product.priceRegular > product.priceDiscount && (
              <p className={styles.oldPrice}>${product.priceRegular}</p>
            )}
          </div>
          <div className={styles.blockAdd}>
            <BtnAdd productId={product.id} />
            <BtnHeart productId={product.id} />
          </div>
        </div>
      </div>

      {/* 4. Короткі характеристики для Aqua World */}
      <div className={styles.info}>
        <div className={styles.blocks}>
          <div className={styles.list}>
            {product.minTankVolume && (
              <div className={styles.element}>
                <p className={styles.text}>Min Tank</p>
                <p className={styles.textInfo}>{product.minTankVolume}</p>
              </div>
            )}

            {product.adultSize && (
              <div className={styles.element}>
                <p className={styles.text}>Adult Size</p>
                <p className={styles.textInfo}>{product.adultSize}</p>
              </div>
            )}

            {product.temperament && (
              <div className={styles.element}>
                <p className={styles.text}>Temperament</p>
                <p className={styles.textInfo}>{product.temperament}</p>
              </div>
            )}

            {product.careLevel && (
              <div className={styles.element}>
                <p className={styles.text}>Care Level</p>
                <p className={styles.textInfo}>{product.careLevel}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
