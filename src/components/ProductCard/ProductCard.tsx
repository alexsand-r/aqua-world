// .. ProductCard.tsx
import styles from "./ProductCard.module.scss";
import { BtnAdd } from "../BtnAdd/BtnAdd";
import { BtnHeart } from "../BtnHeart";
import type { Product } from "../../types/Product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  hasDiscount?: boolean;
  hasHover?: boolean;
}

export const ProductCard = ({
  product,
  hasDiscount = true,
  hasHover = false,
}: ProductCardProps) => {
  return (
    <article className={`${styles.product} ${hasHover ? styles.hasHover : ""}`}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.productLink}
      >
        <img
          src={`/${product.image}`}
          alt={product.name}
          className={styles.photo}
        />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.title}
      >
        {product.name}
      </Link>

      <div className={styles.priceBlock}>
        <p className={styles.price}>
          $ <span className={styles.sum}>{product.price}</span>
        </p>

        {hasDiscount && product.fullPrice > product.price && (
          <p className={styles.priceOld}>${product.fullPrice}</p>
        )}
      </div>

      <div className={styles.line}></div>
      <div className={styles.description}>
        <p className={styles.descriptionText}>
          Spec{" "}
          <span className={styles.descriptionValue}>{product.mainSpec}</span>
        </p>
        <p className={styles.descriptionText}>
          Size{" "}
          <span className={styles.descriptionValue}>
            {product.sizeOrVolume}
          </span>
        </p>
        <p className={styles.descriptionText}>
          Type{" "}
          <span className={styles.descriptionValue}>
            {product.typeOrMaterial}
          </span>
        </p>
      </div>

      <div className={styles.blockBtn}>
        <BtnAdd productId={product.itemId} />
        <BtnHeart productId={product.itemId} />
      </div>
    </article>
  );
};
