import { Box, IconButton, Paper, Typography } from "@mui/material";
import { InfoIcon } from "../../../assets/Icones";
import topBackground from "../../../public/backgrounds/topBackground.png";
import useLocalStorage from "../../../utils/useLocalStorage";
import { useEffect, useState } from "react";

const timeLapList = [
  {
    num: 1,
    color: "#B36A09",
    token: "",
  },

  {
    num: 2,
    color: "#EF0202",
    token: "",
  },
  {
    num: 3,
    color: "#F98C07",
    token: "",
  },
  {
    num: 4,
    color: "#EEDE01",
    token: "",
  },
  {
    num: 5,
    color: "#0D9E7D",
    token: "",
  },
  {
    num: 6,
    color: "#0154C9",
    token: "",
  },
  {
    num: 7,
    color: "#042655",
    token: "",
  },
  {
    num: 8,
    color: "#EB1B90",
    token: "",
  },
  {
    num: 9,
    color: "#01A501",
    token: "",
  },
  {
    num: 0,
    color: "#06A5C1",
    token: "",
  },
]

const getColorForNumber = (number) => {
  const colorMap = {
    1: "#B36A09",
    2: "#EF0202",
    3: "#F98C07",
    4: "#EEDE01",
    5: "#0D9E7D",
    6: "#0154C9",
    7: "#042655",
    8: "#EB1B90",
    9: "#01A501",
    0: "#06A5C1"
  };
  return colorMap[number] || "#F98C07"; // Default color if number not found
};

function Historyinfo({ setinfoModal }) {

  const [historyList, sethistoryList] = useState([])

  // const [historyList] = useLocalStorage("historyList");
  // console.log(localStorage.getItem("historyList"));

  useEffect(() => {
    // Initial load
    sethistoryList(JSON.parse(localStorage.getItem("historyList")));

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "historyList") {
        sethistoryList(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  return (
    <Box
      sx={{
        // display: "flex",
        // justifyContent: "flex-end",
        // alignItems: "center",
        // backgroundImage:
        //   "linear-gradient(180deg, rgba(251,221,138,1) 0%, rgba(255,132,0,1) 49%, rgba(255,187,0,1) 100%)",
        // p: 1,
        zIndex: 1,
        position: "relative",
      }}
    >
      <img
        src={topBackground}
        alt=""
        style={{
          width: "100%",
          position: "absolute",
          top: "-5px",
          height: "6rem",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "absolute",
          // top: 12,
          right: 20,
        }}
      >
        <Typography
          sx={{
            color: "#390206",
            fontSize: "24px",
            fontWeight: "600",
            textTransform: "uppercase",
            mr: 2,
          }}
        >
          HISTORY
        </Typography>
        <Box
          sx={{
            bgcolor: "#622402",
            p: "6px",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {historyList.map((e, i) => (
            <Box key={i}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: "500",
                  color: "white",
                  mb: "4px",
                }}
              >
                {e.time}
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: getColorForNumber(e.num) || "#F98C07",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "white",
                    fontFamily: "Hahmlet Variable",
                  }}
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
