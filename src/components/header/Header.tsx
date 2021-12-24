import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { languageSlice } from "../../redux/language/slice";
import { useHistory } from "react-router-dom";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { userSlice } from "../../redux/user/slice";
import { getShoppingCart } from "../../redux/shoppingCart/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export const Header: React.FC = () => {
  //useSelector is self-defined to decouple store and component
  //(don't have to specify the type of state anymore)
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const jwt = useSelector((state) => state.user.token);
  const [username, setUserName] = useState("");

  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const shoppingCartLoading = useSelector(
    (state) => state.shoppingCart.loading
  );

  //update username state and get shopping cart info when use log in
  // when logged in
  useEffect(() => {
    if (jwt !== null) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUserName(token.username);
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  //define language change action and dispatch to reducer
  const handleLanguageChange = (e) => {
    dispatch(languageSlice.actions.getLanguage(e.key));
  };

  //clear token and direct to main page when sign out
  const handleSignOut = () => {
    dispatch(userSlice.actions.signOut());
    history.push("/");
  };

  return (
    <div className={styles["app-header"]}>
      {/* top header */}
      <div className={styles["top-header"]}>
        <Typography.Text>{t("header.slogan")}</Typography.Text>

        <Dropdown.Button
          style={{ marginLeft: 15 }}
          overlay={
            <Menu onClick={handleLanguageChange}>
              {languageList.map((l) => {
                return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
              })}
            </Menu>
          }
          icon={<GlobalOutlined />}
        >
          {language === "zh" ? "中文" : "English"}
        </Dropdown.Button>

        {/* display user email, shoppingCart and signOut buttons when log in, 
        else display register and signIn buttons  */}
        {jwt ? (
          <Button.Group className={styles["button-group"]}>
            <span>
              {t("header.welcome")}
              <Typography.Text strong>{username}</Typography.Text>
            </span>
            <Button
              loading={shoppingCartLoading}
              onClick={() => history.push("/shoppingCart")}
            >
              {t("header.shoppingCart")}({shoppingCartItems.length})
            </Button>
            <Button onClick={handleSignOut}>{t("header.signOut")}</Button>
          </Button.Group>
        ) : (
          <Button.Group className={styles["button-group"]}>
            <Link to={"/register"}>
              <Button>{t("header.register")}</Button>
            </Link>
            <Link to={"/signIn"}>
              <Button>{t("header.signin")}</Button>
            </Link>
          </Button.Group>
        )}
      </div>

      {/* main header */}
      <Layout.Header className={styles["main-header"]}>
        <Link to={"/"}>
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </Link>
        <Input.Search
          className={styles["search-input"]}
          placeholder={"请输入旅游目的地，主题或关键字"}
          onSearch={(keywords) => history.push("/search/" + keywords)}
        />
      </Layout.Header>

      {/* main menu */}
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
        <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
        <Menu.Item key="3"> {t("header.group")} </Menu.Item>
        <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
        <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
        <Menu.Item key="8"> {t("header.local")} </Menu.Item>
        <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
        <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
        <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
        <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
        <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
        <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
      </Menu>
    </div>
  );
};
