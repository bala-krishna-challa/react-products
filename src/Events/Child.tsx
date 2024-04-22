import React, { useState } from "react";

const Child = ({parentHandler}) => {
    const clickHandler = (event) => {
        // event.stopPropagation();
        console.log('From Child Parent...');
    }

    const childClickHandler = (event) => {
        console.log('From Child...');
        parentHandler();
    }
        return <div onClick={clickHandler}>
            I'm Child
            <button onClick={childClickHandler}>Click me!</button>
        </div>
    }

    export default Child;
