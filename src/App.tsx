import { Route, Routes } from "react-router-dom";
import ProductList from "./features/products/components/ProductList";
import Header from "./header";
import ProductDetails from "./features/products/components/ProductDetails";
import InventoryList from "./features/inventory/components/InventoryList";
import ShowHistoryLogs from "./features/inventory/components/ShowHistoryLogs";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/inventory" element={<InventoryList />}></Route>
        <Route
          path="/inventory/:id/history"
          element={<ShowHistoryLogs />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
