import { Outlet } from "react-router";
import { MainTemplate } from "../components/templates/MainTemplate";

export const MainTemplatePage = () => {
  return (
    <MainTemplate>
      <Outlet />
    </MainTemplate>
  );
};
