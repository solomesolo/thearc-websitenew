"use client";

import React from "react";
import Image from "next/image";

export const Core: React.FC = () => {
  return (
    <div className="silhouette-wrapper">
      <div className="silhouette-glow" />
      <div className="silhouette-container">
        <Image
          src="/human-body.png"
          alt="Human silhouette"
          width={550}
          height={550}
          className="silhouette-image"
          priority
        />
      </div>
    </div>
  );
};

export default Core;
