import { Link } from "react-router-dom";
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
      <S.ContentSection>
        <header>헤더입니다.</header>
        {children}
        <S.MainFooter>
          <S.MainFooterInner>
            <Link to="/support"></Link>
            <Link to="/">2</Link>
            <Link to="/">3</Link>
            <Link to="/">4</Link>
            <Link to="/">5</Link>
          </S.MainFooterInner>
        </S.MainFooter>
      </S.ContentSection>
    </S.MainTemplate>
  );
};
