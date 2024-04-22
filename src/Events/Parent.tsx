import React from "react";
import Child from "./Child";

const Parent = () => {
const clickHandler = () => {
    console.log('From Parent...');
}
    return <div onClick={clickHandler}>
        I'm Parent
        <Child parentHandler={clickHandler} />
    </div>
}

export default Parent;