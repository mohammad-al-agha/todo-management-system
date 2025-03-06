"use client";

import { useState } from "react";

const usePasswordVisToggle = (): [string, boolean, () => void] => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible((prev) => !prev);
  };

  const inputType = isVisible ? "text" : "password";

  return [inputType, isVisible, toggle];
};

export default usePasswordVisToggle;
