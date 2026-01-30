import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../productsThunks";
import type { AppDispatch, RootState } from "../../../store";
import ProductCard from "./ProductCard";
import Button from "../../../sharedComponents/Button";
import ProductContainer from "./ProductContainer";

const ProductList = () => {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    // dispatch(fetchProducts());
    dispatch(
      fetchProducts({
        page: page,
        limit: 8,
        sort: "name",
        order: "asc",
        category: category,
        inStock: true,
      }),
    );
  }, [dispatch, category, page]);

  const handleCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  //   if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <select onChange={(e) => handleCategory(e.target.value)}>
            <option>select a category </option>
            <option>accessories</option>
            <option>electronics</option>
            <option>furniture</option>
            <option>home</option>
          </select>
          <ProductContainer>
            {items.map((item) => {
              return <ProductCard product={item} />;
            })}
          </ProductContainer>
          <Button onClick={prevPage}> prev</Button>
          {page}
          <Button onClick={nextPage}>next</Button>
        </>
      )}
    </>
  );
};

export default ProductList;
