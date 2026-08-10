// ProductDetailsPage.tsx

import { BackBtn } from "../../components/BackBtn/BackBtn";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { ProductOverview } from "./components/ProductOverview/ProductOverview";
import styles from "./ProductDetailsPage.module.scss";
import type { ProductDetails } from "../../types/ProductDetails";
import type { Product } from "../../types/Product";
import { useState, useEffect } from "react";
import { Loader } from "../../components/Loader";
import { getProductId } from "../../services/getProductId";
import { ErrorItem } from "../../components/ErrorItem";
import { YouMayAlsoLike } from "./components/YouMayAlsoLike/YouMayAlsoLike";

interface ProductDetailsPageProps {
  category?: string;
  title?: string;
  likeProducts: Product[];
}

export const ProductDetailsPage = ({
  category: categoryFromProps,
  likeProducts,
}: ProductDetailsPageProps) => {
  const { category: categoryFromParams, productId } = useParams<{
    category?: string;
    productId: string;
  }>();

  const category = categoryFromProps || categoryFromParams || "aquariums";

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

    setIsError(false);

    // Вмикаємо повноцінний лоадер лише якщо товару ще взагалі немає в стейті
    if (!product) {
      setIsLoading(true);
    }

    getProductId(productId)
      .then((item) => {
        setProduct(item);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId, product]);

  // Показуємо лоадер тільки на найпершому завантаженні
  if (isLoading && !product) {
    return <Loader />;
  }

  if (isError && !product) {
    return <ErrorItem message="Product was not found" />;
  }

  return (
    <section className={styles.productDetailsPage}>
      <div className="productDetailsPage__container">
        <Breadcrumbs category={category} productName={product?.name} />
        <BackBtn className={styles.backBtnMargin} />
        {product && <ProductOverview product={product} category={category} />}
        <YouMayAlsoLike likeProducts={likeProducts} />
      </div>
    </section>
  );
};
