import {
  Box,
  Paper,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  CalanderIcon,
  CheckedInIcon,
  CheckIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "../../../../assets/Icones";
import ViewButton from "../../../../public/icons/viewButton.png";
import moment from "moment";
import { game_history } from "../../../../api/gameData";
import useLocalStorage from "../../../../utils/useLocalStorage";

function createData(
  ticketId,
  gameID,
  startingPoint,
  played,
  won,
  end,
  endPoint,
  status,
  result,
  date,
  drawtime,
  TicketTime
) {
  return {
    ticketId,
    gameID,
    startingPoint,
    played,
    won,
    end,
    endPoint,
    status,
    result,
    date,
    drawtime,
    TicketTime,
  };
}

const rows = [
  createData(
    "6396-1NG1497",
    504584,
    5360.0,
    40.0,
    100.0,
    504484,
    5360.0,
    "DONE",
    "3-N",
    "28-11-2024",
    "8:22PM",
    "08:21:10 PM"
  ),
  createData(
    "6396-1NG1497",
    504584,
    5360.0,
    40.0,
    100.0,
    504484,
    5360.0,
    "NO WIN",
    "3-N",
    "28-11-2024",
    "8:22PM",
    "08:21:10 PM"
  ),
];

function GameHistory() {
  const dateRefFrom = useRef(null);
  const dateRefTo = useRef(null);
  const [date, setDate] = useState({
    from: moment(),
    to: moment(),
  });
  const [pageNum, setPageNum] = useState(1);
  const [historyList, setHistoryList] = useState([]);
  const [idLocl, setLocalid] = useLocalStorage("userDetails", {});
  const handleIconClickFrom = () => {
    if (dateRefFrom.current) {
      // dateRef.current.click(); // Programmatically trigger the click on the hidden input
      dateRefFrom.current.showPicker();
    }
  };

  const handleIconClickTo = () => {
    if (dateRefTo.current) {
      // dateRef.current.click(); // Programmatically trigger the click on the hidden input
      dateRefTo.current.showPicker();
    }
  };

  const handleDateChangeFrom = (event) => {
    const selectedDate = event.target.value; // Get the selected date as a string
    setDate({ ...date, from: moment(selectedDate) }); // Update the state with the new date
  };

  const handleDateChangeTo = (event) => {
    const selectedDate = event.target.value; // Get the selected date as a string
    setDate({ ...date, to: moment(selectedDate) }); // Update the state with the new date
  };

  useEffect(() => {
    game_history(idLocl.id).then((data) => {
      console.log(data.response.data);
      setHistoryList(data.response.data);
    });
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ bgcolor: "#FFE5C6", height: "89%" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              FROM : {date.from.format("DD/MM/YYYY")}
            </Typography>
            <IconButton onClick={handleIconClickFrom}>
              <input
                ref={dateRefFrom}
                type="date"
                style={{ visibility: "hidden", width: "0px" }}
                onChange={handleDateChangeFrom}
              />
              <CalanderIcon />
            </IconButton>

            <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              TO : {date.to.format("DD/MM/YYYY")}
            </Typography>
            <IconButton onClick={handleIconClickTo}>
              <input
                ref={dateRefTo}
                type="date"
                style={{ visibility: "hidden", width: "0px" }}
                onChange={handleDateChangeTo}
              />
              <CalanderIcon />
            </IconButton>
            <FormControlLabel
              value="all"
              control={
                <Checkbox
                  checkedIcon={<CheckedInIcon />}
                  icon={<CheckIcon />}
                />
              }
              label="ALL"
              labelPlacement="end" // 'end' is the correct value for label placement; 'all' is invalid
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                },
              }}
            />

            <Button
              value="result"
              aria-label="left aligned"
              sx={{
                width: "124px",
                borderRadius: 3,
                p: 0,
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#042655",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                },
              }}
            >
              <img
                src={ViewButton}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
              <Typography>VIEW</Typography>
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => setPageNum((prev) => (prev > 1 ? prev - 1 : prev))}
            >
              <LeftArrowIcon />
            </IconButton>
            <Typography>{pageNum}</Typography>
            <IconButton>
              <RightArrowIcon
                onClick={() =>
                  setPageNum((prev) => (prev <= 100 ? prev + 1 : prev))
                }
              />
            </IconButton>
          </Box>
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
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  borderBottom: "6px solid #FFE5C6",
                },
              }}
            >
              <TableCell>Ticket ID</TableCell>
              <TableCell>Game ID</TableCell>
              <TableCell>Start Point</TableCell>
              <TableCell>Played</TableCell>
              <TableCell>Won</TableCell>
              <TableCell>End</TableCell>
              <TableCell>End Point</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Draw Time</TableCell>
              <TableCell>Ticket Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyList.map((row) => (
              <TableRow
                key={row.ticketId}
                sx={{
                  "td,th": {
                    mb: 10,
                    bgcolor: "#FFFFFF",
                    borderBottom: "6px solid #FFE5C6",
                    fontWeight: "bold",
                  },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.ticket_id}
                </TableCell>
                <TableCell>{row.game_id}</TableCell>
                <TableCell>{row.start_point}</TableCell>
                <TableCell>{row.played}</TableCell>
                <TableCell>{row.won}</TableCell>
                <TableCell>{row.end}</TableCell>
                <TableCell>{row.end_point}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row?.result}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{moment(row.draw_time, 'HH:mm:ss.SSSSSS').format("hh:mm A")}</TableCell>
                <TableCell>{moment(row.ticket_time, 'HH:mm:ss.SSSSSS').format("hh:mm A")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControlLabel
            value="all"
            control={
              <Checkbox checkedIcon={<CheckedInIcon />} icon={<CheckIcon />} />
            }
            label="PRINT CLAIM"
            labelPlacement="end" // 'end' is the correct value for label placement; 'all' is invalid
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.8rem",
                // fontWeight: "bold",
              },
            }}
          />
          <FormControlLabel
            value="all"
            control={
              <Checkbox checkedIcon={<CheckedInIcon />} icon={<CheckIcon />} />
            }
            label="PRINT CANCEL"
            labelPlacement="end" // 'end' is the correct value for label placement; 'all' is invalid
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.8rem",
                // fontWeight: "bold",
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MiniButton name={"REFRESH"} />
          <MiniButton name={"ALL CLAIM"} />
          <MiniButton name={"DETAILS"} />
          <MiniButton name={"REPRINT"} />
          <MiniButton name={"CLAIM"} />
          <MiniButton name={"CANCEL"} />
        </Box>
      </Box>
    </Box>
  );
}

export default GameHistory;

const MiniButton = function ({ name, onClick }) {
  return (
    <Button
      value="result"
      aria-label="left aligned"
      onClick={onClick}
      sx={{
        width: "124px",
        borderRadius: 3,
        p: 0,
        "& .MuiTypography-root": {
          fontSize: "14px",
          fontWeight: "600",
          color: "#042655",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
        },
      }}
    >
      <img src={ViewButton} alt="" style={{ width: "100%", height: "100%" }} />
      <Typography>{name}</Typography>
    </Button>
  );
};
