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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const aImage = "../icons/buttonActive.png";
const dImage = "../icons/buttonDeactive.png";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
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
          mt: 3,
          gap: 1,
          height: "70.52px",
          mb: 2,
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
              borderRadius: 3,
              p: 0,
              "& .MuiTypography-root": {
                fontSize: "20px",
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
            sx={{ width: "194px" }}
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
            sx={{ width: "245px" }}
          >
            <img
              src={alignment === "gameHistory" ? aImage : dImage}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
            <Typography>GAME HISTORY</Typography>
          </ToggleButton>
          <ToggleButton
            value="report"
            aria-label="right aligned"
            sx={{ width: "245px" }}
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
            sx={{ width: "320px", height: "70.52px" }}
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
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ bgcolor: "#FFE5C6" }}
        >
            <Box sx={{ display: 'flex', alignItems: "center", gap: 2 }} >
              <Typography>SELECT DATE : 28/11/2024</Typography>  
              <IconButton>
                
              </IconButton>
            </Box>
          <Table
            sx={{ minWidth: 650, borderSpacing: "0 20px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow
                sx={{
                  th: {
                    mb: 1,
                    border: 0,
                    bgcolor: "rgba(255,180,193,39)",
                    fontSize: "17px",
                    fontWeight: "600",
                    borderBottom: "6px solid #FFE5C6"
                  },
                }}
              >
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "td,th": { mb: 10, bgcolor: "#FFFFFF", borderBottom: "6px solid #FFE5C6" },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={alignment} index={"gameHistory"}></CustomTabPanel>
      <CustomTabPanel value={alignment} index={"report"}></CustomTabPanel>
      <CustomTabPanel
        value={alignment}
        index={"unclameTickets"}
      ></CustomTabPanel>
    </StyledModal>
  );
}

InfoModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
export default InfoModal;
