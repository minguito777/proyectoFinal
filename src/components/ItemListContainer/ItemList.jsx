import React from "react";
import Item from "./Item";

function ItemList(props) {
  return (
    <>
      {props.products.map((element) => {
        //const stockVerifier =element.stock < 1 ? "not available" : element.stock;
        return (
          <Item
            key={element.id}
            Info_for_item={element}
          ></Item>
        );
      })}
    </>
  );
}

export default ItemList;
