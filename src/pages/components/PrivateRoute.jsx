import { Navigate } from "react-router-dom";
import React from "react";
import { getAccessToken } from "../../helpers/accessToken";
import NavbarComp from "./NavbarComp";

const PrivateRoute = ({ children }) => {
  const accessToken = getAccessToken();
  return accessToken ? (
    <>
      <NavbarComp />
      {children}
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
