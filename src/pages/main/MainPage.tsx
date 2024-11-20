import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa";
import { TbChevronRight, TbChevronDown } from "react-icons/tb";
import CodeHeader from "../../components/organisms/Header";
import * as S from "./mainpage.style";
import { request } from "../../lib/api";

interface File {
  id: number;
  name: string;
  type: string;
  env: Record<string, string>;
}

interface Folder {
  id: number;
  name: string;
  isOpen: boolean;
  subFolders: Folder[];
  files: File[];
}

const MainPage: React.FC = () => {
  const [rootFolders, setRootFolders] = useState<Folder[]>([]);
  const [isCreatingFolder, setIsCreatingFolder] = useState<number | null>(null);
  const [isCreatingFile, setIsCreatingFile] = useState<number | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  // Fetch all root folders
  const { data: rootFoldersData, isLoading } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const result = await request<Folder[]>({
        method: "GET",
        url: "/folders",
      });
      setRootFolders(result); // 로컬 스테이트에 데이터 저장
      return result;
    },
  });

  // Create folder mutation
  const { mutateAsync: createFolderMutation } = useMutation({
    mutationFn: ({
      name,
      parentFolderId,
    }: {
      name: string;
      parentFolderId?: number;
    }) => {
      return request({
        method: "POST",
        url: "/folders",
        data: { name, parentFolderId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setIsCreatingFolder(null);
    },
    onError: (error) => {
      console.error("Folder creation error: ", error);
      alert("폴더 생성에 실패했습니다.");
    },
  });

  // Create file mutation
  const { mutateAsync: createFileMutation } = useMutation({
    mutationFn: ({ name, folderId }: { name: string; folderId: number }) => {
      return request({
        method: "POST",
        url: "/files",
        data: { name, folderId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setIsCreatingFile(null);
    },
    onError: (error) => {
      console.error("File creation error: ", error);
      alert("파일 생성에 실패했습니다.");
    },
  });

  const handleAddRootFolder = () => {
    if (selectedFolderId === null) {
      setIsCreatingFolder(0);
    } else {
      addSubFolder();
    }
  };

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

  const handleAddFile = () => {
    if (selectedFolderId !== null) {
      openFolderIfClosed(selectedFolderId);
      setIsCreatingFile(selectedFolderId);
    }
  };

  const createFolder = async (
    folderName: string,
    parentFolderId: number | null
  ) => {
    if (!folderName.trim()) {
      setIsCreatingFolder(null);
      return;
    }
    await createFolderMutation({
      name: folderName,
      parentFolderId: parentFolderId ?? undefined,
    });
  };

  const createFile = async (fileName: string, folderId: number) => {
    if (!fileName.trim()) {
      setIsCreatingFile(null);
      return;
    }
    await createFileMutation({ name: fileName, folderId });
  };

  const openFolderIfClosed = (folderId: number) => {
    // 폴더가 닫혀있으면 열기 (로컬 스테이트 업데이트)
    queryClient.setQueryData<Folder[]>(["folders"], (oldData: any) => {
      if (!oldData) return oldData;

      return oldData?.map((folder: Folder) =>
        folder.id === folderId
          ? { ...folder, isOpen: true }
          : {
              ...folder,
              subFolders: openFolderIfClosedHelper(folder.subFolders, folderId),
            }
      );
    });
  };

  const openFolderIfClosedHelper = (
    folders: Folder[],
    folderId: number
  ): Folder[] => {
    return folders.map((folder) =>
      folder.id === folderId
        ? { ...folder, isOpen: true }
        : {
            ...folder,
            subFolders: openFolderIfClosedHelper(folder.subFolders, folderId),
          }
    );
  };

  const selectFolder = (folderId: number) => {
    setSelectedFolderId((prev) => (prev === folderId ? null : folderId));
  };

  const renderFolders = (folders: Folder[]) => {
    return folders?.map((folder) => (
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
            {renderFolders(folder?.subFolders)}

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

            <ul style={{ marginTop: "10px" }}>
              {folder?.files?.map((file) => (
                <li
                  key={file.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaFile style={{ marginRight: "10px", fontSize: "20px" }} />
                  <S.FileName>{file.name}</S.FileName>
                </li>
              ))}
            </ul>

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <S.Container>
      <CodeHeader
        title={"ENV_MANAGER"}
        addRootFolder={handleAddRootFolder}
        addFile={handleAddFile}
      />
      <div>
        {rootFolders && renderFolders(rootFolders)}
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
