import styled from "styled-components";

export const SideBannerSection = styled.section`
  width: 512px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1160px) {
    display: none;
  }
`;

export const LogoSubTitle = styled.section`
  margin-top: 10px;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.white100};
`;
