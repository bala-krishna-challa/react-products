import React, { useEffect, useState } from "react";
import { Products } from "./products/Products";
import Clock from "./clock/Clock";
import Numbers from "./Lists/Numbers";
import UserInputs from "./Lists/UserInputs";
import Parent from "./Events/Parent";
import Count from "./Count/Count";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { TOKEN } from "./constants";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Users from "./Users/Users";
import { UserProvider } from "./contexts/UserProvider";
import StopWatch from "./StopWatch/StopWatch";
import Input from "./StopWatch/Input";
import UsingMemo from "./hooks/UsingMemo";
import UsingLayoutEffect from "./hooks/UsingLayoutEffect";
import UsingImperativeHandle from "./hooks/UsingImerativeHandle";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const token = sessionStorage.getItem(TOKEN);
  // const [time, setTime] = useState(() => new Date());
  // const [color, setColor] = useState("lightcoral");

  // useEffect(() => {
  //   console.log("setting work...");
  //   const id = setInterval(() => {
  //     setTime(new Date());
  //   }, 1000);
  //   return () => {
  //     console.log("clearing work...");
  //     clearInterval(id);
  //   };
  // }, [color]);

  // Component Mount / initial rendering
  // The time dependencies change /  the callback function would execute to clear any memory or subscriptions. and then execute setting work
  // The callback function would be executed the time component gets destroyed / unmounted

  // if (!token) {
  //   return <Login onUserLogin={setUserLoggedIn} />;
  // }

  return <UsingImperativeHandle />;
}

export default App;
