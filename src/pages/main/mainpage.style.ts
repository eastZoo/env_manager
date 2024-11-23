import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 25px;
`;

export const FolderRow = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 7px 0;
  background-color: ${(props) =>
    props.isSelected ? "#37373d" : "transparent"};
`;

export const FolderName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #c1ccc1;
`;

export const FolderContent = styled.div`
  margin-top: 10px;
  margin-left: 25px;
`;

export const FileName = styled.span`
  font-size: 18px;
  color: #c1ccc1;
`;

export const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex;

  input {
    width: 100%;
    padding: 5px;
    font-size: 16px;
  }
`;

export const HeaderControls = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
    font-size: 24px;
    margin-right: 10px;

    &:hover {
      opacity: 0.8;
    }
  }
`;
