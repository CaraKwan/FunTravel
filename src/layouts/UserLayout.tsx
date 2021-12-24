import React from "react";
import styles from "./UserLayout.module.css";
import { Link } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import { useSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { languageSlice } from "../redux/language/slice";

const { Header, Content } = Layout;

export const UserLayout: React.FC = (props) => {
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //define language change action and dispatch to reducer
  const languageChangeHandler = (e) => {
    dispatch(languageSlice.actions.getLanguage(e.key));
  };

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={languageChangeHandler}>
                {languageList.map((l) => {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                })}
              </Menu>
            }
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <span className={styles["title"]}>{t("header.title")}</span>
            </Link>
          </div>
          {props.children}
        </div>
      </Content>
    </Layout>
  );
};
