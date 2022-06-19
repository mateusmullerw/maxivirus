import { ReactElement, useState } from "react";
import { CitizenInfo } from "context";
import { Modal, Typography, Chip, Button } from "@mui/material";
import {
  UserSummary,
  Info,
  Name,
  StyledAvatar,
  OutlinedInfo,
  Row,
  InconAndInfo,
  ModalContainer,
} from "./UserDetails.styles";
import { useTheme } from "@mui/material/styles";
import CoronavirusRoundedIcon from "@mui/icons-material/CoronavirusRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import ConfirmationModal from "./ConfirmationModal";

type SurvivalOption = {
  label: "Survivor" | "Infected";
  icon: ReactElement;
  color: "success" | "error";
};
type SurvivalMap = {
  false: SurvivalOption;
  true: SurvivalOption;
};
const survivalMap: SurvivalMap = {
  false: {
    label: "Survivor",
    icon: <HealthAndSafetyRoundedIcon />,
    color: "success",
  },
  true: {
    label: "Infected",
    icon: <CoronavirusRoundedIcon />,
    color: "error",
  },
};

type Props = {
  open: boolean;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  handleInfect: Function;
  userData: CitizenInfo;
};
const UserDetails = (props: Props) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const theme = useTheme();

  const { open, handleClose, userData, handleInfect } = props;
  const { infected, name, picture, phone, email, dob, registered, location } =
    userData;
  const gender =
    userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1);

  const fullAddress =
    location.street.name +
    ", " +
    location.street.number +
    ", " +
    location.city +
    ", " +
    location.state +
    " - " +
    location.country;

  const fullName = name.title + " " + name.first + " " + name.last;
  const confirmLabel = "Infect " + fullName;

  const handleConfirmInfection = () => {
    handleInfect();
    setOpenConfirmation(false)
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="user-details">
      <ModalContainer>
        <UserSummary>
          <StyledAvatar
            color={
              infected ? theme.palette.error.light : theme.palette.success.light
            }
            src={picture.large}
          />
          <Info>
            <Name>
              <Typography variant="h5">{fullName}</Typography>
              <Chip
                size="small"
                icon={
                  survivalMap[(infected.toString() as "true") || "false"].icon
                }
                label={
                  survivalMap[(infected.toString() as "true") || "false"].label
                }
                variant="outlined"
                color={
                  survivalMap[(infected.toString() as "true") || "false"].color
                }
              ></Chip>
            </Name>
            <Typography
              style={{ color: theme.palette.text.secondary }}
              variant="body1"
            >
              {gender +
                "  •  Age: " +
                dob.age +
                "  •  " +
                location.city +
                ", " +
                location.state}
            </Typography>
          </Info>
        </UserSummary>
        <Row>
          <OutlinedInfo
            icon={<LocalPhoneRoundedIcon />}
            label={phone}
            variant="outlined"
            color="default"
          ></OutlinedInfo>
          <OutlinedInfo
            icon={<EmailRoundedIcon />}
            label={email}
            variant="outlined"
            color="default"
          ></OutlinedInfo>
        </Row>
        <OutlinedInfo
          icon={<PlaceRoundedIcon />}
          label={fullAddress}
          variant="outlined"
          color="default"
        ></OutlinedInfo>
        {infected ? (
          <InconAndInfo
            icon={<CoronavirusRoundedIcon />}
            label={`Infected ${new Date(registered.date).toDateString()}`}
            variant="outlined"
            color="default"
          ></InconAndInfo>
        ) : (
          <Button
            onClick={() => setOpenConfirmation(true)}
            variant="outlined"
            color="error"
            disableElevation
          >
            Infect this person
          </Button>
        )}
        <ConfirmationModal
        title="Infect"
        message="Are you sure you want to infect this person? This action is irreversible."
        confirmationText={confirmLabel}
        confirmButtonLabel="Infect"
        onConfirm={handleConfirmInfection}
        open={openConfirmation}
        handleClose={() => setOpenConfirmation(false)}
      />
      </ModalContainer>
    </Modal>
  );
};

export default UserDetails;
