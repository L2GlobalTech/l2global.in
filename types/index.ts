import React from "react";

export interface IIndustriesSection {
    id: number,
    title: string,
    desc: string,
    rightTitle?: string,
    rightDesc?: string,
    iconBg: string,
    icon: string,
    rightImage: string,
    rightBottomIcon?: React.ReactNode
}