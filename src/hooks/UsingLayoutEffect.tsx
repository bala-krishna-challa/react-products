import React from "react";
import { useLayoutEffect, useRef, useState } from "react";

const UsingLayoutEffect = () => {
  // const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const [userGivenWidth, setUserGivenWidth] = useState(0);

  useLayoutEffect(() => {
    const measureWidth = () => {
      const element = ref.current;
      if (element) {
        // const newWidth = element.getBoundingClientRect().width;
        // setWidth(newWidth);
        element.style.width = userGivenWidth;
      }
    };

    measureWidth();

    window.addEventListener("resize", measureWidth);

    // Clean up the resize event listener
    return () => {
      window.removeEventListener("resize", measureWidth);
    };
  }, [userGivenWidth]); // Dependency array is empty, so this effect runs only once after mount

  return (
    <div>
      <input
        value={userGivenWidth}
        onChange={(event) => setUserGivenWidth(parseInt(event.target.value))}
      />
      <div
        ref={ref}
        style={{
          width: `${userGivenWidth}px`,
          backgroundColor: "lightblue",
          padding: "10px",
        }}
      >
        This div's width is: {userGivenWidth}px
      </div>
    </div>
  );
};

export default UsingLayoutEffect;
