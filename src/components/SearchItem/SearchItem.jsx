import "./SearchItem.css";
import { MDBInputGroup } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { getProductByName } from "../../services/firebase";
import ItemList from "../ItemListContainer/ItemList";
import { useLocation } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const SearchItem = () => {
  const [search, setSearch] = useState("");
  const [products, setProduct] = useState([]);
  let location = useLocation();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value); 
      e.target.value = "";

    }
  };

  useEffect(() => {
    search
      && getProductByName(search)
          // de ser exitosa la devolucion guardo lo recibido en el useState
          .then((response) => setProduct(response))
          // de ser erronea la respuesta mostrar el error por consola
          .catch((e) => console.log(e))

      
  }, [search]);

  useEffect(() => {
    if (!search) {
      setProduct([]);
    }
  }, [search]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setSearch("");
      setProduct([]);
    }
  }, [location.pathname]);



  return search ? (
    <>
      <div className="container d-flex  justify-content-center ">
        <MDBInputGroup className=" searcItem col-10 ">
          <input
            onKeyDown={handleSearch}
            autoFocus
            className="form-control "
            placeholder="Search"
            type="text"
          />
        </MDBInputGroup>
      </div>
      <div className="search-information">
        <div className="text-searched row">
          <p>{`Results for >> ${search}`}</p>
        </div>
        <div className="d-flex justify-content-center mb-3">
      <ButtonComponent 
      
      handlerOnclick={() => setSearch('')}
      text={'Return'}
      />
      </div>
        <div className="row item-search-container">
        <ItemList
        products={products}
      />
        </div>
      </div>

    </>
  ) : (
    <div className="container d-flex  justify-content-center ">
      <MDBInputGroup className=" searcItem col-10 ">
        <input
          onKeyDown={handleSearch}
          autoFocus
          className="form-control "
          placeholder="Search"
          type="text"
        />
      </MDBInputGroup>
    </div>
  );
};
export default SearchItem;
