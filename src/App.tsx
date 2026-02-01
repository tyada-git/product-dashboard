import { Route, Routes } from "react-router-dom";
import ProductList from "./features/products/components/ProductList";
import Header from "./header";
import ProductDetails from "./features/products/components/ProductDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
