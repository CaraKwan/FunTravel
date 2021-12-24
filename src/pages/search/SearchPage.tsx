import styles from "./SearchPage.module.css";
import React, { useEffect } from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { ProductList } from "../../components/productList/ProductList";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";

interface MatchParams {
  keywords: string;
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>();

  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((state) => state.productSearch.error);
  const pagination = useSelector((state) => state.productSearch.pagination);
  const productList = useSelector((state) => state.productSearch.data);

  const dispatch = useDispatch();
  const location = useLocation();

  //search tourist routes based on the url change
  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  }, [location]);

  //call searchProduct() to get new page info
  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage, pageSize, keywords }));
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div className={styles["page-content"]}>
        {/* product list */}
        <div className={styles["product-list-container"]}>
          <ProductList
            data={productList}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
