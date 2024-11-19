import styled, { css } from "styled-components";
import IconEditModify from "../../../styles/assets/svg/icon_edit_modify.svg";

interface MainBoxProps {
  $asideOpen?: boolean;
}

export const MainTemplate = styled.div<MainBoxProps>`
  display: flex;
  max-width: 1320px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.primary100};
`;

export const ContentSection = styled.section`
  width: 100%;
  min-width: 320px;
  max-width: 650px;
  min-height: 100vh;
  margin-left: auto;
  margin-right: 0;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.colors.primary60};
  @media (max-width: 1160px) {
    margin: 0 auto;
    box-shadow: none;
    min-height: 100vh;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
  }
`;

export const MainFooter = styled.footer`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  background-color: #fff;
  border-top: 1px solid ${(props) => props.theme.colors.primary50};
  position: fixed;
  bottom: 0;
  z-index: 101;
`;

export const MainFooterInner = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary100};
  padding: 2px 0;
  a {
    width: 20%;
    height: 45px;
    opacity: 0.4;
    font-size: 0;
    margin-bottom: 6px;
    background-image: url(${IconEditModify});
    background-size: contain; // SVG 아이콘을 버튼에 맞춰 조절
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
      opacity: 1;
    }
  }
`;
