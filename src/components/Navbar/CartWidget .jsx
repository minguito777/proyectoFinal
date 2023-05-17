import React , {   useContext  } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { MDBBadge } from "mdb-react-ui-kit";
import { cartContext } from "../../storage/cartContext";

const CartWidget = (props) => {
  const context = useContext(cartContext)

  return (
    <div className="justify-content-center">
      <FiShoppingCart className="" size={18}></FiShoppingCart>
      <MDBBadge
        pill
        color="danger"
        className="badge rounded-pill badge-notification bg-danger flex-end "
      >{ context.cart.length !== 0 && (  context.cart.length  ) }</MDBBadge>
    </div>
  );
};

export default CartWidget;
