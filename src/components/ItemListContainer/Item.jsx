import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getProduct } from "../../services/firebase";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
// import { FiHeart } from 'react-icons/fi'
import "./ItemlistStyles.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { cartContext } from "../../storage/cartContext";
import { toast } from "react-toastify";

const Item = ({ Info_for_item }) => {
  const [stock, setStock] = useState(Info_for_item.stock);
  const context = useContext(cartContext);
  const quantity = 1;

  //funcion para agregar al carrito
  const handlerAddToCart = () => {
    setStock((prevStock) => prevStock - 1);
    context.AddToCart({ ...Info_for_item, quantity: quantity });


    toast.success(` ${Info_for_item.title}`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <MDBCol md="12" lg="4" className="mb-4 item-card ">
      <MDBCard className="box-behind">
        <b></b>
        <div className="content">
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image  hover-zoom"
          >
            <div className="mask ">
              {Info_for_item.stock <= 2 && (
                <h4
                  style={{
                    color: "white",
                    fontWeight: "700",
                    paddingTop: "320px",
                  }}
                >
                  Ultimas unidades!
                </h4>
              )}
            </div>

            <MDBCardImage
              src={Info_for_item.imgUrl}
              fluid
              className="img-item "
            />
            <div
              className="mask"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div className="col ">
                <h4>
                  <span className="badge ms-1 mt-2 text-end d-flex">
                    {Info_for_item.console}
                  </span>
                </h4>
              </div>

              {Info_for_item.discount && (
                <div
                  className="bg-warning d-flex p-2 "
                  style={{
                    maxHeight: "50px",
                    borderRadius: "50%",
                    maxWidth: "50px",
                    justifyContent: "center",
                    fontSize: "23px",
                  }}
                >
                  <span className="badge pt-2">{` - ${Info_for_item.discount}%`}</span>
                </div>
              )}
            </div>
            <div className="hover-overlay">
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </div>
          </MDBRipple>
          <MDBCardBody className="card-body">
            <h5 className="card-title mb-3 ">{Info_for_item.title}</h5>
            <p>{Info_for_item.category}</p>

            <span>
              <h6 className="item-price mb-3"> $ {Info_for_item.price}</h6>
            </span>

            {/* <button className="btn" ><FiHeart size={17} /></button> */}
            {/* <p>Available: {stock}</p> */}

            <ButtonComponent
              handlerOnclick={() => handlerAddToCart(Info_for_item)}
              text={"Add to cart"}
              onDisabler={stock === 0}
            />



            <Link to={`/item/${Info_for_item.id}`}>
              <ButtonComponent
                onClick={() => getProduct(Info_for_item.id)}
                text={"View more"}
              />
            </Link>
          </MDBCardBody>
        </div>
      </MDBCard>
    </MDBCol>
  );
};

export default Item;
