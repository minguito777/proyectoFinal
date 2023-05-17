import { createContext, useState } from "react";
// import useDeepCopy from "../components/helpers/useDeepCopy";


//todo 1. crear el contexto
// darle un valor inicial al contexto
export const cartContext = createContext({ cart: [] });

//todo 2. inicializar el provider.
// generar un custom provider

function CartProvider(props) {
  const [cart, setCart] = useState([]);


  const test = () => {
    console.log("test");
  }; 

  const AddToCart = (itemToAdd) => {
    // verifico que el item añadido exista o no en cart, y si existe le añado 1
    const existItem = cart.find((item) => item.id === itemToAdd.id);
    existItem
      ? (existItem.quantity += itemToAdd.quantity)
      : //forma resumida , copiamos todo lo de cart , y le agregamos itemToAdd
        setCart([...cart, itemToAdd]);
  };

  const RemoveToCart = (itemToRemove) => {
    setCart(cart.filter((item) => item.id !== itemToRemove.id));
  };

  const Clear = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    let total = cart.reduce((price,item)=> price + item.quantity * item.price,0)
    return total.toFixed(2)
  };

  //todo 3. retornar el provider con el context personalizado
  return (
    <cartContext.Provider
      value={{ cart, test, AddToCart, RemoveToCart, Clear, getTotalPrice }}
    >
      {/* //todo 4. renderizamos el contenido del sitio como children */}
      {props.children}
    </cartContext.Provider>
  );
}

export { CartProvider };
