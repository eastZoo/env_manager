import React from "react";
import styled from "styled-components";

interface ModalProps {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({
  title,
  description,
  onCancel,
  onConfirm,
}) => {
  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>{title}</ModalHeader>
        <ModalDescription>{description}</ModalDescription>
        <ButtonContainer>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default DeleteModal;

/** ============================= styled-components ============================= */

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #2c2c2c;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 1.5em;
`;

const ModalDescription = styled.p`
  margin-top: 10px;
  color: #cccccc;
  font-size: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333333;
  }
`;

const ConfirmButton = styled.button`
  background-color: #cacaca;
  color: #373737;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dddddd;
  }
`;
