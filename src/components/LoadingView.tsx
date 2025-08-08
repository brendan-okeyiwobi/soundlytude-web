// components/LoadingView.tsx

"use client";

import React, {CSSProperties } from "react";
import { VStack } from "@/components/stack-layout";

interface LoadingViewiewProps {
  title?: string;
  message?: string;
  style?: CSSProperties;
}
const LoadingView: React.FC<LoadingViewiewProps> = ({ title = "", message = "", style}) => {
    return (
        <VStack style={{padding:"20px", ...style}}>
            <div className="loader" />
            <h3>{title}</h3>
            <p style={{ opacity: "0.75" }}>{message}</p>
        </VStack>
    );
}

export default LoadingView;
