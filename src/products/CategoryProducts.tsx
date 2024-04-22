import React, { useContext } from "react";
import { Fragment } from "react";
import Product, { myNumber } from "./Product";
import Category from "./Category";
import { ProductItem } from "./types";

interface Props {
    products: ProductItem[],
    //onStockToggle: (name: string) => void;
}

export const CategoryProducts = ({products} : Props) => {

    const categoryProducts = products.reduce((acc, product) => {
      if(!acc[product.category]) {
        acc[product.category] = [];
      }
    
      acc[product.category].push(product)
      return acc;
    }, {});
    console.log('CategoryProducts rendering...');
    return <table style={{    width: '25%', margin: 'auto'}}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price - {myNumber()}</th>
        </tr>
      </thead>
      <tbody> 
        {Object.keys(categoryProducts).map((category, inx) => {
          return <Fragment key={inx}>
            <Category category={category} />
            {categoryProducts[category].map((product) => {
              return <Product key={product.name} product={product} />
            })}
          </Fragment>
        })}
      </tbody>
    </table>
  }