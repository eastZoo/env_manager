import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 25px;
`;

export const FolderRow = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px 0;

  background-color: ${(props) =>
    props.isSelected ? "#37373d" : "transparent"};
`;

export const FolderName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #c1ccc1;
`;

export const FolderContent = styled.div`
  margin-left: 25px;
`;

export const FileName = styled.span`
  font-size: 18px;
  color: #c1ccc1;
  margin-bottom: 10px; /* 파일 간의 간격 설정 */
`;

export const InputWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px; /* 입력 창 간의 간격 설정 */
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

export const FolderContainer = styled.div<{ isExpanded: boolean }>`
  overflow: auto;
  height: ${(props) => (props.isExpanded ? "50vh" : "100vh")};
  transition: height 0.4s ease-in-out;

  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 설정 */
  }

  ::-webkit-scrollbar-thumb {
    background: #606060; /* 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바 모서리 둥글게 */
  }

  ::-webkit-scrollbar-track {
    background: #313131; /* 스크롤 트랙 색상 */
  }
`;

export const ContentViewer = styled.div`
  height: 50vh; /* 화면의 절반 높이 */
  background-color: #2c2c2c;
  color: white;
  padding: 10px;
  overflow: auto;
  border-top: 1px solid #444;
`;

export const MainSplitContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px); /* 전체 화면 높이에서 헤더 제외 */
`;

// 추가된 스타일
export const FileRow = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.isSelected ? "#37373d" : "transparent"};
  padding: 5px 0;
  cursor: pointer;
  width: 100%;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) =>
      props.isSelected ? "#37373d" : "transparent"};
    z-index: -1;
  }
`;
