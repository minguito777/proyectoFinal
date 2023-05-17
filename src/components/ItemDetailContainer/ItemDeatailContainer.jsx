import { getProduct } from "../../services/firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./StylesItemDetailContainer.css";
import ItemCount from "./ItemCount.jsx";
import Spiner from "../Spiner/Spiner.jsx";
import { Link } from "react-router-dom";


function ItemDeatailContainer() {

  const notFound = {
    imgUrl:
      "https://www.zeldadungeon.net/wp-content/uploads/2013/10/error3.jpg",
    title: "No existe ese producto",
  }
  const [isLoading, setisLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  let params = useParams();

  useEffect(() => {
      getProduct(params.itemid)
    .then((resp) => setDetail(resp))
    .catch((err) => setDetail(notFound))
    .finally(
      ()=>setisLoading(false)
    )
  }, [ ]);  // eslint-disable-line 

  return (
<>
{ isLoading  ?  (
  <div className="container col-12 mt-5 d-flex  " style={{minHeight:'30vh' ,alignItems:'center' ,justifyContent:'center',textAlign:'center'}}>
    
    <Spiner/>
  </div>
  

):(
    <div className="detail-container container ">
      <div className="details">
        <div className="big-img">
          <img src={detail.imgUrl} alt={detail.title}></img>
        </div>
        <div className="box">
          <div className="row">
            <h2>{detail.title}</h2>
            <p>{detail.category}</p>
            <p>{detail.console}</p>
            <span className="price">$ {detail.price}</span>
            <span className="stock">{`Stock: ${ detail.stock}`}</span>
                      
          </div>
          <div className="box-description">
          <p>{detail.description}</p>
          </div>
          <span className="line-divider"></span>
          <ItemCount detail={detail}/>
        </div>
      </div>
      <div className="col text-center">
      <Link to="/">
                <p text="Back to Home">  {'>>>Al Inicio'}</p>
        </Link>
      </div>
    </div>)}


  </>  );
}
export default ItemDeatailContainer;
