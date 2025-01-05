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
  font-size: 16px;
  font-weight: bold;
  color: #c1ccc1;
`;

export const FolderContent = styled.div`
  margin-left: 25px;
`;

export const FileName = styled.span`
  font-size: 16px;
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
  transition: height 0.3s ease-in-out;

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

export const ContentViewer = styled.div<{ isVisible: boolean }>`
  height: 50vh;
  background-color: #2a2a2aff;
  border-radius: 8px;
  margin: 20px 0;
  position: relative;
  transform: translateY(${(props) => (props.isVisible ? "0" : "100%")});
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  overflow: hidden;
  pre {
    margin: 0;
    padding: 20px;
    height: 100%;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #606060;
      border-radius: 6px;
      border: 2px solid #2a2a2aff;

      &:hover {
        background: #757575;
      }
    }

    ::-webkit-scrollbar-track {
      background: #313131;
      border-radius: 6px;
    }

    ::-webkit-scrollbar-corner {
      background: #313131;
    }
  }

  code {
    font-family: "Fira Code", "Consolas", monospace;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #2a2a2aff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #181a1f;
`;

export const CopyButton = styled.button`
  background-color: #1c1c1cff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a6377;
  }

  svg {
    font-size: 14px;
  }
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
      props.isSelected ? "#232323FF" : "transparent"};
    z-index: -1;
  }
`;

export const FileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Editor = styled.textarea`
  width: 100%;
  height: calc(100% - 40px);
  background: inherit;
  color: #abb2bf;
  border: none;
  padding: 16px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
`;
