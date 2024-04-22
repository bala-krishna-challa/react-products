import React from "react";

export default function Clock({ color, children }) {
    return (
      <h1 style={{ color: color }}>
        {children}
      </h1>
    );
  }
  