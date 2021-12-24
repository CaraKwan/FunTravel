import React from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { CheckOutDetailForm } from "../../components/CheckOutDetailForm/CheckOutDetailForm";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrderPage: React.FC = (props) => {
  const jwt = useSelector((state) => state.user.token) as string;
  const loading = useSelector((state) => state.order.loading);
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const dispatch = useDispatch();

  return (
    <>
      <Header />

      <CheckOutDetailForm
        loading={loading}
        order={currentOrder}
        handlePlaceOrder={() => {
          dispatch(placeOrder({ jwt, orderId: currentOrder.id }));
        }}
      />
      <Footer />
    </>
  );
};
