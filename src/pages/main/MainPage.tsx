import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaFolder,
  FaFolderOpen,
  FaRegFile,
  FaPython,
  FaJs,
  FaFileAlt,
  FaTrash,
  FaCopy,
} from "react-icons/fa";
import { TbChevronRight, TbChevronDown } from "react-icons/tb";
import CodeHeader from "../../components/organisms/Header";
import * as S from "./mainpage.style";
import { request } from "../../lib/api";
import DeleteModal from "../../components/containers/Modal/DeleteModal";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export interface File {
  id: number;
  name: string;
  type: string;
  fileType: string; // 확장자에 따른 아이콘 결정
  content: string;
  deletedAt: any;
}

interface Folder {
  id: number;
  name: string;
  isOpen: boolean;
  subFolders: Folder[];
  files: File[];
}

const MainPage: React.FC = () => {
  /** ============================= state 영역 ============================= */
  const [isCreatingFolder, setIsCreatingFolder] = useState<number | null>(null);
  const [isCreatingFile, setIsCreatingFile] = useState<number | null>(null);

  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null); // 선택된 폴더 ID
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택된 파일 정보

  const [newFileName, setNewFileName] = useState<string>(""); // 파일 이름 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "folder" | "file";
    id: number;
  } | null>(null);
  const [selectedFileContent, setSelectedFileContent] = useState<string | null>(
    null
  ); // 선택된 파일 내용

  const [isContentVisible, setIsContentVisible] = useState(false);

  const queryClient = useQueryClient();

  const codeRef = useRef<HTMLElement>(null);

  /** ============================= API 영역 ============================= */
  // Fetch all root folders
  const {
    data: rootFoldersData,
    isLoading,
    refetch: FoldersDataRefetch,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const result = await request<Folder[]>({
        method: "GET",
        url: "/folders",
      });
      return result;
    },
  });

  // Fetch file content by fileId
  const fetchFileContent = async (fileId: number) => {
    try {
      const result = await request<File>({
        method: "GET",
        url: `/files/${fileId}/content`,
      });
      return result;
    } catch (error) {
      console.error("File fetch error: ", error);
      toast.error("파일 내용을 불러오는데 실패했습니다.", {
        position: "bottom-center",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
      return null;
    }
  };

  // Create folder mutation
  const { mutateAsync: createFolderMutation } = useMutation({
    mutationFn: (data: { name: string; parentFolderId?: number }) => {
      return request({
        method: "POST",
        url: "/folders",
        data,
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

  // Delete folder mutation
  const { mutateAsync: deleteFolderMutation } = useMutation({
    mutationFn: (folderId: number) => {
      return request({
        method: "DELETE",
        url: `/folders/${folderId}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    },
    onError: (error) => {
      console.error("Folder deletion error: ", error);
      alert("폴더 삭제에 실패했습니다.");
    },
  });

  // Delete file mutation
  const { mutateAsync: deleteFileMutation } = useMutation({
    mutationFn: (fileId: number) => {
      return request({
        method: "DELETE",
        url: `/files/${fileId}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    },
    onError: (error) => {
      console.error("File deletion error: ", error);
      alert("파일 삭제에 실패했습니다.");
    },
  });

  /** ============================= 비즈니스 로직 영역 ============================= */

  const handleFileClick = async (file: File) => {
    if (selectedFile?.id === file.id) {
      setIsContentVisible(false);
      setTimeout(() => {
        setSelectedFile(null);
      }, 300);
    } else {
      const content = await fetchFileContent(file.id);
      setSelectedFile(file);
      setIsContentVisible(true);
    }
  };

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
    queryClient.setQueryData<Folder[]>(["folders"], (oldData) => {
      if (!oldData) return oldData;

      return oldData?.map((folder) =>
        folder.id === folderId
          ? { ...folder, isOpen: !folder.isOpen }
          : {
              ...folder,
              subFolders: toggleFolderHelper(folder.subFolders, folderId),
            }
      );
    });
  };

  const toggleFolderHelper = (
    folders: Folder[],
    folderId: number
  ): Folder[] => {
    return folders?.map((folder) =>
      folder.id === folderId
        ? { ...folder, isOpen: !folder.isOpen }
        : {
            ...folder,
            subFolders: toggleFolderHelper(folder.subFolders, folderId),
          }
    );
  };

  const handleAddFile = () => {
    if (selectedFolderId !== null) {
      openFolderIfClosed(selectedFolderId);
      setIsCreatingFile(selectedFolderId);
    } else {
      toast.warn("폴더를 먼저 선택해주세요.", {
        position: "bottom-center",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
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
    queryClient.setQueryData<Folder[]>(["folders"], (oldData) => {
      if (!oldData) return oldData;

      return oldData?.map((folder) =>
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
    return folders?.map((folder) =>
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

  /** 모든 토글 close 함수  */
  const closeAllToggles = () => {
    queryClient.setQueryData<Folder[]>(["folders"], (oldData) => {
      if (!oldData) return oldData;

      const closeAllFolders = (folders: Folder[]): Folder[] => {
        return folders.map((folder) => ({
          ...folder,
          isOpen: false,
          subFolders: closeAllFolders(folder.subFolders),
        }));
      };

      return closeAllFolders(oldData);
    });
  };

  const openDeleteModal = (type: "folder" | "file", id: number) => {
    setDeleteTarget({ type, id });
    setIsDeleteModalOpen(true);
  };

  const confirmDeletion = async () => {
    if (deleteTarget) {
      if (deleteTarget.type === "folder") {
        await deleteFolderMutation(deleteTarget.id);
      } else if (deleteTarget.type === "file") {
        await deleteFileMutation(deleteTarget.id);
      }
    }
  };

  /** ============================= 컴포넌트 영역 ============================= */

  // 확장자에 따른 아이콘 결정 로직
  const getFileIcon = (fileName: string) => {
    // 파일 확장자 없을 때
    if (fileName === null) {
      return (
        <FaRegFile
          style={{ marginRight: "10px", fontSize: "20px", color: "#90a4ae" }}
        />
      );
    } else if (fileName.endsWith(".py")) {
      return (
        <FaPython
          style={{ marginRight: "10px", fontSize: "20px", color: "#3572A5" }}
        />
      );
    } else if (fileName.endsWith(".js")) {
      return (
        <FaJs
          style={{ marginRight: "10px", fontSize: "20px", color: "#f0db4f" }}
        />
      );
    } else if (fileName.endsWith(".env")) {
      return (
        <FaFileAlt
          style={{ marginRight: "10px", fontSize: "20px", color: "#74b816" }}
        />
      );
    } else {
      return (
        <FaRegFile
          style={{ marginRight: "10px", fontSize: "20px", color: "#90a4ae" }}
        />
      );
    }
  };

  const renderFolders = (folders: Folder[]) => {
    return folders?.map((folder) => (
      <div key={folder.id}>
        <S.FolderRow
          isSelected={selectedFolderId === folder.id}
          onClick={() => {
            toggleFolder(folder.id);
            selectFolder(folder.id);
          }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
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
            <FaTrash
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal("folder", folder.id);
              }}
              style={{
                marginLeft: "auto",
                fontSize: "18px",
                color: "#afafaf",
                cursor: "pointer",
              }}
            />
          </div>
        </S.FolderRow>

        {folder.isOpen && (
          <S.FolderContent>
            {renderFolders(folder.subFolders)}

            {isCreatingFolder === folder.id && (
              <S.InputWrapper>
                <TbChevronRight
                  style={{
                    marginRight: "10px",
                    fontSize: "19px",
                    color: "#aabbaa",
                  }}
                />
                <FaFolder
                  style={{
                    marginRight: "10px",
                    fontSize: "25px",
                    color: "#90a4ae",
                  }}
                />
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
                  style={{
                    backgroundColor: "#313131",
                    outline: "none",
                    border: "none",
                    color: "white",
                  }}
                />
              </S.InputWrapper>
            )}
            {/* 파일 렌더링 부분  */}
            <ul style={{ marginTop: "5px", marginLeft: "3px" }}>
              {folder?.files?.map((file) => (
                <li
                  key={file.id}
                  onClick={() => handleFileClick(file)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0",
                    width: "100%",
                  }}
                >
                  <S.FileRow isSelected={selectedFile?.id === file.id}>
                    {getFileIcon(file?.fileType)}
                    <S.FileName>{file.name}</S.FileName>
                    <div style={{ marginLeft: "auto" }}>
                      <FaTrash
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal("file", file.id);
                        }}
                        style={{
                          fontSize: "18px",
                          color: "#afafaf",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </S.FileRow>
                </li>
              ))}
            </ul>

            {isCreatingFile === folder.id && (
              <S.InputWrapper>
                {getFileIcon(newFileName)}
                <input
                  autoFocus
                  type="text"
                  placeholder="New File Name"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onBlur={(e) => createFile(e.target.value, folder.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      createFile(
                        (e.target as HTMLInputElement).value,
                        folder.id
                      );
                    }
                  }}
                  style={{
                    backgroundColor: "#313131",
                    outline: "none",
                    border: "none",
                    color: "white",
                  }}
                />
              </S.InputWrapper>
            )}
          </S.FolderContent>
        )}
      </div>
    ));
  };

  /** ============================= useEffect 영역 ============================= */

  // 파일 확장자에 따른 언어 감지
  const detectLanguage = (fileName: string) => {
    console.log("detectLanguage", fileName);
    const extension = fileName.toLowerCase();

    if (extension.endsWith(".py")) return "python";
    if (extension.endsWith(".js") || extension.endsWith(".jsx"))
      return "javascript";
    if (extension.endsWith(".ts") || extension.endsWith(".tsx"))
      return "typescript";
    if (extension.endsWith(".env")) return "properties";
    if (extension.endsWith(".json")) return "json";
    if (extension.endsWith(".html")) return "html";
    if (extension.endsWith(".css")) return "css";
    if (extension.endsWith(".md")) return "markdown";
    if (extension.endsWith(".sql")) return "sql";
    if (extension.endsWith(".xml")) return "xml";
    if (extension.endsWith(".yaml") || extension.endsWith(".yml"))
      return "yaml";

    return "plaintext";
  };

  // 파일 내용이 변경될 때마다 하이라이팅 적용
  useEffect(() => {
    if (codeRef.current && selectedFile?.content) {
      // 명시적으로 언어 지정하여 하이라이팅
      const language = detectLanguage(selectedFile?.fileType);
      const highlightedCode = hljs.highlight(selectedFile.content, {
        language: language,
      }).value;
      codeRef.current.innerHTML = highlightedCode;
    }
  }, [selectedFile?.content]);

  // 복사 기능을 위한 함수 추가
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("코드가 클립보드에 복사되었습니다.", {
        position: "bottom-center",
        autoClose: 1500,
      });
    } catch (err) {
      toast.error("복사에 실패했습니다.", {
        position: "bottom-center",
        autoClose: 1500,
      });
    }
  };

  return (
    <S.Container>
      <CodeHeader
        title={"ENV_MANAGER"}
        addRootFolder={handleAddRootFolder}
        addFile={handleAddFile}
        refreshFolder={FoldersDataRefetch}
        closeAllToggles={closeAllToggles}
      />
      <S.MainSplitContainer>
        <S.FolderContainer isExpanded={!!selectedFile?.content}>
          {rootFoldersData && renderFolders(rootFoldersData)}
          {isCreatingFolder === 0 && (
            <S.InputWrapper>
              <TbChevronRight
                style={{
                  marginRight: "10px",
                  fontSize: "19px",
                  color: "#aabbaa",
                }}
              />
              <FaFolder
                style={{
                  marginRight: "10px",
                  fontSize: "25px",
                  color: "#90a4ae",
                }}
              />
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
                style={{
                  backgroundColor: "#313131",
                  outline: "none",
                  border: "none",
                  color: "white",
                }}
              />
            </S.InputWrapper>
          )}
        </S.FolderContainer>

        {selectedFile && (
          <S.ContentViewer isVisible={isContentVisible}>
            <S.CodeHeader>
              <S.FileInfoWrapper>
                {getFileIcon(selectedFile?.fileType)}
                <span style={{ color: "#abb2bf" }}>{selectedFile?.name}</span>
              </S.FileInfoWrapper>
              <S.CopyButton
                onClick={() => copyToClipboard(selectedFile?.content)}
              >
                <FaCopy />
                Copy code
              </S.CopyButton>
            </S.CodeHeader>
            <pre>
              <code
                ref={codeRef}
                className={`hljs language-${detectLanguage(
                  selectedFile?.fileType
                )}`}
                style={{ background: "inherit" }}
              />
            </pre>
          </S.ContentViewer>
        )}
      </S.MainSplitContainer>
      {isDeleteModalOpen && (
        <DeleteModal
          title="삭제 확인"
          description="정말 삭제하시겠습니까?"
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeletion}
        />
      )}
      <ToastContainer />
    </S.Container>
  );
};

export default MainPage;
