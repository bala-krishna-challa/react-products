import React from "react";
import { useMemo, useState } from "react";

const p = () => 2;

const UsingMemo = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");

  //   const filteredItems = useMemo(() => {
  //     console.log("Filtering items...");
  //     return items.filter((item) => item.includes(filter));
  //   }, [items, filter]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.includes(filter)).slice(0, p());
  }, [items, filter]);

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
      />
      <button onClick={() => setItems([...items, `Item ${items.length + 1}`])}>
        Add Item
      </button>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsingMemo;
