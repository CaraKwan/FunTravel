import React from "react";
import styles from "./ShoppingCart.module.css";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { Row, Col, Affix } from "antd";
import { ProductList } from "../../components/productList/ProductList";
import { PaymentTable } from "../../components/paymentTable/PaymentTable";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { clearShoppingCartItems, checkout} from "../../redux/shoppingCart/slice";
import { useHistory } from "react-router-dom";

export const ShoppingCartPage: React.FC = (props) => {
  const loading = useSelector((state) => state.shoppingCart.loading);
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const jwt = useSelector((state) => state.user.token) as string;
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <Header />
      <Row>
        {/* product list */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList
              data={shoppingCartItems.map((state) => state.touristRoute)}
            />
          </div>
        </Col>

        {/* payment infomation */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentTable
                loading={loading}
                // total original price
                originalPrice={shoppingCartItems
                  .map((state) => state.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                //total price
                price={shoppingCartItems
                  .map(
                    (state) =>
                      state.originalPrice *
                      (state.discountPresent ? state.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                  //when click check out, shopping cart items will be cleared, 
                  //order info will be generated and stored in order slice
                handleCheckout={() => {
                  if (shoppingCartItems.length <= 0) {
                    return;
                  }
                  dispatch(checkout(jwt));
                  history.push("/placeOrder");
                }}
                handleShoppingCartClear={() =>
                  dispatch(
                    clearShoppingCartItems({
                      jwt,
                      itemIds: shoppingCartItems.map((state) => state.id),
                    })
                  )
                }
              />
            </div>
          </Affix>
        </Col>
      </Row>

      <Footer />
    </>
  );
};
