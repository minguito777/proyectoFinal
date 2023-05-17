import React, { useContext, useState } from "react";
import { cartContext } from "../../storage/cartContext";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "./stylesCart.css";
import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import { IoTrash } from "react-icons/io5";
import { Link } from "react-router-dom";
import { createOrder } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Swal from 'sweetalert2'

function Cart() {
  const context = useContext(cartContext);
  const Navigate = useNavigate();

  const handleClearCart = () => {
    context.Clear();
  };
  const handleSubstractProduct = (item) => {
    context.RemoveToCart(item);
  };

  const [stock, setStock] = useState(context.cart.length);
  const handleAddOne = (item) => {
    setStock(stock + 1);
    context.AddToCart({ ...item, quantity: 1 });
  };
  const handleRestOne = (item) => {
    item.quantity === 1 && context.RemoveToCart(item);
    setStock(stock - 1);
    context.AddToCart({ ...item, quantity: -1 });
  };

  const handleCheckOut = ({ name, phone, email, address, city }) => {
    const order = {
      buyer: {
        name: name,
        phone: phone,
        email: email,
        address: address,
        city: city,
      },
      items: context.cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })), // guardar id , titulo , precio , cantidad
      total: context.getTotalPrice(),
      date: new Date(),
    };

    // se pasa el obj order a la funcion para crear la orden en firebase
    createOrder(order).then((id) => {
      // aca va el sweet alert
      Swal.fire({
        title: `GRACIAS ${order.buyer.name} `,
        text:  `su codigo de seguimiento es: ${id} `,
        icon: 'exito',
        confirmButtonText: 'Adios',
        timer: 5000 ,
        timerProgressBar: true
      })


      // una vez generada la orden de compra se borra el carrito
      context.Clear();
      // despues de borrar el carrito redirigimos al home
      setTimeout(() => {
        Navigate("/");
      }, 5000);
    });
  };

  return (
    <div className="container cart-page-container col-12 justify-content-center p-3">
      <div className="cart-page-header "> Mi carrito </div>
      <div className="cart-page-body">
        {context.cart.length === 0 ? (
          <div className="col ">
            <div className=" d-flex p-3 justify-content-center">
              <h3>Productos no añadidos</h3>
            </div>

            <div className="d-flex justify-content-center">
              <Link to="/">
                <ButtonComponent text="Back to Home" />
              </Link>
            </div>
          </div>
        ) : (
          context.cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="box-item">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="cart-items-img"
                />
              </div>
              <div className="box-item">
                {" "}
                <h5>{item.title}</h5>{" "}
              </div>
              <div className="box-item ">
                <ButtonComponent
                  handlerOnclick={() => handleAddOne(item)}
                  text={<GrFormAdd size={20} />}
                  onDisabler={ item.quantity >= item.stock  }
                />

                <ButtonComponent
                  handlerOnclick={() => handleRestOne(item)}
                  text={<GrFormSubtract size={20} />}
                />
              </div>
              <div className="box-item">
                <p> {`${item.quantity} x $ ${item.price}`}</p>
              </div>
              <div
                className="box-item"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <ButtonComponent
                  handlerOnclick={() => handleSubstractProduct(item)}
                  text={<IoTrash size={20} />}
                />
              </div>
            </div>
          ))
        )}
      </div>
      {context.cart.length !== 0 && (
        <div
          className="container text-center mt-3 p-3"
          style={{ color: "white" }}
        >
          <h5>Total: $ {context.getTotalPrice()}</h5>

          <div>
            <ButtonComponent
              text="Remove all"
              handlerOnclick={handleClearCart}
              className="btn-clear"
            />
            {/* modal data */}
            <Modal onCheckout={handleCheckOut} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
