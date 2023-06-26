import React, { PropsWithChildren, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const token = cookies.get("Token");
  return (
    <>
      {token ? (
        children
      ) : (
        <Navigate
          to={{
            pathname: "/",
          }}
          replace
        />
      )}
    </>
  );
};

export default ProtectedRoute;
