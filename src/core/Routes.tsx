import { Routes as DomReoutes, Route } from "react-router-dom";
import { readAccessToken } from "../common/functions/authFunctions";

// import PrivateRoute from "./PrivateRoute";
import SupportPage from "../pages/support/SupportPage";
import MainPage from "../pages/main/MainPage";

import LoginPage from "../pages/auth/login/LoginPage";
import { MainTemplate } from "../components/templates/MainTemplate";
import { AuthTemplate } from "../components/templates/AuthTemplate";

interface RouterItem {
  path: string;
  element: React.ReactNode;
  withAuthorization: boolean;
}

const routerItems: RouterItem[] = [
  /* 메인화면 */

  { path: "/", element: <MainPage />, withAuthorization: false },
  { path: "/support", element: <SupportPage />, withAuthorization: false },
];

export function Routes() {
  const accessToken = readAccessToken();

  return (
    <DomReoutes>
      {accessToken ? (
        <Route element={<MainTemplate />}>
          {routerItems
            .filter((route) => !route.withAuthorization)
            .map((route: RouterItem) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
        </Route>
      ) : (
        <Route element={<AuthTemplate />}>
          <Route key={"/login"} path={"/"} element={<LoginPage />} />
        </Route>
      )}
    </DomReoutes>
  );
}
