// import React from 'react'

import gsap from "gsap";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useRef, useState, useCallback } from "react";
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
import { create_game, get_balance, predict_winner } from "../../api/gameData";
import moment from "moment";
import useLocalStorage from "../../utils/useLocalStorage";
import Stars from "../../public/backgrounds/stars.png";
import CryptoJS from "crypto-js";
import useSpinningGame from "../../hooks/useSpinningGame";
// const crypto = window.crypto || window.msCrypto;

// Setup the new Howl.
const chipSound = new Howl({
  src: [ChipSound],
});

const spinnerSound = new Howl({
  src: [SpinnerSound],
});

//Mute the voice
// Howler.mute(true);

function Home() {



  
  const [betNumList, setBetNumList] = useState([
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
  ]);

  const [duration, setDuration] = useState(moment());
  const [chipNum, setChipNum] = useState(null);
  const [ismessModal, setIsmessageModal] = useState(false);
  const [play, setPlay] = useState(0);
  const [win, setWin] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [infoModal, setinfoModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [ticketID, setTicketID] = useState("");
  const [local, setLocal] = useLocalStorage("name", {});
  const wheelRef1 = useRef(null);
  const wheelRef2 = useRef(null);
  const currentRef = useRef(null);
  const boxRef = useRef(null);
  const progressRef = useRef(null);
  const hasCountdownStarted = useRef(false); // Tracks if onCountdownStart has been called
  const hasCountdownEnded = useRef(false); // Tracks if onCountdownEnd has been called

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

  function generateGameID() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }

  function generateUniqueCode() {
    // Generate 4 random digits
    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();

    // Generate 3 random uppercase letters
    const randomLetters = "SCP";

    // Generate 4 random digits
    const randomDigits2 = Math.floor(1000 + Math.random() * 9000).toString();

    // Combine into the desired format
    return `${randomDigits}-${randomLetters}${randomDigits2}`;
  }

  // Handle Spin Button
  const handlePlay = () => {
    // spinner(8); // Spin and land on "1"
    setTicketID(generateUniqueCode().toString());
    fetchPredictWinner(); // Predict the winner
    spinnerSound.play();
    spinner(Math.floor(Math.random() * 10) + 1); // Spin and land on "1"
    // setTimeout(() => {
    //   // location.reload();
    // }, 150);
  };


  const betFunc = function () {
    betFunction("clear");
    setPlay(0);
    let betData = betNumList
      .filter((e) => e.token !== "")
      .map((e) => ({ bet: e.num, played: e.token }));
    const chunkArray = (array, size) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
      }
      return chunks;
    };


    const pairedItems = chunkArray(
      betNumList.filter((e) => e.token !== "" && e.token !== null),
      2 // Pair items into chunks of 2
    );

    let ticketIDLet;
    if (ticketID === "") {
      ticketIDLet = generateUniqueCode().toString();
      setTicketID(ticketIDLet);
    } else {
      ticketIDLet = ticketID;
    }

    const payload = {
      ticket_id: ticketIDLet,
      game_id: generateGameID().toString(),
      date: moment().format("YYYY-MM-DD"),
      draw_time: duration.format("HH:mm:ss"),
      ticket_time: moment().format("HH:mm:ss"),
      data: betData,
    };

    const billHTML = `
        <div class="bill">
        <p style="margin-bottom: 4px;">***Super Chance***</p>
        <p style="margin-bottom: 4px;">From Amusement Only</p>
        <p style="margin-bottom: 4px;">Agent: 634</p>
        <p style="margin-bottom: 4px;">Game ID: ${payload.ticket_id}</p>
        <p style="margin-bottom: 4px;">Game Name: Single Chance</p>
        <p style="margin-bottom: 4px;">Draw Time: ${duration?.format(
          "h:mm A"
        )}</p>
        <p style="margin-bottom: 4px;">Ticket Time: ${moment().format(
          "DD-MM-YYYY h:mm A"
        )}</p>
        <p style="margin-bottom: 4px;">Total Point: ${play}</p>
        <div style="display: flex; align-items: flex-start; gap: 14px;">
            <table>
              <tr>
                <th style="padding-right: 14px;">Item</th>
                <th style="padding-right: 14px;">Point</th>
                <th style="padding-right: 14px;">Item</th>
                <th>Point</th>
              </tr>
              ${pairedItems
                .map(
                  (pair) => `
                  <tr>
                    <td>${pair[0]?.num || ""}</td>
                    <td>${pair[0]?.token || ""}</td>
                    <td>${pair[1]?.num ?? ""}</td>
                    <td>${pair[1]?.token || ""}</td>
                  </tr>
                `
                )
                .join("")}
            </table>
          </div>
        </div>
        `;
    // window.electronAPI.printBill(billHTML);
    console.log(payload);

    openAlertBox(`YOUR BET HAS BEEN ACCEPTED WITH ID: ${payload.ticket_id}`);
    setLocal([...betNumList]);
    create_game(payload).then((e) => {
      if (e.statusCode === 200) {
        fetchBalance();
      }
    });
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
    setBalance(balance - chipNum);
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
      case "double":
        newList = betNumList.map((e, i) => ({
          ...e,
          token: e.token ? e.token * 2 : "",
        }));

        break;
      case "repeat":
        console.log(newList, local);
        newList = local;
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
    // console.log(newList);
    const totalTokens = newList.reduce((sum, item) => {
      const tokenValue = parseInt(item.token, 10) || 0; // Convert to integer, fallback to 0 if blank
      return sum + tokenValue;
    }, 0);
    betCase === "clear"
      ? setBalance(play + balance)
      : setBalance(balance - totalTokens);
    setPlay(totalTokens);
    setBetNumList(newList);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const openAlertBox = (message) => {
    setAnchorEl(boxRef.current);
    setAlertMessage(message);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAlertMessage("");
  };

  const [remainingTime, setRemainingTime] = useState(
    moment.duration(0, "seconds")
  );
  const [isCounting, setIsCounting] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const time = 2;
  const intervalMs = time * 60 * 1000;

  const fetchBalance = async function () {
    await get_balance().then((e) => {
      if (e.statusCode === 200) {
        setBalance(e.response.balance);
      }
      // console.log(e.response.balance);
    });
  };

  const fetchPredictWinner = async function () {
    await predict_winner(gameID).then((e) => {
      console.log(e);
    });
  };

  const formatCountdown = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    return `${"0" + minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Move these callback definitions before any other state or refs
  const onEvery1m45s = useCallback(() => {
      setIsDisabled(true);
      console.log("Triggered at 1 minute 45 seconds!");
    }, []);  // Empty dependency array since it only uses setIsDisabled
  
    const onEvery2min = useCallback(() => {
      setIsDisabled(false);
      console.log("Triggered every 2 minutes!");
      handlePlay();
    }, []); // Empty dependency array since it only uses setIsDisabled

    const { countdown, nextIntervalTime } = useSpinningGame(onEvery1m45s, onEvery2min);

  useEffect(() => {
    if (anchorEl) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [anchorEl]);

  useEffect(() => {
    fetchBalance();
    // setGameID(generateRandomInt(100000, 999999).toString());
  }, []);


  return (
    <>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(180deg, rgba(229,89,6,1) 50%, rgba(171,44,4,1) 84%, rgba(134,15,2,1) 100%)",
        }}
      >
        <Header balance={balance} />
        <Historyinfo setinfoModal={setinfoModal} />
        <img
          src={Stars}
          alt="star"
          style={{ position: "absolute", "mix-blend-mode": "screen" }}
        />
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
          <Box
            aria-describedby={id}
            sx={{
              position: "absolute",
              left: "25px",
              top: 50,
              width: "680px",
            }}
            ref={boxRef}
          >
            <Spinner2
              wheelRef1={wheelRef1}
              wheelRef2={wheelRef2}
              currentRef={currentRef}
            />
          </Box>
          <Box sx={{ position: "absolute", right: "1.5rem", top: "6.5rem" }}>
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
          openAlertBox={openAlertBox}
          remainingTime={formatCountdown(countdown)}
          isDisabled={isDisabled}
          betFunc={betFunc}
          play={play}
          betNumList={betNumList}
          duration={nextIntervalTime}
          progressRef={progressRef}
        />
      </Box>
      <MessageModal
        id={id}
        open={open}
        anchorEl={anchorEl}
        alertMessage={alertMessage}
        handleClose={() => handleClose()}
      />
      <InfoModal open={infoModal} handleClose={() => setinfoModal(false)} />
    </>
  );
}

export default Home;

// Issues
// Double and Repete
// Print is not working
// History issue API not working properly
