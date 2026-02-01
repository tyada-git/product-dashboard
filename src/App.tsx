import { Route, Routes } from "react-router-dom";
import ProductList from "./features/products/components/ProductList";
import Header from "./header";

function App() {
  return (
    <>
      {/* <nav>
        <Link to="/products"> Products</Link>
        <Link to="/inventory"> Inventory</Link>
      </nav> */}
      <Header />
      <Routes>
        <Route path="/products" element={<ProductList />}></Route>
      </Routes>
    </>
  );
}

export default App;
