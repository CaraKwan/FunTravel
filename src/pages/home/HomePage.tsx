import React from "react";
import styles from "./HomePage.module.css";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { SideMenu } from "../../components/sideMenu/SideMenu";
import { Carousel } from "../../components/carousel/Carousel";
import { Row, Col, Typography, Spin } from "antd";
import { ProductCollection } from "../../components/productCollection/ProductCollection";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { getRecommendProducts } from "../../redux/recommendProducts/slice";

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecommendProducts: () => {
      dispatch(getRecommendProducts());
    }
  };
};

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {

  //use react-thunk in defined in reducer 
  componentDidMount() {
    this.props.fetchRecommendProducts();
  }

  render() {
    const { t, productList, loading, error } = this.props;

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
      return <h1>{error}</h1>;
    }

    return (
      <>
        <Header />

        {/* contents */}
        <div className={styles["page-content"]}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>

          {/* three product collections */}
          <ProductCollection
            title={
              <Typography.Title level={3} type="warning">
                {t("home_page.hot_recommended")}
              </Typography.Title>
            }
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t("home_page.new_arrival")}
              </Typography.Title>
            }
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t("home_page.domestic_travel")}
              </Typography.Title>
            }
            products={productList[2].touristRoutes}
          />
        </div>

        <Footer />
      </>
    );
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent));
