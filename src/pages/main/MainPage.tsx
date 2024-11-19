import React, { useState } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaFile,
  FaPlus,
  FaFileCode,
  FaDatabase,
} from "react-icons/fa";

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

  // 새로운 폴더 추가 핸들러
  const addFolder = (parentFolder?: Folder) => {
    const newFolder: Folder = {
      id: nextFolderId,
      name: `Folder ${nextFolderId}`,
      isOpen: true, // 새 폴더는 자동으로 열림
      files: [],
      subFolders: [],
    };

    if (!parentFolder) {
      // 루트 폴더에 추가
      setRootFolders((prev) => [...prev, newFolder]);
    } else {
      // 하위 폴더에 추가
      const addSubFolder = (folders: Folder[]): Folder[] =>
        folders.map((folder) =>
          folder.id === parentFolder.id
            ? {
                ...folder,
                isOpen: true, // 부모 폴더도 열림
                subFolders: [...folder.subFolders, newFolder],
              }
            : { ...folder, subFolders: addSubFolder(folder.subFolders) }
        );

      setRootFolders((prev) => addSubFolder(prev));
    }

    setNextFolderId((prevId) => prevId + 1);
  };

  // 파일 추가 핸들러
  const addFile = (folderId: number, type: "frontend" | "backend") => {
    const newFile: File = {
      id: nextFileId,
      name: `${type} settings`,
      type,
      env: {
        NODE_ENV: type === "frontend" ? "development" : "production",
        API_URL:
          type === "frontend"
            ? "http://localhost:3000"
            : "http://localhost:5000",
      },
    };

    const addFileToFolder = (folders: Folder[]): Folder[] =>
      folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              isOpen: true, // 폴더를 열어서 새 파일 표시
              files: [...folder.files, newFile],
            }
          : {
              ...folder,
              subFolders: addFileToFolder(folder.subFolders),
            }
      );

    setRootFolders((prev) => addFileToFolder(prev));
    setNextFileId((prevId) => prevId + 1);
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

  // 폴더와 파일 렌더링
  const renderFolders = (folders: Folder[]) => {
    return folders.map((folder) => (
      <div key={folder.id} style={{ marginLeft: "20px" }}>
        {/* 폴더 행 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => toggleFolder(folder.id)}
          >
            {folder.isOpen ? (
              <FaFolderOpen style={{ marginRight: "10px", fontSize: "24px" }} />
            ) : (
              <FaFolder style={{ marginRight: "10px", fontSize: "24px" }} />
            )}
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {folder.name}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaFileCode
              onClick={() => addFile(folder.id, "frontend")}
              style={{ cursor: "pointer", fontSize: "20px", color: "#007bff" }}
              title="Add Frontend File"
            />
            <FaDatabase
              onClick={() => addFile(folder.id, "backend")}
              style={{ cursor: "pointer", fontSize: "20px", color: "#28a745" }}
              title="Add Backend File"
            />
            <FaPlus
              onClick={() => addFolder(folder)}
              style={{ cursor: "pointer", fontSize: "20px", color: "#ffc107" }}
              title="Add Subfolder"
            />
          </div>
        </div>

        {/* 하위 파일과 폴더 (열림 상태일 때만 렌더링) */}
        {folder.isOpen && (
          <div style={{ marginTop: "10px" }}>
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
          </div>
        )}
      </div>
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px" }}>Project Environment Manager</h1>
      <button
        onClick={() => addFolder()}
        style={{ marginBottom: "20px", fontSize: "16px" }}
      >
        Add Root Folder
      </button>
      <div>{renderFolders(rootFolders)}</div>
    </div>
  );
};

export default MainPage;
