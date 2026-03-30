"use client";

import React from "react";
import styles from "./OutlineButton.module.css";

interface OutlineButtonProps {
  name: string;
  onClick?: () => void
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
  name,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={styles["outline-btn"]}
    >
      {name}
    </button>
  );
};

export default OutlineButton;
