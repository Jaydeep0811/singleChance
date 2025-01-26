// import React from 'react'

import Spinner3 from "../../components/Spinner/Spinner3";

// import { useState } from "react";
// import useSpinningGame from "../../hooks/useSpinningGame";

function Lobby() {
  // const { countdown, nextIntervalTime } = useSpinningGame(
  //   () => console.log("Triggered at 1 minute 45 seconds!"),
  //   () => console.log("Triggered every 2 minutes!")
  // );

  // const formatCountdown = (ms) => {
  //   const seconds = Math.floor((ms / 1000) % 60);
  //   const minutes = Math.floor((ms / (1000 * 60)) % 60);
  //   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  // };

  return (
    <div>
      {/* <h1>Function</h1>
      <p>Next spin in: {formatCountdown(countdown)}</p> */}
      {/* <p>Next interval time: {nextIntervalTime}</p> */}
      {/* <p>Next interval time: {nextIntervalTime}</p> */}
      <Spinner3 />
    </div>
  );
}

export default Lobby;
