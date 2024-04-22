import React, {  memo, useEffect } from "react";
import { useState } from "react";
import { ProductItem } from "./types";

interface Props {
    product: ProductItem
}

const AnotherChild = ({product}) => {
    const [time, setTime] = useState(() => new Date());
  const [color, setColor] = useState('lightcoral');
  
  
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{product.stocked ? 'stocked' : 'Not in stock'}</div>;
}

const ProductDetails = ({product}) => {
  const [count, setCount] = useState(0);
    const {name, price, stocked} = product;
    console.log('ProductDetails rendering...');
  return <>
  <td style={{color: stocked ? '' : 'red'}}>{stocked ? `${name} - ${count}` : name}</td>
        <td>{price}</td>
        </>
}

const MemorizedProductDetails = memo(ProductDetails);

const Product = ({product}: Props) => {
  const {name} = product;
  
    console.log('Product rendering...');
    return <><tr>
        <MemorizedProductDetails product={product} />
    </tr>
    </>
  }

export const myNumber = () => 2;

export default Product;
