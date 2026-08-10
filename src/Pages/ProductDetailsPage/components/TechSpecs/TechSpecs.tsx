// TechSpecs.tsx
import styles from "./TechSpecs.module.scss";
import type { ProductDetails } from "../../../../types/ProductDetails";

interface TechSpecsProps {
  product: ProductDetails;
}

export const TechSpecs = ({ product }: TechSpecsProps) => {
  return (
    <section className={styles.techSpecs}>
      <h3 className={styles.title}>Tech specs</h3>
      <div className={styles.line}></div>
      <div className={styles.blockInfo}>
        <div className={styles.row}>
          <p className={styles.info}>Origin</p>
          <p>{product.origin}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Water Temp</p>
          <p>{product.waterTemp}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>pH Range</p>
          <p>{product.phRange}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Min Tank Volume</p>
          <p>{product.minTankVolume}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Size / Dimensions</p>
          <p>{product.adultSize}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Temperament</p>
          <p>{product.temperament}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Care Level</p>
          <p>{product.careLevel}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Diet</p>
          <p>{product.diet}</p>
        </div>
      </div>
    </section>
  );
};
