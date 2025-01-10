import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import StyledModal from "../../../components/CustomComponent/StyledModal";
import { useState } from "react";
import { CancleButton } from "../../../assets/Icones";
import aImage from "../../../public/icons/buttonActive.png";
import dImage from "../../../public/icons/buttonDeactive.png";
import Result from "./infocomponents/Result";
import GameHistory from "./infocomponents/GameHistory";
import Report from "./infocomponents/Report";
import UnclamedTicktes from "./infocomponents/UnclamedTicktes";
import Rules from "./infocomponents/Rules";

// const aImage = "../icons/buttonActive.png";
// const dImage = "../icons/buttonDeactive.png";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: "84%"}}
      {...other}
    >
      {value === index && <Box sx={{ height: "100%"}}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function InfoModal({ open, handleClose }) {
  const [alignment, setAlignment] = useState("result");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };

  return (
    <StyledModal open={open} handleClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          // my: 1,
          gap: 1,
          height: "70.52px",
          mb: 1,
        }}
      >
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{
            gap: 2,
            [`& .${toggleButtonGroupClasses.grouped}`]: {
              // borderRadius: theme.shape.borderRadius,
              // margin: theme.spacing(0.5),
              // m: 0,
              height: '3.1rem',
              borderRadius: 3,
              p: 0,
              "& .MuiTypography-root": {
                fontSize: "1rem",
                fontWeight: "600",
                color: "#042655",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
              },
              [`&.${toggleButtonGroupClasses.disabled}`]: {
                border: 0,
                //   p: 0,
              },
            },
          }}
        >
          <ToggleButton
            value="result"
            aria-label="left aligned"
            sx={{ width: "10rem" }}
          >
            {/* <FormatAlignLeftIcon /> */}
            <img
              src={alignment === "result" ? aImage : dImage}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
            <Typography>RESULT</Typography>
          </ToggleButton>
          <ToggleButton
            value="gameHistory"
            aria-label="centered"
            sx={{ width: "13rem" }}
          >
            <img
              src={alignment === "gameHistory" ? aImage : dImage}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
            <Typography>GAME HISTORY</Typography>
          </ToggleButton>
          <ToggleButton
            value="rules"
            aria-label="right aligned"
            sx={{ width: "10rem" }}
          >
            <img
              src={alignment === "rules" ? aImage : dImage}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
            <Typography>RULES</Typography>
          </ToggleButton>
          <ToggleButton
            value="report"
            aria-label="right aligned"
            sx={{ width: "10rem" }}
          >
            <img
              src={alignment === "report" ? aImage : dImage}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
            <Typography>REPORT</Typography>
          </ToggleButton>

          <ToggleButton
            value="unclameTickets"
            aria-label="justified"
            sx={{ width: "18rem", }}
          >
            <img
              src={alignment === "unclameTickets" ? aImage : dImage}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
            <Typography>UNCLAIMED TICKETS</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <IconButton onClick={() => handleClose()}>
          <CancleButton sx={{ fontSize: "35px" }} />
        </IconButton>
      </Box>
      <CustomTabPanel value={alignment} index={"result"}>
        <Result />
      </CustomTabPanel>
      <CustomTabPanel value={alignment} index={"gameHistory"}>
        <GameHistory />
      </CustomTabPanel>
      <CustomTabPanel value={alignment} index={"rules"}>
        <Rules />
      </CustomTabPanel>
      <CustomTabPanel value={alignment} index={"report"}>
        <Report />
      </CustomTabPanel>
      <CustomTabPanel value={alignment} index={"unclameTickets"}>
        <UnclamedTicktes />
      </CustomTabPanel>
    </StyledModal>
  );
}

InfoModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
export default InfoModal;
