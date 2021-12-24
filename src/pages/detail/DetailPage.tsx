import React, { useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import {
  Spin,
  Row,
  Col,
  DatePicker,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
} from "antd";
import styles from "./DetailPage.module.css";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { ProductDesc } from "../../components/productDesc/ProductDesc";
import { ProductComments } from "../../components/productComments/ProductComments";
import { commentMockData } from "./mockup";
import { getProductDetail } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

interface MatchParams {
  touristRouteId: string;
}

const { RangePicker } = DatePicker;

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (
  props
) => {
  const { touristRouteId } = useParams<MatchParams>();

  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);

  const dispatch = useDispatch();

  const jwt = useSelector((state) => state.user.token) as string;
  const shoppingCartLoading = useSelector(
    (state) => state.shoppingCart.loading
  );

  //call product detail url and store it as product
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProductDetail(touristRouteId));
    };
    fetchData();
  }, []);

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
        {/* product description and date selection */}
        <div className={styles["product-desc-container"]}>
          <Row>
            <Col span={13}>
              <ProductDesc
                title={product.title}
                description={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <Button
                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                type="primary"
                danger
                loading={shoppingCartLoading}
                onClick={() => {
                  dispatch(
                    addShoppingCartItem({ jwt, touristRouteId: product.id })
                  );
                }}
              >
                <ShoppingCartOutlined />
                放入购物车
              </Button>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>

        {/* anchor menu */}
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#fees" title="费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>

        {/* product features */}
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          {/* render data in html form get from backend api */}
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>

        {/* fees */}
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>

        {/* notice */}
        <div id="note" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>

        {/* product comments */}
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>用户评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
