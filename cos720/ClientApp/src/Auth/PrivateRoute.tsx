import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const token = localStorage.getItem("token");
  return <>{token ? <Route {...props} /> : <Redirect to="/WelcomePage" />}</>;
};

export default PrivateRoute;
