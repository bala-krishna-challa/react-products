import React from "react";
import { useState } from "react"

const Count = () => {
    const [count, setCount] = useState(0);
console.log(count);
    const handleCountIncrement = () => {
        // what is the value of count => 0
        setCount(count + 2);
        // setCount(state => state + 1); // 1 + 1
        // setCount(state => state + 1);
        // setCount(state => state + 2); // 4
    }

/*
Click => 
    1. the code inside handleCountIncrement gets executed except state update
    2. State update would happen in the form of batches after handleCountIncrement execution
    3. State update comples
    4. Component rerenders

    1. 
*/


    return <>
    <button onClick={handleCountIncrement}>Increase Count</button>
    {count}
    </>
}

export default Count;