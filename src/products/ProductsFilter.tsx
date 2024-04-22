import React from "react";

interface Props {
    selected: boolean;
    onSelection: (val: boolean) => void;
    // searchText: string;
    searchInput: React.JSX.Element;
}

export const ProductsFilter = ({selected, onSelection,  searchInput}: Props) => {
    const toggleStockProducts = (event) => {
      onSelection(event.target.checked);
    }
  
    console.log('ProductsFilter rendering...');
    return (<div style={{
      display: 'flex',
      flexDirection: 'column'
      }}>
    {searchInput}
    <label>
    <input type="checkbox" checked={selected} onChange={toggleStockProducts} /> Only show products in stock
    </label>
    </div>)
  }

  // filter input component
  // inputs/props => handlerToInformParent, label
  // scope => 