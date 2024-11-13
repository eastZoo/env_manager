import { Routes as DomReoutes, Route } from "react-router-dom";
import { readAccessToken } from "../common/functions/authFunctions";

// import PrivateRoute from "./PrivateRoute";
import SupportPage from "../pages/support/SupportPage";
import MainPage from "../pages/MainPage";
import { MainTemplatePage } from "../pages/MainTemplatePage";

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
      {/* <Route element={<MainPage />}>
        {routerItems
          .filter((route) => route.withAuthorization)
          .map((route: RouterItem) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute
                    component={route.element}
                    authenticated={accessToken}
                  />
                }
              />
            );
          })}
      </Route> */}

      {/* 일단 권한 체크 없이 라우팅 */}
      <Route element={<MainTemplatePage />}>
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
    </DomReoutes>
  );
}
