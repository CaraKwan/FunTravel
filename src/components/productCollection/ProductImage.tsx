import React from "react";
import { Image, Typography } from "antd";
import { Link } from "react-router-dom";

interface PropsType {
  id: string | number;
  size: "large" | "small";
  title: string;
  imageSrc: string;
  price: number | string;
}

export const ProductImage: React.FC<PropsType> = ({
  id,
  size,
  title,
  imageSrc,
  price,
}) => {
  return (
    <Link to={`detail/${id}`}>
      {size === "large" ? (
        <Image src={imageSrc} height={295} width={550} />
      ) : (
        <Image src={imageSrc} height={130} width={280} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ¥ {price} 起
        </Typography.Text>
      </div>
    </Link>
  );
};