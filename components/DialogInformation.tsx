// import React from 'react'
import NextImage from "next/image";
import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import InfoIcon from "../public/assets/icons/modal-information-icon.svg";
import "@reach/dialog/styles.css";

const DialogOverlayStyled = styled(DialogOverlay)`
  z-index: 4;
`;

const DialogContentStyled = styled(DialogContent)`
  border-radius: 12px;
`;

interface Props {
  showInfoModal: boolean;
  closeInfoModal: () => void;
}

const DialogInformation = ({ showInfoModal, closeInfoModal }: Props) => {
  return (
    <DialogOverlayStyled
      isOpen={showInfoModal}
      onDismiss={closeInfoModal}
      aria-label="Information message"
    >
      <DialogContentStyled data-cy="modal-information">
        <div style={{ display: "flex", alignItems: "center" }}>
          <NextImage
            src={InfoIcon}
            alt="Information"
            data-cy="modal-information-icon"
          />
          <p data-cy="modal-information-title" style={{ marginLeft: "0.75em" }}>
            Activity berhasil dihapus
          </p>
        </div>
      </DialogContentStyled>
    </DialogOverlayStyled>
  );
};

export default DialogInformation;
