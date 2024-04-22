import React, { memo } from "react";

interface Props {
    category: string;
  }


const Category = ({category}: Props) => {
  console.log('Category rendering...');
    return <tr>
    <td colSpan={2} style={{textAlign: 'center', fontWeight: 'bold'}}>{category}</td>
  </tr>
  }

  export default memo(Category);