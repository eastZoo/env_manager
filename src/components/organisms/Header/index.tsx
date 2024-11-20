import React from "react";
import { LuFilePlus2 } from "react-icons/lu";
import { TbFolderPlus, TbLibraryMinus } from "react-icons/tb";
import { MdRefresh } from "react-icons/md";
import * as S from "./header.style";

interface HeaderProps {
  title: string;
  addRootFolder: () => void;
  addFile: () => void;
}

const CodeHeader = ({ title, addRootFolder, addFile }: HeaderProps) => {
  return (
    <S.Header>
      <S.Title>{title}</S.Title>
      <S.IconGroup>
        <TbFolderPlus
          title="Add Folder"
          style={{ cursor: "pointer", fontSize: "24px" }}
          onClick={addRootFolder}
        />
        <LuFilePlus2
          title="Add File"
          style={{ cursor: "pointer", fontSize: "24px" }}
          onClick={addFile}
        />
        <MdRefresh
          title="Refresh"
          style={{ cursor: "pointer", fontSize: "24px" }}
        />
        <TbLibraryMinus
          title="Settings"
          style={{ cursor: "pointer", fontSize: "24px" }}
        />
      </S.IconGroup>
    </S.Header>
  );
};

export default CodeHeader;
