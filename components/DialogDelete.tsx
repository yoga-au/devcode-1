// import React from 'react'
import NextImage from "next/image";
import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useMutation, useQueryClient } from "react-query";

// fetcher and mutation import
import deleteTodoItem from "../mutation/deleteTodoItem";

// style and design related import
import { ResetButton } from "../styles/reset";
import DeleteImage from "../public/assets/images/modal-delete-icon.svg";
import "@reach/dialog/styles.css";

interface Props {
  deleteId: number;
  activityId?: string;
  title: string;
  showDeleteModal: boolean;
  closeModal: () => void;
}

interface ButtonProps {
  bgColor: string;
  textColor: string;
}

const DialogOverlayStyled = styled(DialogOverlay)`
  z-index: 4;
`;

const DialogContentStyled = styled(DialogContent)`
  border-radius: 12px;
`;

const ModalContentContainer = styled.div`
  text-align: center;
`;

const Button = styled(ResetButton)<ButtonProps>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border-radius: 45px;
  display: flex;
  align-items: center;
  padding: 0.875em 1.75em;
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-weight: 600;
`;

const FooterContainer = styled.div`
  margin-top: 2.875em;
  display: flex;
  justify-content: center;
`;

const DialogDelete = ({
  deleteId,
  activityId,
  title,
  showDeleteModal,
  closeModal,
}: Props) => {
  const queryClient = useQueryClient();

  const handleDelete = useMutation(
    (deleteId: number) => deleteTodoItem(deleteId),
    {
      onSuccess: () => {
        if (activityId) {
          queryClient.invalidateQueries(`activity-${activityId}`);
          closeModal();
        }
      },
    }
  );

  return (
    <DialogOverlayStyled isOpen={showDeleteModal} onDismiss={closeModal}>
      <DialogContentStyled aria-label="Tambah List Item" data-cy="modal-delete">
        <ModalContentContainer>
          <NextImage
            src={DeleteImage}
            alt="Menghapus Data"
            data-cy="modal-delete-icon"
          />
          <p data-cy="modal-delete-title">
            Apakah anda yakin menghapus List Item <strong>“{title}”</strong>?
          </p>
        </ModalContentContainer>
        <FooterContainer>
          <Button
            bgColor="hsla(0, 0%, 96%, 1)"
            textColor="black"
            data-cy="modal-delete-cancel-button"
            style={{
              marginRight: "1.25em",
            }}
            onClick={closeModal}
          >
            <ButtonText>Batal</ButtonText>
          </Button>
          <Button
            bgColor="hsla(354, 82%, 61%, 1)"
            textColor="white"
            data-cy="modal-delete-confirm-button"
            onClick={() => handleDelete.mutate(deleteId)}
          >
            <ButtonText>Hapus</ButtonText>
          </Button>
        </FooterContainer>
      </DialogContentStyled>
    </DialogOverlayStyled>
  );
};

export default DialogDelete;
