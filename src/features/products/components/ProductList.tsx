import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../productsThunks";
import type { AppDispatch, RootState } from "../../../store";
import ProductCard from "./ProductCard";
import ProductContainer from "./ProductContainer";
import styled from "styled-components";
import { SelectBox } from "../../../sharedComponents/SelectBox";
import Loader from "../../../sharedComponents/Loader";
import { Button } from "../../../sharedComponents/Button";

export const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 24px;
  padding: 24px;
  background: #f8fafc;
`;

export const Sidebar = styled.aside`
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PaginationWrapper = styled.div`
  margin: 0 auto;
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductList = () => {
  const [category, setCategory] = useState("");
  const [sortedValue, setSortedValue] = useState("");
  const [orderVal, setOrderVal] = useState("asc");
  const [page, setPage] = useState(1);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    // dispatch(fetchProducts());
    dispatch(
      fetchProducts({
        page: page,
        limit: 12,
        sort: sortedValue,
        order: orderVal,
        category: category,
        inStock: onlyInStock,
      }),
    );
  }, [dispatch, category, page, sortedValue, orderVal, onlyInStock]);

  const handleCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setPage(1);
  };

  const handleSort = (sortedVal: string) => {
    if (
      sortedVal === "price_asc" ||
      sortedVal === "popularity_asc" ||
      sortedVal === "newest"
    ) {
      setOrderVal("asc");
      setSortedValue(sortedVal);
    } else {
      setOrderVal("desc");
      setSortedValue(sortedVal);
    }
    setPage(1);
  };
  const nextPage = () => {
    if (items.length > 0) setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  if (error) return <p>{error}</p>;
  console.log(onlyInStock, "-----------------");
  return (
    <>
      {loading ? (
        <Loader label="Loading products..." />
      ) : (
        <PageWrapper>
          <Sidebar>
            {/* <input placeholder="Search product..." /> */}
            <div>
              <label>Category</label>
              <SelectBox
                value={category}
                onChange={(e) => handleCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="accessories">Accessories</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="home">Home</option>
              </SelectBox>
            </div>
            <label>Sort By</label>
            <SelectBox
              value={sortedValue}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low </option>
              <option value="popularity_asc">Popularity Low to High</option>
              <option value="popularity_desc">Popularity High to Low</option>
            </SelectBox>

            <label>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              In Stock Only
            </label>
          </Sidebar>

          <Content>
            <ProductContainer>
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductContainer>
            <PaginationWrapper>
              <Button
                variant="primary"
                onClick={prevPage}
                disabled={page === 1}
              >
                {" "}
                prev
              </Button>
              <span> {page}</span>
              <Button
                variant="primary"
                onClick={nextPage}
                disabled={items.length === 0}
              >
                next
              </Button>
            </PaginationWrapper>
          </Content>
        </PageWrapper>
      )}
    </>
  );
};

export default ProductList;
