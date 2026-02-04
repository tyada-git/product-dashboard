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
import ProductNotFound from "./ProductNotFound";

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
const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #475569;
  font-weight: 600;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  background: #fff;
  font-size: 14px;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const ProductList = () => {
  const [category, setCategory] = useState("");
  const [sortedValue, setSortedValue] = useState("");
  const [orderVal, setOrderVal] = useState("asc");
  const [page, setPage] = useState(1);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
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

  const query = search.trim().toLowerCase();
  const filteredItems = query
    ? items.filter((p) => p.name.toLowerCase().includes(query))
    : items;

  if (error) return <p>{error}</p>;
  return (
    <>
      {loading ? (
        <Loader label="Loading products..." />
      ) : (
        <PageWrapper>
          <Sidebar>
            <FieldGroup>
              <Label>Search</Label>
              <SearchInput
                placeholder="Search product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <Label>Category</Label>
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
            </FieldGroup>
            <FieldGroup>
              <Label>Sort By</Label>
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
            </FieldGroup>
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
            {filteredItems.length === 0 ? (
              <ProductNotFound />
            ) : (
              <>
                <ProductContainer>
                  {filteredItems.map((p) => (
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
              </>
            )}
          </Content>
        </PageWrapper>
      )}
    </>
  );
};

export default ProductList;
