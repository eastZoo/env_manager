import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa";
import { TbChevronRight, TbChevronDown, TbFolderPlus } from "react-icons/tb";
import { LuFilePlus2 } from "react-icons/lu";
import CodeHeader from "../../components/organisms/Header";

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

  // 새로운 루트 폴더 추가 핸들러 (입력창 열기)
  const addRootFolder = () => {
    setIsCreatingFolder(0); // 루트 폴더 생성 상태로 설정
  };

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

  // 파일 추가 핸들러 (입력창 열기)
  const addFile = () => {
    if (selectedFolderId !== null) {
      setIsCreatingFile(selectedFolderId);
      openFolderIfClosed(selectedFolderId); // 폴더가 닫혀 있으면 열기
    }
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

  // 폴더와 파일 렌더링
  const renderFolders = (folders: Folder[]) => {
    return folders.map((folder) => (
      <div key={folder.id}>
        {/* 폴더 행 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "7px 0",
            backgroundColor:
              selectedFolderId === folder.id ? "#f0f0f0" : "transparent", // 선택된 폴더 배경 색상
          }}
          onClick={() => selectFolder(folder.id)}
        >
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => toggleFolder(folder.id)}
          >
            {/* 화살표 아이콘 */}
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
            {/* 폴더 아이콘 */}
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
            <span
              style={{ fontSize: "18px", fontWeight: "bold", color: "#c1ccc1" }}
            >
              {folder.name}
            </span>
          </div>
        </div>

        {/* 하위 파일과 폴더 (열림 상태일 때만 렌더링) */}
        {folder.isOpen && (
          <div style={{ marginTop: "10px", marginLeft: "25px" }}>
            {/* 파일 */}
            <ul style={{ marginTop: "10px" }}>
              {folder.files.map((file) => (
                <li
                  key={file.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaFile style={{ marginRight: "10px", fontSize: "20px" }} />
                  <span style={{ fontSize: "16px" }}>{file.name}</span>
                </li>
              ))}
            </ul>

            {/* 하위 폴더 */}
            {renderFolders(folder.subFolders)}

            {/* 하위 폴더 생성 입력창 */}
            {isCreatingFolder === folder.id && (
              <div style={{ marginTop: "10px" }}>
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
              </div>
            )}

            {/* 파일 생성 입력창 */}
            {isCreatingFile === folder.id && (
              <div style={{ marginTop: "10px" }}>
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
              </div>
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div style={{ padding: "20px 25px" }}>
      <CodeHeader title={"ENV_MANAGER"} addRootFolder={addRootFolder} />
      <div>
        {renderFolders(rootFolders)}

        {/* 루트 폴더 생성 입력창 */}
        {isCreatingFolder === 0 && (
          <div style={{ marginTop: "10px" }}>
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
          </div>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        {/* CodeHeader의 버튼을 이용한 파일 및 하위 폴더 생성 */}
        <LuFilePlus2
          onClick={addFile}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            color: "#007bff",
            marginRight: "10px",
          }}
          title="Add File to Selected Folder"
        />
        <TbFolderPlus
          onClick={addSubFolder}
          style={{ cursor: "pointer", fontSize: "24px", color: "#ffc107" }}
          title="Add Subfolder to Selected Folder"
        />
      </div>
    </div>
  );
};

export default MainPage;
