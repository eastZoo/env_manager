import styled, { css } from "styled-components";

interface MainBoxProps {
  $asideOpen?: boolean;
}

export const MainTemplate = styled.div<MainBoxProps>`
  display: flex;
  max-width: 1160px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.primary100};
`;

export const ContentSection = styled.section`
  width: 100%;
  min-width: 320px;
  max-width: 560px;
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
