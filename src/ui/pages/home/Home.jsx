// import React from 'react'

import gsap from "gsap";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner/Spinner";
import { useRef, useState } from "react";
import { Box } from "@mui/material";
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

// Setup the new Howl.
const chipSound = new Howl({
  src: [ChipSound],
});

const spinnerSound = new Howl({
  src: [SpinnerSound],
});

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
  const [infoModal, setinfoModal] = useState(false);
  const wheelRef1 = useRef(null);
  const wheelRef2 = useRef(null);
  const currentRef = useRef(null);

  // const spinner1 = (i) => {
  //   const rotationCurrent = gsap.getProperty(wheelRef.current, "rotation") || 0;
  //   const rotationNext = rotationCurrent + gsap.utils.random(1800, 3600);
  //   let rotationLast = rotationCurrent;
  //   let tolerance = 0;
  //   const selectedIndex =
  //     pieces.length -
  //     1 -
  //     Math.floor(((rotationNext + angleOffset) % 360) / (360 / pieces.length));

  //   const indicatorTimeline = gsap.timeline();
  //   indicatorTimeline
  //     .to(currentRef.current, {
  //       duration: 0.13,
  //       rotation: -10,
  //       transformOrigin: "65% 36%",
  //     })
  //     .to(currentRef.current, {
  //       duration: 0.13,
  //       rotation: 3,
  //       ease: "power4",
  //     });

  //   const luckywheelTimeline = gsap.timeline({
  //     onComplete: () => {
  //       console.log("selected", pieces[selectedIndex]);
  //       setIteration((prev) => prev + 1);
  //     },
  //     onUpdate: () => {
  //       const rotationCurrentUpdated = Math.round(
  //         gsap.getProperty(wheelRef.current, "rotation")
  //       );
  //       tolerance = rotationCurrentUpdated - rotationLast;
  //       rotationLast = rotationCurrentUpdated;

  //       if (
  //         Math.round(rotationCurrentUpdated) % (360 / pieces.length) <=
  //         tolerance
  //       ) {
  //         if (
  //           indicatorTimeline.progress() > 0.2 ||
  //           indicatorTimeline.progress() === 0
  //         ) {
  //           indicatorTimeline.play(0);
  //         }
  //       }
  //     },
  //   });

  //   luckywheelTimeline.to(wheelRef.current, {
  //     duration: 5,
  //     rotation: rotationNext,
  //     transformOrigin: "50% 50%",
  //     ease: "power4",
  //   });
  // };

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
    spinner(1); // Spin and land on "1"
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
    setBetNumList(newList);
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(180deg, rgba(163,91,41,1) 0%, rgba(123,32,27,1) 100%)",
        }}
      >
        {/* <Button onClick={handlePlay}>Play is here</Button> */}
        <Header />
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
          <Box sx={{ position: "absolute", left: "-20px", top: 63, width: "729px" }}>
            <Spinner2
              wheelRef1={wheelRef1}
              wheelRef2={wheelRef2}
              currentRef={currentRef}
            />
          </Box>
          <Box sx={{ position: "absolute", right: "1.5rem", }}>
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
        />
      </Box>
      <InfoModal open={infoModal} handleClose={() => setinfoModal(false)} />
    </>
  );
}

export default Home;
