import React, { useState } from "react";

export default function useVisualMode (initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  const transition = (newMode, replace) => {
    const updatedHistory = [...history];
    if (!replace) {
      updatedHistory.unshift(mode)
    }
    setHistory(updatedHistory);
    setMode(newMode);
  }
  const back = () => {
    const updateHistory = [...history];
    const newMode = updateHistory.length ? updateHistory.shift() : updateHistory;
    setHistory(updateHistory)
    setMode(newMode);
  }
  return { mode, transition, back }
}