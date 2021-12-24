import React from "react";
import styles from "./CheckOutDetailForm.module.css";
import { Skeleton, Card, Button, Typography, Table } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useHistory } from "react-router-dom";

const { Meta } = Card;
const { Title, Text } = Typography;

interface OrderItem {
  key: number;
  item: string;
  price: string | number | JSX.Element;
}

const columns: ColumnsType<OrderItem> = [
  {
    title: "产品",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
  },
];

interface PropsType {
  loading: boolean;
  order: any;
  handlePlaceOrder: () => void;
}

export const CheckOutDetailForm: React.FC<PropsType> = ({
  loading,
  order,
  handlePlaceOrder,
}) => {
  const history = useHistory();

  const paymentData: OrderItem[] = order
    ? order.orderItems.map((i, index) => ({
        key: index,
        item: i.touristRoute.title,
        price: (
          <>
            <Text delete>¥ {i.originalPrice} </Text>{" "}
            <Text type="danger" strong>
              ¥ {i.originalPrice * i.discountPresent}
            </Text>
          </>
        ),
      }))
    : [];

  return (
    <Card
      className={styles["checkout-form"]}
      actions={[
        order && order.state === "Completed" ? (
          <Button
            type="primary"
            onClick={() => {
              history.push("/");
            }}
            loading={loading}
          >
            <HomeOutlined />
            回到首页
          </Button>
        ) : (
          <Button
            type="primary"
            danger
            onClick={handlePlaceOrder}
            loading={loading}
          >
            <CheckCircleOutlined />
            支付
          </Button>
        ),
      ]}
    >
      <Skeleton loading={loading} active>
        <Meta
          title={
            <Title level={2}>
              {order && order.state === "Completed" ? "支付成功" : "总计"}
            </Title>
          }
          description={
            <Table<OrderItem>
              columns={columns}
              dataSource={paymentData}
              showHeader={false}
              size="small"
              bordered={false}
              pagination={false}
            />
          }
        />
      </Skeleton>
    </Card>
  );
};
