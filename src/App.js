import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchItem from "./components/SearchItem/SearchItem";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDeatailContainer from "./components/ItemDetailContainer/ItemDeatailContainer";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";
import NavbarComp from "./components/Navbar/NavbarComp";
import { CartProvider } from "./storage/cartContext";
import Cart from "./pages/Cart/Cart";
import { CatchProducts } from "./services/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  CatchProducts();
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CartProvider>
        <BrowserRouter>
          <NavbarComp />
          <SearchItem></SearchItem>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route
              path="/category/:ItemConsole"
              element={<ItemListContainer />}
            />
            <Route path="/item/:itemid" element={<ItemDeatailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
