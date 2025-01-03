// import React from 'react'

import gsap from "gsap";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Popover, Typography } from "@mui/material";
import Historyinfo from "./components/Historyinfo";
import BetNumbers from "./components/BetNumbers";
import BottomPortion from "./components/BottomPortion";
// import StyledModal from "../../components/CustomComponent/StyledModal";
import InfoModal from "./components/InfoModal";
import Spinner2 from "../../components/Spinner/Spinner2";
import { useGSAP } from "@gsap/react";
import { Howl, Howler } from "howler";
import ChipSound from "../../public/GAME SOUNDS/Chip Sound.mp3";
import SpinnerSound from "../../public/GAME SOUNDS/Spinning Wheel.mp3";
import MessageModal from "../../components/CustomComponent/MessageModal";
import { get_balance } from "../../api/gameData";
import moment from "moment";

// Setup the new Howl.
const chipSound = new Howl({
  src: [ChipSound],
});

const spinnerSound = new Howl({
  src: [SpinnerSound],
});

//Mute the voice
Howler.mute(true);

function Home() {
  const [betNumList, setBetNumList] = useState([
    {
      num: 1,
      color: "#005EE1",
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
      color: "#3CC23B",
      token: "",
    },
    {
      num: 6,
      color: "#0154C9",
      token: "",
    },
    {
      num: 7,
      color: "#3D07A5",
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
      color: "#F98C07",
      token: "",
    },
  ]);

  const [chipNum, setChipNum] = useState(null);
  const [ismessModal, setIsmessageModal] = useState(false);
  const [play, setPlay] = useState(0);
  const [win, setWin] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [infoModal, setinfoModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const wheelRef1 = useRef(null);
  const wheelRef2 = useRef(null);
  const currentRef = useRef(null);
  const boxRef = useRef(null);

  const spinner = (targetNumber) => {
    const sections = 10; // Number of sections
    const sectionAngle = 360 / sections; // Angle for each section
    const angleOffset = sectionAngle / 2; // Offset to align with the center of the section
    const initialRotation = -72; // Initial offset to align with "1"

    // Get the current rotation of the spinner
    const currentRotation =
      gsap.getProperty(wheelRef1.current, "rotation") || 0;

    // Calculate the target rotation to land on the desired number
    const targetRotation =
      360 - (targetNumber * sectionAngle + angleOffset) - initialRotation;

    // Ensure the spinner always rotates clockwise by adding extra full spins
    const randomExtraRotation = 360 * gsap.utils.random(5, 10, 1); // 5-10 full spins
    const rotationNext =
      currentRotation +
      randomExtraRotation +
      ((targetRotation - currentRotation) % 360);

    // Spin the wheel to land on the target number
    const luckywheelTimeline = gsap.timeline({
      onComplete: () => {
        console.log(`Spinner landed on number: ${targetNumber}`);
      },
    });

    luckywheelTimeline.to(wheelRef1.current, {
      duration: 11.3,
      rotation: rotationNext,
      transformOrigin: "50% 50%",
      ease: "power4",
    });

    // Optional: Spin the second wheel, if necessary
    if (wheelRef2) {
      luckywheelTimeline.to(
        wheelRef2.current,
        {
          duration: 11.3,
          rotation: rotationNext,
          transformOrigin: "50% 50%",
          ease: "power4",
        },
        "<" // Start both animations simultaneously
      );
    }
  };

  useGSAP(() => {
    gsap.set(wheelRef1.current, { rotation: 18, transformOrigin: "50% 50%" });
    gsap.set(wheelRef2.current, { rotation: 18, transformOrigin: "50% 50%" });
  }, []);

  // Handle Spin Button
  const handlePlay = () => {
    spinnerSound.play();
    // spinner(Math.floor(Math.random() * 10) + 1); // Spin and land on "1"
    spinner(1); // Spin and land on "1"
  };

  const betFunc = function () {
    // const totalTokens = betNumList.reduce((sum, item) => {
    //   const tokenValue = parseInt(item.token, 10) || 0; // Convert to integer, fallback to 0 if blank
    //   return sum + tokenValue;
    // }, 0);
    // console.log(totalTokens);
    betFunction("clear");
    setPlay(0);
    const payload = {
      ticket_id: "TICKET12345",
      game_id: "GAME9876",
      date: moment().format("YYYY-MM-DD"),
      draw_time: "14:30:00",
      ticket_time: moment().format("HH:mm:ss"),
      data: [
        {
          bet: 8,
          played: 120,
        },
        {
          bet: 5,
          played: 10,
        },
      ],
    };
  };

  const betButtonClick = function (index) {
    let newList = betNumList.map((e, i) => {
      if (index == i) {
        return {
          ...e,
          token: chipNum,
        };
      }
      return e;
    });
    const totalTokens = newList.reduce((sum, item) => {
      const tokenValue = parseInt(item.token, 10) || 0; // Convert to integer, fallback to 0 if blank
      return sum + tokenValue;
    }, 0);
    console.log(totalTokens);
    setPlay(totalTokens);
    setBetNumList(newList);
  };

  const betFunction = function (betCase) {
    let newList;
    switch (betCase) {
      case "upperLine":
        newList = betNumList.map((e, i) => {
          if (i < 5) {
            return {
              ...e,
              token: chipNum,
            };
          }
          return e;
        });
        break;
      case "lowerLine":
        newList = betNumList.map((e, i) => {
          if (i > 4) {
            return {
              ...e,
              token: chipNum,
            };
          }
          return e;
        });
        break;
      case "odd":
        newList = betNumList.map((e, i) => {
          if (i % 2 === 0) {
            return {
              ...e,
              token: chipNum,
            };
          }
          return e;
        });
        break;
      case "even":
        newList = betNumList.map((e, i) => {
          if (i % 2 === 1) {
            return {
              ...e,
              token: chipNum,
            };
          }
          return e;
        });
        break;
      case "clear":
        newList = betNumList.map((e) => ({
          ...e,
          token: "",
        }));
        break;
      default:
        break;
    }
    const totalTokens = newList.reduce((sum, item) => {
      const tokenValue = parseInt(item.token, 10) || 0; // Convert to integer, fallback to 0 if blank
      return sum + tokenValue;
    }, 0);
    setPlay(totalTokens);
    setBetNumList(newList);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    // console.log("clikd");
    console.log(boxRef);

    setAnchorEl(boxRef.current);
    // setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [remainingTime, setRemainingTime] = useState(
    moment.duration(0, "seconds")
  );
  const [isCounting, setIsCounting] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const time = 3;
  const intervalMs = time * 60 * 1000;

  const fetchBalance = async function () {
    await get_balance().then((e) => {
      if (e.statusCode === 200) {
        setBalance(e.response.balance);
      }
      // console.log(e.response.balance);
    });
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    const startTask = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0); // Set to 12:00 AM

      const elapsedTime = now.getTime() - midnight.getTime();
      const timeUntilNextInterval = intervalMs - (elapsedTime % intervalMs); // Time until next interval

      // Initialize remainingTime
      setRemainingTime(moment.duration(timeUntilNextInterval, "milliseconds"));

      const disableTimer = () => {
        setIsDisabled(true); // Disable buttons
        console.log("Buttons disabled.");
      };

      const enableTimer = () => {
        setIsDisabled(false); // Enable buttons
        console.log("Buttons enabled.");
      };

      // Disable buttons 15 seconds before the interval ends
      const disableTimeout = setTimeout(
        disableTimer,
        timeUntilNextInterval - 15000
      );

      // Run the task on the next interval
      const timeout = setTimeout(() => {
        handlePlay(); // Execute the task
        enableTimer(); // Enable buttons
        setRemainingTime(moment.duration(intervalMs, "milliseconds")); // Reset remaining time

        // Schedule recurring intervals for handlePlay and disableTimer
        const interval = setInterval(() => {
          handlePlay();
          enableTimer();
          setRemainingTime(moment.duration(intervalMs, "milliseconds")); // Reset remaining time
        }, intervalMs);

        const disableInterval = setInterval(disableTimer, intervalMs - 15000);

        // Cleanup intervals on unmount
        return () => {
          clearInterval(interval);
          clearInterval(disableInterval);
        };
      }, timeUntilNextInterval);

      return () => {
        clearTimeout(timeout);
        clearTimeout(disableTimeout);
      };
    };

    startTask();
  }, []);

  useEffect(() => {
    // Countdown timer for `remainingTime`
    const countdown = setInterval(() => {
      setRemainingTime((prevTime) => {
        const updatedTime = moment.duration(
          prevTime.asSeconds() - 1,
          "seconds"
        );
        return updatedTime.asSeconds() <= 0
          ? moment.duration(0, "seconds")
          : updatedTime;
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup countdown on unmount
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(180deg, rgba(163,91,41,1) 0%, rgba(123,32,27,1) 100%)",
        }}
      >
        {/* <Button onClick={handlePlay}>Play is here</Button> */}
        <Header balance={balance} />
        <Historyinfo setinfoModal={setinfoModal} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // pl: 2,
            pt: 9,
            position: "relative",
            height: "729px",
            zIndex: 0,
          }}
        >
          {/* <Spinner wheelRef={wheelRef} currentRef={currentRef} /> */}
          <Box
            aria-describedby={id}
            sx={{
              position: "absolute",
              left: "-20px",
              top: 63,
              width: "729px",
            }}
            ref={boxRef}
          >
            <Spinner2
              wheelRef1={wheelRef1}
              wheelRef2={wheelRef2}
              currentRef={currentRef}
            />
          </Box>
          <Box sx={{ position: "absolute", right: "1.5rem" }}>
            <BetNumbers
              betNumList={betNumList}
              betButtonClick={betButtonClick}
              chipSound={chipSound}
            />
          </Box>
        </Box>
        <BottomPortion
          chipNum={chipNum}
          handlePlay={handlePlay}
          setChipNum={setChipNum}
          betFunction={betFunction}
          chipSound={chipSound}
          setIsmessageModal={handleClick}
          remainingTime={remainingTime}
          isDisabled={isDisabled}
          betFunc={betFunc}
          play={play}
        />
      </Box>
      <MessageModal
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={() => handleClose()}
      />
      <InfoModal open={infoModal} handleClose={() => setinfoModal(false)} />
    </>
  );
}

export default Home;
