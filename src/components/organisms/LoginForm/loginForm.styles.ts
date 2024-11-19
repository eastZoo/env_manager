import styled from "styled-components";

export const LoginFormLayout = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 가운데에서 상단으로 변경 */
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 40px;
`;

export const LoginLogoBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 190px 0;
`;

export const LoginInputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
`;

export const UserInfoSaveCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  color: ${(props) => props.theme.colors.gray};
  font-size: 1.5rem;
  font-weight: 500;
`;

export const BottomMoveLayout = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  bottom: 32px;
`;

export const UserInfoFindAndJoin = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;
  cursor: pointer;
`;
