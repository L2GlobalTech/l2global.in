"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface GradientButtonProps {
    label?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    href?: string;
    target?: string;
    type?: "button" | "submit" | "reset";
}

const GradientButton = ({
  label,
  icon,
  onClick,
  className = "",
  href,
  target,
  type = "button",
}: GradientButtonProps) => {

  // 👉 If href exists → navigation
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={`
          group inline-flex items-center gap-3
          py-3 px-4 md:px-6 md:py-3
          text-white font-semibold text-sm md:text-lg
          rounded-full
          bg-linear-to-b from-blue-500 to-blue-600
          transition-all duration-700
          ${className}
        `}
      >
        {label}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </Link>
    );
  }

  // 👉 No href → button (modal / action)
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        group inline-flex items-center gap-3
        py-3 px-4 md:px-6 md:py-3
        text-white font-semibold text-sm md:text-lg
        rounded-full
        bg-linear-to-b from-blue-500 to-blue-600
        transition-all duration-700
        cursor-pointer
        ${className}
      `}
    >
      {label}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </button>
  );
};


export default GradientButton;
