import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import gsap from "gsap";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import bottom from "../../../public/backgrounds/bottom.png";
import treasury from "../../../public/backgrounds/treasury.png";
import LoadingTexture from "../../../public/backgrounds/Loader Texture.png";
import playButton from "../../../public/icons/playButton.png";
import winButton from "../../../public/icons/winButton.png";
import Chip10 from "../../../public/icons/Chip10.png";
import Chip20 from "../../../public/icons/Chip20.png";
import Chip25 from "../../../public/icons/Chip25.png";
import Chip50 from "../../../public/icons/Chip50.png";
import Chip100 from "../../../public/icons/Chip100.png";
import Chip500 from "../../../public/icons/Chip500.png";

import ButtonIcon from "../../../public/icons/Button.png";
import SmallButton from "../../../public/icons/SmallButton.png";
import { GameButton } from "../../../components/Utils/StyledComponents";
// import { ipcRenderer } from "electron";

const chipList = [
  { num: 10, img: Chip10 },
  { num: 20, img: Chip20 },
  { num: 25, img: Chip25 },
  { num: 50, img: Chip50 },
  { num: 100, img: Chip100 },
  { num: 500, img: Chip500 },
];

function BottomPortion({
  handlePlay,
  chipNum,
  setChipNum,
  betFunction,
  chipSound,
  openAlertBox,
  remainingTime,
  isDisabled,
  betFunc,
  play,
  betNumList,
  duration,
  // progressRef,
}) {
  // const [chipNum, setChipNum] = useState(null);
  // const progressRef = useRef(null);
  // const [time, setTime] = useState(moment().format("h:mm A"));
  // const initialTime = moment.duration(3, "minutes"); // 3 minutes
  // const [remainingTime, setRemainingTime] = useState(initialTime);
  // const [isCounting, setIsCounting] = useState(false);
  const progressRef = useRef(null);
  const TOTAL_DURATION = 120000; // 2 minutes in milliseconds
  const handleShrink = () => {
    // console.log(
    //   betNumList
    //     .filter((e) => e.token !== "")
    //     .map((e) => ({ num: e.num, token: e.token }))
    // );
    betFunc();
    // handlePrint();
    // if (!isCounting) {
    //   setIsCounting(true); // Start countdown
    // gsap.to(progressRef.current, {
    //   width: 0, // Shrink to 0 width
    //   duration: 180, // Total duration in seconds (180 seconds)
    //   ease: "linear", // Linear easing for consistent speed
    // });
    // }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(moment().format("h:mm A"));
  //   }, 1000);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  // useEffect(() => {
  //   if (remainingTime.asSeconds() > 0 && isCounting === true) {
  //     const timer = setInterval(() => {
  //       setRemainingTime((prevTime) =>
  //         moment.duration(prevTime.asSeconds() - 1, "seconds")
  //       );
  //     }, 1000);

  //     return () => clearInterval(timer); // Cleanup timer
  //   }
  // }, [remainingTime, isCounting]);

  const formatCountdown = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    return `${"0" + minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Add useEffect for progress bar animation
  useEffect(() => {
    if (remainingTime > 0 && progressRef.current) {
      const percentageRemaining = (remainingTime / TOTAL_DURATION) * 100;
      
      // Set initial width based on remaining time
      gsap.set(progressRef.current, { width: `${percentageRemaining}%` });
      
      // Animate remaining time to 0
      gsap.to(progressRef.current, {
        width: '0%',
        duration: remainingTime / 1000,
        ease: "linear",
      });
    }
  }, [remainingTime]);


  return (
    <Box sx={{ position: "relative", mt: "-235px" }}>
      {/* <img
        src={bottom}
        alt=""
        style={{ width: "100%", position: "absolute", bottom: 0, left: 0 }}
      /> */}
      <BackgroundSVG />

      <img
        src={treasury}
        alt=""
        style={{
          position: "absolute",
          top: -14,
          left: 50,
          width: "599px",
          height: "342px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: 20,
          // zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {chipList.map((e, i) => (
          <IconButton
            disabled={isDisabled}
            key={i + 1}
            sx={{ position: "relative", width: "110px", height: "110px" }}
            onClick={() => {
              setChipNum((prev) => prev !== e.num && e.num);
              chipSound.play();
            }}
          >
            <img
              src={e.img}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                border: chipNum === e.num ? "3px solid #3BF435" : "none",
                borderRadius: "999px",
              }}
            />
            <Typography
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "19px",
                fontWeight: "600",
                color: "#042655",
                fontFamily: "Hahmlet Variable",
              }}
            >
              {e.num}
            </Typography>
          </IconButton>
        ))}
      </Box>

      <Box sx={{ position: "absolute", bottom: 16, left: 130, zIndex: 5 }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box>
            {/* <Button sx={{ p: 0, mb: 1 }} onClick={() => handlePlay()}> */}
            <img src={playButton} alt="Play" />
            {/* </Button> */}
            <Typography
              sx={{
                color: "white",
                py: 1,
                // backgroundImage:
                //   "linear-gradient(180deg, rgba(4,38,85,1) 0%, rgba(9,84,187,1) 100%)",
                backgroundColor: "#6D2802",
                border: "1px solid #FFEDBA",
                fontSize: "38.72px",
                fontWeight: "600",
                textAlign: "center",
                borderRadius: "8.61px",
                fontFamily: "Hahmlet Variable",
              }}
            >
              {play + ".00"}
            </Typography>
          </Box>
          <Box>
            {/* <Button
              sx={{ p: 0, mb: 1 }}
              onClick={() => setIsmessageModal(true)}
            > */}
            <img src={winButton} alt="Win" />
            {/* </Button> */}
            <Typography
              sx={{
                color: "white",
                py: 1,
                // backgroundImage:
                //   "linear-gradient(180deg, rgba(4,38,85,1) 0%, rgba(9,84,187,1) 100%)",
                backgroundColor: "#6D2802",
                border: "1px solid #FFEDBA",
                fontSize: "38.72px",
                fontWeight: "600",
                textAlign: "center",
                borderRadius: "8.61px",
                fontFamily: "Hahmlet Variable",
              }}
            >
              0.00
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 28,
          right: 20,
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box sx={{}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <GameButton
              disabled={isDisabled}
              variant="contained"
              sx={{
                width: "190px",
              }}
              onClick={() => betFunction("upperLine")}
            >
              UPPER LINE
            </GameButton>
            <GameButton
              disabled={isDisabled}
              variant="contained"
              sx={{
                width: "190px",
              }}
              onClick={() => betFunction("lowerLine")}
            >
              Lower LINE
            </GameButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <GameButton
              disabled={isDisabled}
              variant="contained"
              sx={{
                width: "120px",
              }}
              onClick={() => betFunction("odd")}
            >
              ODDS
            </GameButton>
            <GameButton
              disabled={isDisabled}
              variant="contained"
              sx={{
                width: "120px",
              }}
              onClick={() => betFunction("even")}
            >
              EVENS
            </GameButton>
            <GameButton
              disabled={isDisabled}
              variant="contained"
              sx={{
                width: "120px",
              }}
              onClick={() => betFunction("double")}
            >
              DOUBLE
            </GameButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <GameButton
              disabled={isDisabled}
              variant="contained"
              sx={{
                width: "120px",
              }}
              onClick={() => betFunction("repeat")}
            >
              REPEAT
            </GameButton>
            <GameButton
              disabled={isDisabled}
              variant="contained"
              sx={{
                width: "120px",
              }}
              onClick={() => betFunction("clear")}
            >
              CLEAR
            </GameButton>
            <GameButton
              disabled={isDisabled}
              variant="contained"
              sx={{
                width: "120px",
              }}
              onClick={handleShrink}
            >
              BET
            </GameButton>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              color: "black",
              textAlign: "center",
              mb: 1,
            }}
          >
            Next Draw : {duration}
            {/* Next Draw : {duration?.format("h:mm A")} */}
          </Typography>
          <Paper
            elevation={0}
            sx={{
              border: "3px solid black",
              // p: "16px",
              width: "272px",
              borderRadius: "16px",
              backgroundColor: "transparent",
              // backgroundImage:
              //   "linear-gradient(180deg, rgba(251,221,138,1) 0%, rgba(255,132,0,1) 49%, rgba(255,187,0,1) 100%)",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                color: "white",
                fontSize: "52px",
                fontWeight: "600",
                // "-webkit-text-stroke": "2px #042655",
                fontFamily: "Hahmlet Variable",
                bgcolor: "#CB0043",
                borderRadius: "12px 12px 0px 0px",
              }}
            >
              {formatCountdown(remainingTime)}
            </Typography>
            <Box sx={{ p: "14px" }}>
              <Box
                sx={{
                  overflow: "hidden",
                  border: "2px solid #000",
                  height: "37px",
                  width: "100%",
                  borderRadius: "30px",
                  backgroundImage: `url('${LoadingTexture}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* <img src={LoadingTexture} alt="" style={{ position: ""}} /> */}
                <Box
                  ref={progressRef}
                  sx={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(220,0,0,1) 0%, rgba(255,195,0,1) 48%, rgba(0,255,30,1) 100%)",
                    backgroundColor: "rgb(220,0,0)",
                    width: "100%",
                    height: "100%",
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default BottomPortion;

const BackgroundSVG = () => (
  <svg
    width={1440}
    // height={327}
    viewBox="0 0 1440 327"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // {...props}
  >
    <path
      d="M-18.5 47.5V350L1450 338V3H712.5C681.7 3 669 39.36 634 72c-44.5 41.5-111.993 135-279 135C186.5 207 78.5 47.5-18.5 47.5z"
      fill="url(#paint0_linear_2216_122)"
      stroke="url(#paint1_linear_2216_122)"
      strokeWidth={5}
    />
    <defs>
      <linearGradient
        id="paint0_linear_2216_122"
        x1={688.503}
        y1={2.9999}
        x2={694.503}
        y2={398}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F1830A" />
        <stop offset={0.508697} stopColor="#BD2F00" />
        <stop offset={1} stopColor="#FFAC09" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_2216_122"
        x1={298.5}
        y1={-70.9994}
        x2={640.999}
        y2={341.001}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFCF82" />
        <stop offset={1} stopColor="#FF9D00" />
      </linearGradient>
    </defs>
  </svg>
);
