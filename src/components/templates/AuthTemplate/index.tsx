import React from "react";
import * as S from "./AuthTemplateContainer.style";
import SideBanner from "../../organisms/SideBanner";
import { Outlet } from "react-router-dom";
interface AuthTemplateProps {
  children: React.ReactElement;
}
export const AuthTemplate = () => {
  return (
    <S.AuthTemplate>
      {/* 왼쪽 사이드 배너 컴포넌트  */}
      <SideBanner />
      {/* 라우트에 따른 메인 컴포넌트 */}
      <S.ContentSection>
        <Outlet />
      </S.ContentSection>
    </S.AuthTemplate>
  );
};
