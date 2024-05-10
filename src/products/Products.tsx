import React, { useCallback, useMemo } from "react";
import { useState } from "react";
import { CategoryProducts } from "./CategoryProducts";
import { ProductsFilter } from "./ProductsFilter";
import { ProductItem } from "./types";
import SearchInput from "./SearchInput";

let PRODUCTS: ProductItem[] = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export const Products = () => {
  const [selected, setSelected] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState(PRODUCTS);

  let filteredProducts = selected
    ? PRODUCTS.filter((product) => product.stocked)
    : PRODUCTS;

  filteredProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handler = (value: boolean) => {
    setSelected(value);
  };

  //     const stockToggleHandler = useCallback((name: string) => {
  //       // it has to update state so that...
  // console.log('Old Products...', products);
  //       const updatedProducts = products.map(product => {
  //         if(product.name === name) {
  //           return {...product, stocked: !product.stocked}
  //         }

  //         return product;
  //       });
  //       console.log('New Products...', updatedProducts);
  //       setProducts(updatedProducts);

  //     }, [products]);

  // const stockToggleHandler = (name: string) => {
  //   const updatedProducts = products.map(product => {
  //     if(product.name === name) {
  //       return {...product, stocked: !product.stocked}
  //     }

  //     return product;
  //   });

  //   setProducts(updatedProducts);

  // };

  console.log("Products rendering...");

  const searchInput = (
    <SearchInput searchText={searchText} onSearchTextChange={setSearchText} />
  );

  return (
    <>
      <ProductsFilter
        selected={selected}
        onSelection={handler}
        searchInput={searchInput}
      />{" "}
      <CategoryProducts products={filteredProducts} />
    </>
  );
};

// Component => ChildComponent and ChildComponent Props
