import React from "react";
import { useState } from "react";

const NAMES = ["ONE", "TWO", "THREE", "FOUR", "FIVE"];

export default function Numbers() {
  const [names, setNames] = useState([]);

  const addNameHandler = () => {
    if (names.length < NAMES.length) {
      setNames([NAMES[names.length], ...names]);
    }
  };
   
  return (
    <div>
      <ul>
        {names.map((name, index) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <button onClick={addNameHandler}>Add One More</button>
    </div>
  );
}
