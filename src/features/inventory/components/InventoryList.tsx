import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchInventory } from "../inventoryThunk";
import { timeAgoForStock } from "../../../helper";
import styled from "styled-components";
import Loader from "../../../sharedComponents/Loader";
import { SelectBox } from "../../../sharedComponents/SelectBox";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  margin: 40px;
`;

const Thead = styled.thead`
  background: #f1f5f9;
`;

const Th = styled.th`
  text-align: left;
  padding: 14px;
  font-size: 13px;
  color: #475569;
  font-weight: 600;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background: #f8fafc;
  }
`;

const Td = styled.td`
  padding: 14px;
  font-size: 14px;
`;

const CategoryBadge = styled.span`
  background: #eef2ff;
  color: #4338ca;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const LowStock = styled.span`
  color: #dc2626;
  font-weight: 700;
`;
const InventoryList = () => {
  const [category, setCategory] = useState("");
  const [lowStock, setLowStock] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error } = useSelector(
    (state: RootState) => state.inventory,
  );
  useEffect(() => {
    dispatch(
      fetchInventory({
        category: category,
        lowStockThreshold: lowStock,
      }),
    );
  }, [dispatch, category, lowStock]);
  console.log(items);
  if (error) return <p>{error}</p>;

  const handleCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };
  const handleStock = (val: number) => {
    setLowStock(val);
  };

  return (
    <>
      {loading ? (
        <Loader label="Loading products..." />
      ) : (
        <>
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
            <label>Stock</label>
            <SelectBox
              value={lowStock}
              onChange={(e) => handleStock(Number(e.target.value))}
            >
              <option value={0}>All</option>
              <option value={5}>≤ 5</option>
              <option value={10}>≤ 10</option>
              <option value={20}>≤ 20</option>
            </SelectBox>
          </div>
          <Table>
            <Thead>
              <tr>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Current Stock</Th>
                <Th>Reorder Level</Th>
                <Th>Last Updated</Th>
              </tr>
            </Thead>

            <tbody>
              {items.map((item) => {
                const isLow = item.currentStock <= item.reorderLevel;

                return (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>

                    <Td>
                      <CategoryBadge>{item.category}</CategoryBadge>
                    </Td>

                    <Td>
                      {isLow ? (
                        <LowStock>{item.currentStock}</LowStock>
                      ) : (
                        item.currentStock
                      )}
                    </Td>

                    <Td>{item.reorderLevel}</Td>

                    <Td>{timeAgoForStock(item.lastUpdated)}</Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default InventoryList;
