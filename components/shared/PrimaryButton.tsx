"use client";

import React from "react";
import Link from "next/link";
import styles from './PrimaryButton.module.css';

interface PrimaryButtonProps {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    target?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    whiteBtn?: boolean
}

const PrimaryButton = ({
    label,
    icon,
    href = "#",
    target,
    onClick,
    whiteBtn
}: PrimaryButtonProps) => {
    return (
        <Link
            href={href}
            target={target}
            onClick={onClick}
            className={`${styles['gradient-button']} ${whiteBtn ? 'bg-white text-[#0B52DC]': "bg-[linear-gradient(to_bottom,#4684FF,#074FDA)] text-white"}`}
            style={{ lineHeight: "26px",  }}
        >
            {label}
            {icon && <span className="icon">{icon}</span>}
        </Link>
    );
};

export default PrimaryButton;
