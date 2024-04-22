import React from "react";
import { useState } from "react"

interface Input {
    name: string;
    position: number
}

// const UserInput = () => {
//     return <tr>
//         <td></td>
//     </tr>
// }

const UserInputs = () => {
    const [list, setList] = useState<Input[]>([]);
    const [count, setCount] = useState(0);


    
const addInputFromStartHandler = () => {
    const newCount = count + 1;
    setCount(newCount);

    setList([{name: '', position: newCount}, ...list]);
}

const addInputFromEndHandler = () => {
    const newCount = count + 1;
    setCount(newCount);

    setList([...list, {name: '', position: newCount}]);
}

const sortByAsc = () => {
    const newList = [...list];
    newList.sort((a,b) => {
        return a.position - b.position;
    });

    setList(newList);
}

const sortByDesc = () => {
    const newList = [...list];
    newList.sort((a,b) => {
        return b.position - a.position;
    });

    setList(newList);
}
    return <>
    <div>
        <button onClick={addInputFromStartHandler}>Add Input from Start</button>
        <button onClick={addInputFromEndHandler}>Add Input from End</button>
        <button onClick={sortByAsc}>Sort by Asc</button>
        <button onClick={sortByDesc}>Sort by Desc</button>
    </div>
    <table>
        <thead>
            <th>Position</th>
            <th>User Input</th>
        </thead>
        <tbody>
            {list.map((item, index) => {
                return <tr key={item.position}>
                <td>{item.position}</td>
                <input />
            </tr>
            })}
        </tbody>
    </table>
    </>
}

export default UserInputs;