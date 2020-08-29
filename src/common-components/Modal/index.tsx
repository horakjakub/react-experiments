import React, { ReactElement } from "react";
import { createPortal } from "react-dom";
import { Blanket, CloseButton, ModalContainer } from "./styled";
import { witchOnDirectClick } from "./helpers";

export default Modal;

function Modal({
  children, closeModal,
}: {
  children: ReactElement;
  closeModal: () => void;
}) {
  return createPortal(
    <Blanket onClick={witchOnDirectClick(closeModal)}>
      <CloseButton onClick={witchOnDirectClick(closeModal)}>X</CloseButton>
      <ModalContainer>{children}</ModalContainer>
    </Blanket>,
    document.body
  );
}
