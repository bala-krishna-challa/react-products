import React, { useEffect, useState } from "react";
import { Products } from "./products/Products";
import Clock from "./clock/Clock";
import Numbers from "./Lists/Numbers";
import UserInputs from "./Lists/UserInputs";
import Parent from "./Events/Parent";
import Count from "./Count/Count";
import Login from "./Login/Login";
import Register from "./Register/Register";



function App() {

  // const [time, setTime] = useState(() => new Date());
  // const [color, setColor] = useState('lightcoral');
  
  
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, []);

  console.log('App rendering...');
  return <Login />;
}

export default App;
