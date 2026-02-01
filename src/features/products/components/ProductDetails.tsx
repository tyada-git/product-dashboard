import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchProductById } from "../productsThunks";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (id) dispatch(fetchProductById(Number(id)));
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedProduct) return <p>No product found</p>;

  //   console.log(selectedProduct);
  return (
    <div>
      <h2>{selectedProduct.name}</h2>
      <p>{selectedProduct.description}</p>
      <p>{selectedProduct.price}</p>
    </div>
  );
};

export default ProductDetails;
