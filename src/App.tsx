import React, { useEffect, useState } from "react";
import { Products } from "./products/Products";
import Clock from "./clock/Clock";
import Numbers from "./Lists/Numbers";
import UserInputs from "./Lists/UserInputs";
import Parent from "./Events/Parent";
import Count from "./Count/Count";
import Login from "./Login/Login";
import Register from "./Register/Register";
import AddUser from "./AddUser/AddUser";
import { TOKEN } from "./constants";

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

  if (!token) {
    return <Login onUserLogin={setUserLoggedIn} />;
  }

  console.log("App rendering...");
  return <AddUser />;
}

export default App;
