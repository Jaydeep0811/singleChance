import { Box, IconButton, Paper, Typography } from "@mui/material";
import { InfoIcon } from "../../../assets/Icones";
import topBackground from "../../../public/backgrounds/topBackground.png"

const timeLapList = [
  {
    time: "10:50 PM",
    color: "#F98C07",
    num: 3,
  },
  {
    time: "10:48 PM",
    color: "#F98C07",
    num: 0,
  },
  {
    time: "10:44 PM",
    color: "#3CC23B",
    num: 5,
  },
  {
    time: "10:42 PM",
    color: "#F98C07",
    num: 3,
  },
  {
    time: "10:40 PM",
    color: "#EB1B90",
    num: 8,
  },
  {
    time: "10:38 PM",
    color: "#F98C07",
    num: 3,
  },
  {
    time: "10:36 PM",
    color: "#F98C07",
    num: 0,
  },
  {
    time: "10:34PM",
    color: "#EF0202",
    num: 2,
  },
  {
    time: "10:32 PM",
    color: "#3CC23B",
    num: 5,
  },
];

function Historyinfo({setinfoModal}) {
  return (
    <Box
      sx={
        {
          // display: "flex",
          // justifyContent: "flex-end",
          // alignItems: "center",
          // backgroundImage:
          //   "linear-gradient(180deg, rgba(251,221,138,1) 0%, rgba(255,132,0,1) 49%, rgba(255,187,0,1) 100%)",
          // p: 1,
          zIndex: 1,
          position: "relative"
        }
      }
    >
      <img
        src={topBackground}
        alt=""
        style={{ width: "100%", position: "absolute", top: "-5px" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          position:"absolute",
          top: 12,
          right: 20,
        }}
      >
        <Typography
          sx={{
            color: "#042655",
            fontSize: "24px",
            fontWeight: "500",
            textTransform: "uppercase",
            mr: 2,
          }}
        >
          HISTORY
        </Typography>
        <Box
          sx={{
            bgcolor: "#042655",
            p: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {timeLapList.map((e, i) => (
            <Box key={i}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "white",
                  mb: 1,
                }}
              >
                {e.time}
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: e.color || "#F98C07",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: "36px", fontWeight: "600", color: "white" }}
                >
                  {e.num}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
        <IconButton onClick={() => setinfoModal(true)}>
          <InfoIcon sx={{ fontSize: "42px" }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Historyinfo;
