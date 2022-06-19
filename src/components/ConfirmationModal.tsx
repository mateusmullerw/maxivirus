import React, { useState } from "react";
import { Modal, Typography, Button, TextField } from "@mui/material";
import { ModalContainer, ButtonsContainer } from "./ConfirmationModal.styles";
import { useTheme } from "@mui/material/styles";

type Props = {
  open: boolean;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  title: string;
  message: string;
  confirmationText: string;
  confirmButtonLabel: string;
  onConfirm: Function;
};
const ConfirmationModal = (props: Props) => {
  const [disableConfirm, setDisableConfirm] = useState(true);

  const theme = useTheme();

  const {
    open,
    handleClose,
    onConfirm,
    title,
    message,
    confirmButtonLabel,
    confirmationText,
  } = props;

  const handleConfirmationText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isSameText = confirmationText === event.target.value;
    setDisableConfirm(!isSameText);
  };

  return (
    <Modal
      data-testid="confirmation-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="user-details"
    >
      <ModalContainer>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="body1">
          To confirm this action, type "
          <strong style={{ color: theme.palette.error.dark }}>
            {confirmationText}
          </strong>
          " below:
        </Typography>
        <TextField
          id="confirmation-text"
          label="Confirm infection"
          variant="outlined"
          onChange={handleConfirmationText}
        />
        <ButtonsContainer>
          <Button
            disableElevation
            onClick={(e) => handleClose(e, "escapeKeyDown")}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm()}
            disabled={disableConfirm}
            variant="contained"
            color="error"
            disableElevation
          >
            {confirmButtonLabel}
          </Button>
        </ButtonsContainer>
      </ModalContainer>
    </Modal>
  );
};

export default ConfirmationModal;
