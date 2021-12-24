import React from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SignInPage } from "./pages/signIn/SignInPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { DetailPage } from "./pages/detail/DetailPage";
import { SearchPage } from "./pages/search/SearchPage";
import { ShoppingCartPage } from "./pages/shoppingCart/ShoppingCart";
import { Redirect } from "react-router-dom";
import { useSelector } from "./redux/hooks";
import { PlaceOrderPage } from "./pages/placeOrder/PlaceOrderPage";

//direct to component if authenticated, else direct to sign in page
const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/signIn" }} />
    );
  };
  return <Route render={routeComponent} {...rest} />;
};

function App() {
  const jwt = useSelector((s) => s.user.token);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path="/search/:keywords?" component={SearchPage} />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCartPage}
          />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/placeOrder"
            component={PlaceOrderPage}
          />
          <Route render={() => <h1>404 not found 页面找不到</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
