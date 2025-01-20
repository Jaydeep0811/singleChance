import { useEffect, useRef, useState, useCallback } from "react";
import moment from "moment";

const useSpinningGame = (onEvery1m45s, onEvery2m) => {
  const interval1Ref = useRef();
  const interval2Ref = useRef();
  const countdownIntervalRef = useRef();
  const hasCalledRef = useRef(false); // Add a ref to track if callback has been called
  const [countdown, setCountdown] = useState(0);
  const [nextIntervalTime, setNextIntervalTime] = useState(null);

  const calculateNextInterval = useCallback(() => {
    const time = 2; // Interval time in minutes
    const intervalMs = time * 60 * 1000;

    const now = moment();
    const midnight = moment().startOf("day");
    const elapsedTime = now.diff(midnight);
    const timeUntilNextInterval = intervalMs - (elapsedTime % intervalMs);
    const nextInterval = now.clone().add(timeUntilNextInterval, "milliseconds");

    return {
      timeUntilNextInterval,
      nextInterval: nextInterval.format("h:mm A"),
    };
  }, []);

  useEffect(() => {
    // Ensure both callbacks are functions
    if (typeof onEvery1m45s !== "function" || typeof onEvery2m !== "function") {
      console.error("Both callbacks must be functions.");
      return;
    }

    const startIntervals = () => {
      // Reset the call tracker at the start of each interval

      const { timeUntilNextInterval, nextInterval } = calculateNextInterval();

      // Set initial state
      setCountdown(timeUntilNextInterval);
      setNextIntervalTime(nextInterval);

      // Schedule the 1m45s callback
      if (interval1Ref.current) clearTimeout(interval1Ref.current);
      interval1Ref.current = setTimeout(() => {
        if (!hasCalledRef.current) {
          onEvery1m45s();
          hasCalledRef.current = true;
        }
        interval1Ref.current = null;
      }, timeUntilNextInterval - 15000); // 1 minute 45 seconds before the 2-minute mark

      // Schedule the 2m callback
      if (interval2Ref.current) clearTimeout(interval2Ref.current);
      interval2Ref.current = setTimeout(() => {
        onEvery2m();
        hasCalledRef.current = false;
        // Start the next interval slightly before the actual interval
        // to ensure we don't miss the next cycle
        setTimeout(startIntervals, 0);
      }, timeUntilNextInterval);

      // Update countdown every second
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1000) {
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    };

    startIntervals();

    // Cleanup intervals when component unmounts
    return () => {
      clearTimeout(interval1Ref.current);
      clearTimeout(interval2Ref.current);
      clearInterval(countdownIntervalRef.current);
    };
  }, [onEvery1m45s, onEvery2m, calculateNextInterval]);

  return { countdown, nextIntervalTime };
};

export default useSpinningGame;
