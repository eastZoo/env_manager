import React from "react";
import * as S from "./sideBanner.style";
import { Link } from "react-router-dom";
import mainLogo from "../../../styles/assets/img/logo.png";

const SideBanner = () => {
  return (
    <S.SideBannerSection>
      <Link to="/">
        <img src={mainLogo} style={{ width: "180px" }} alt="" />
      </Link>

      <S.LogoSubTitle>프로젝트 환경변수 통합 관리 시스템.</S.LogoSubTitle>
    </S.SideBannerSection>
  );
};

export default SideBanner;
