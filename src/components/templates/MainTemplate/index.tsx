import SideBanner from "../../organisms/SideBanner";
import * as S from "./MainTemplate.style";

interface MainTemplateProps {
  children: React.ReactElement;
}

export const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <S.MainTemplate>
      {/* 왼쪽 사이드 배너 컴포넌트  */}
      <SideBanner />
      {/* 라우트에 따른 메인 컴포넌트 */}
      <S.ContentSection>{children}</S.ContentSection>
    </S.MainTemplate>
  );
};
