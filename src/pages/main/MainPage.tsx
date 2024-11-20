import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa";
import { TbChevronRight, TbChevronDown } from "react-icons/tb";
import CodeHeader from "../../components/organisms/Header";
import * as S from "./mainpage.style";

interface File {
  id: number;
  name: string;
  type: "frontend" | "backend";
  env: Record<string, string>; // 환경 변수
}

interface Folder {
  id: number;
  name: string;
  isOpen: boolean; // 폴더 열림/닫힘 상태
  files: File[];
  subFolders: Folder[]; // 하위 폴더
}

const MainPage: React.FC = () => {
  const [rootFolders, setRootFolders] = useState<Folder[]>([]);
  const [nextFolderId, setNextFolderId] = useState(1);
  const [nextFileId, setNextFileId] = useState(1);
  const [isCreatingFolder, setIsCreatingFolder] = useState<number | null>(null);
  const [isCreatingFile, setIsCreatingFile] = useState<number | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  // 폴더 생성 완료 핸들러
  const createFolder = (folderName: string, parentFolderId: number | null) => {
    if (!folderName.trim()) {
      setIsCreatingFolder(null);
      return;
    }

    const newFolder: Folder = {
      id: nextFolderId,
      name: folderName,
      isOpen: true,
      files: [],
      subFolders: [],
    };

    if (parentFolderId === null) {
      // 루트 폴더에 추가
      setRootFolders((prev) => [...prev, newFolder]);
    } else {
      // 하위 폴더에 추가
      const addSubFolder = (folders: Folder[]): Folder[] =>
        folders.map((folder) =>
          folder.id === parentFolderId
            ? {
                ...folder,
                isOpen: true, // 부모 폴더 열기
                subFolders: [...folder.subFolders, newFolder],
              }
            : { ...folder, subFolders: addSubFolder(folder.subFolders) }
        );

      setRootFolders((prev) => addSubFolder(prev));
    }

    setNextFolderId((prevId) => prevId + 1);
    setIsCreatingFolder(null);
  };

  // 폴더 열기/닫기 토글
  const toggleFolder = (folderId: number) => {
    const toggle = (folders: Folder[]): Folder[] =>
      folders.map((folder) =>
        folder.id === folderId
          ? { ...folder, isOpen: !folder.isOpen }
          : { ...folder, subFolders: toggle(folder.subFolders) }
      );

    setRootFolders((prev) => toggle(prev));
  };

  // 파일 생성 완료 핸들러
  const createFile = (fileName: string, folderId: number) => {
    if (!fileName.trim()) {
      setIsCreatingFile(null);
      return;
    }

    const newFile: File = {
      id: nextFileId,
      name: fileName,
      type: "frontend",
      env: {},
    };

    const addFileToFolder = (folders: Folder[]): Folder[] =>
      folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              isOpen: true, // 폴더 열기
              files: [...folder.files, newFile],
            }
          : { ...folder, subFolders: addFileToFolder(folder.subFolders) }
      );

    setRootFolders((prev) => addFileToFolder(prev));
    setNextFileId((prevId) => prevId + 1);
    setIsCreatingFile(null);
  };

  // 하위 폴더 추가 핸들러 (입력창 열기)
  const addSubFolder = () => {
    if (selectedFolderId !== null) {
      setIsCreatingFolder(selectedFolderId);
      openFolderIfClosed(selectedFolderId); // 폴더가 닫혀 있으면 열기
    }
  };

  // 폴더가 닫혀있으면 열기
  const openFolderIfClosed = (folderId: number) => {
    const openFolder = (folders: Folder[]): Folder[] =>
      folders.map((folder) =>
        folder.id === folderId
          ? { ...folder, isOpen: true }
          : { ...folder, subFolders: openFolder(folder.subFolders) }
      );

    setRootFolders((prev) => openFolder(prev));
  };

  // 폴더 선택 핸들러
  const selectFolder = (folderId: number) => {
    setSelectedFolderId((prev) => (prev === folderId ? null : folderId));
  };

  // 파일 추가 핸들러 (입력창 열기)
  const addFile = () => {
    if (selectedFolderId !== null) {
      openFolderIfClosed(selectedFolderId); // 폴더가 닫혀 있으면 열기
      setIsCreatingFile(selectedFolderId);
    }
  };

  // 폴더와 파일 렌더링 (폴더 먼저, 파일 나중에 렌더링)
  const renderFolders = (folders: Folder[]) => {
    return folders.map((folder) => (
      <div key={folder.id}>
        <S.FolderRow
          isSelected={selectedFolderId === folder.id}
          onClick={() => selectFolder(folder.id)}
        >
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => toggleFolder(folder.id)}
          >
            {folder.isOpen ? (
              <TbChevronDown
                style={{
                  marginRight: "10px",
                  fontSize: "18px",
                  color: "#aabbaa",
                }}
              />
            ) : (
              <TbChevronRight
                style={{
                  marginRight: "10px",
                  fontSize: "18px",
                  color: "#aabbaa",
                }}
              />
            )}
            {folder.isOpen ? (
              <FaFolderOpen
                style={{
                  marginRight: "10px",
                  fontSize: "24px",
                  color: "#90a4ae",
                }}
              />
            ) : (
              <FaFolder
                style={{
                  marginRight: "10px",
                  fontSize: "24px",
                  color: "#90a4ae",
                }}
              />
            )}
            <S.FolderName>{folder.name}</S.FolderName>
          </div>
        </S.FolderRow>

        {folder.isOpen && (
          <S.FolderContent>
            {/* 하위 폴더 렌더링 */}
            {renderFolders(folder.subFolders)}

            {/* 하위 폴더 생성 입력창 */}
            {isCreatingFolder === folder.id && (
              <S.InputWrapper>
                <input
                  autoFocus
                  type="text"
                  placeholder="New Subfolder Name"
                  onBlur={(e) => createFolder(e.target.value, folder.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      createFolder(
                        (e.target as HTMLInputElement).value,
                        folder.id
                      );
                    }
                  }}
                />
              </S.InputWrapper>
            )}

            {/* 파일 렌더링 */}
            <ul style={{ marginTop: "10px" }}>
              {folder.files.map((file) => (
                <li
                  key={file.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaFile style={{ marginRight: "10px", fontSize: "20px" }} />
                  <S.FileName>{file.name}</S.FileName>
                </li>
              ))}
            </ul>

            {/* 파일 생성 입력창 */}
            {isCreatingFile === folder.id && (
              <S.InputWrapper>
                <input
                  autoFocus
                  type="text"
                  placeholder="New File Name"
                  onBlur={(e) => createFile(e.target.value, folder.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      createFile(
                        (e.target as HTMLInputElement).value,
                        folder.id
                      );
                    }
                  }}
                />
              </S.InputWrapper>
            )}
          </S.FolderContent>
        )}
      </div>
    ));
  };

  return (
    <S.Container>
      <CodeHeader
        title={"ENV_MANAGER"}
        addRootFolder={() =>
          selectedFolderId === null ? setIsCreatingFolder(0) : addSubFolder()
        }
        addFile={addFile}
      />
      <div>
        {renderFolders(rootFolders)}
        {isCreatingFolder === 0 && (
          <S.InputWrapper>
            <input
              autoFocus
              type="text"
              placeholder="New Folder Name"
              onBlur={(e) => createFolder(e.target.value, null)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createFolder((e.target as HTMLInputElement).value, null);
                }
              }}
            />
          </S.InputWrapper>
        )}
      </div>
    </S.Container>
  );
};

export default MainPage;
