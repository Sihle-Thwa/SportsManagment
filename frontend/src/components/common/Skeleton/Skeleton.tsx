"use client";
import React from "react";
import "./skeleton.css";

export const Skeleton: React.FC<{
	className?: string;
	style?: React.CSSProperties;
}> = ({ className = "", style }) => {
	return <div className={`skeleton ${className}`} style={style} aria-hidden />;
};
