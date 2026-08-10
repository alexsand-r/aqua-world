import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Home } from "./Pages/Home/Home";
import "./styles/App.scss";
import type { Product } from "./types/Product";
import { getProducts } from "./services/httpClient";
import { FavouritesProvider } from "./context/FavouritesContext";
import { CartProvider } from "./context/CartContext";
import { Loader } from "./components/Loader";
import { ErrorItem } from "./components/ErrorItem/ErrorItem";
import { CatalogPage } from "./Pages/CatalogPage/CatalogPage";
import { ProductDetailsPage } from "./Pages/ProductDetailsPage/ProductDetailsPage";
import { Favourites } from "./Pages/Favourites/Favourites";
import { Cart } from "./Pages/Cart/Cart";
import { ScrollToTop } from "./components/ScrollToTop";
import { NotFoundPage } from "./Pages/NotFoundPage/NotFoundPage";

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        if (isMounted) {
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getNewBrand = (items: Product[]) => {
    return [...items]
      .sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year;
        }

        return b.price - a.price;
      })
      .slice(0, 12);
  };

  const getHotProducts = (items: Product[]) => {
    return items
      .filter((product) => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 12);
  };

  const getSuggestedProducts = (
    items: Product[],
    currentProductId?: string,
  ) => {
    return [...items]
      .filter((product) => product.itemId !== currentProductId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);
  };

  const newBrandProducts = getNewBrand(products);
  const hotProducts = getHotProducts(products);
  const likeProducts = getSuggestedProducts(products);

  return (
    <CartProvider>
      <FavouritesProvider>
        <div className="App">
          <div className="wrapper">
            <Header />
            <div className="page"></div>
            <ScrollToTop />
            <div className="page">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      newBrandProducts={newBrandProducts}
                      hotProducts={hotProducts}
                      products={products}
                    />
                  }
                />
                <Route path="home" element={<Navigate to="/" replace />} />
                <Route
                  path="/aquariums"
                  element={
                    isLoading ? (
                      <Loader />
                    ) : isError ? (
                      <ErrorItem message="Oops. Something went wrong.." />
                    ) : (
                      <CatalogPage
                        products={products}
                        category="aquariums"
                        title="Aquariums"
                      />
                    )
                  }
                />
                <Route
                  path="/fish"
                  element={
                    isLoading ? (
                      <Loader />
                    ) : isError ? (
                      <ErrorItem message="Oops. Something went wrong.." />
                    ) : (
                      <CatalogPage
                        products={products}
                        category="fish"
                        title="Fish"
                      />
                    )
                  }
                />
                <Route
                  path="/equipment"
                  element={
                    isLoading ? (
                      <Loader />
                    ) : isError ? (
                      <ErrorItem message="Oops. Something went wrong.." />
                    ) : (
                      <CatalogPage
                        products={products}
                        category="equipment"
                        title="Equipment"
                      />
                    )
                  }
                />
                <Route
                  path="/favourites"
                  element={
                    <Favourites category="favourites" products={products} />
                  }
                />
                <Route
                  path="/cart"
                  element={<Cart category="cart" products={products} />}
                />
                <Route
                  path="/aquariums/:productId"
                  element={
                    isLoading ? (
                      <Loader />
                    ) : isError ? (
                      <ErrorItem message="Oops. Something went wrong.." />
                    ) : (
                      <ProductDetailsPage
                        likeProducts={likeProducts}
                        category="aquariums"
                      />
                    )
                  }
                />
                <Route
                  path="/fish/:productId"
                  element={
                    isLoading ? (
                      <Loader />
                    ) : isError ? (
                      <ErrorItem message="Oops. Something went wrong.." />
                    ) : (
                      <ProductDetailsPage
                        likeProducts={likeProducts}
                        category="fish"
                      />
                    )
                  }
                />
                <Route
                  path="/equipment/:productId"
                  element={
                    isLoading ? (
                      <Loader />
                    ) : isError ? (
                      <ErrorItem message="Oops. Something went wrong.." />
                    ) : (
                      <ProductDetailsPage
                        likeProducts={likeProducts}
                        category="equipment"
                      />
                    )
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </div>
      </FavouritesProvider>
    </CartProvider>
  );
};
