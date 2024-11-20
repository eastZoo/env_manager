import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1e1e1e;
  color: #ccccc1;
  font-size: 16px;
  padding-bottom: 15px;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const iconStyle = {
  cursor: "pointer",
  fontSize: "24px", // 아이콘 크기
};
