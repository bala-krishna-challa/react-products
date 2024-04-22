import React from "react";
import { useState } from "react";

const SearchInput = ({onSearchTextChange, searchText}) => {
    const handleInputChange = (event) => {
        onSearchTextChange(event.target.value);
    }

    const handleKeyDown = (event) => {
        if([1,2,3].includes(event.keyCode)) {
            event.preventDefault();
        }
    }
    
    return <input type="text" placeholder="Search..." value={searchText} onChange={handleInputChange} onKeyDown={handleKeyDown}/>;
}


export default SearchInput;

