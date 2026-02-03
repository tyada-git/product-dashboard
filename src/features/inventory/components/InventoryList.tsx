import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import {
  fetchInventory,
  updateInventoryStock,
  type Inventory,
} from "../inventoryThunk";
import styled from "styled-components";
import Loader from "../../../sharedComponents/Loader";
import { SelectBox } from "../../../sharedComponents/SelectBox";
import { Button } from "../../../sharedComponents/Button";
import {
  Backdrop,
  ButtonRow,
  Field,
  Modal,
  Title,
  TitleProduct,
} from "../../../sharedComponents/Modal";
import ExportCsvButton from "../../../sharedComponents/ExportCsv";
import { timeAgoForStock } from "../../../helper";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
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

const InventoryWrapper = styled.div`
  display: flex;
`;

export const Sidebar = styled.aside`
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
`;

const InventoryList = () => {
  const [category, setCategory] = useState("");
  const [lowStock, setLowStock] = useState(0);
  const [reason, setReason] = useState("");
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // const [bulkOpen, setBulkOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error, updating } = useSelector(
    (state: RootState) => state.inventory,
  );
  const selectedItem = items.find((i) => i.id === openItemId); // for each row we need update btn

  useEffect(() => {
    dispatch(
      fetchInventory({
        category: category,
        lowStockThreshold: lowStock,
      }),
    );
  }, [dispatch, category, lowStock]);

  if (error) return <p>{error}</p>;

  const handleCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };
  const handleStock = (val: number) => {
    setLowStock(val);
  };

  const handleSubmit = async () => {
    if (!selectedItem) return;
    if (!reason) return;

    await dispatch(
      updateInventoryStock({
        id: selectedItem.id,
        quantity,
        reason,
      }),
    ).unwrap();

    setOpenItemId(null); // close modal
    setReason("");
  };
  const checkedItem = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x != id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <>
      {loading ? (
        <Loader label="Loading products..." />
      ) : (
        <>
          <InventoryWrapper>
            <Sidebar>
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

              <ExportCsvButton<Inventory>
                rows={items}
                headers={[
                  "id",
                  "name",
                  "category",
                  "currentStock",
                  "reorderLevel",
                  "lastUpdated",
                ]}
                filename="inventory.csv"
              />
            </Sidebar>

            <Table>
              <Thead>
                <tr>
                  <Th>Select</Th>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Current Stock</Th>
                  <Th>Reorder Level</Th>
                  <Th>Last Updated</Th>
                  <Th>Stock Update</Th>
                </tr>
              </Thead>

              <tbody>
                {items.map((item) => {
                  const isLow = item.currentStock <= item.reorderLevel;

                  return (
                    <>
                      <Tr key={item.id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item.id)}
                            onChange={() => checkedItem(item.id)}
                          />
                        </Td>
                        <Td>{item.name}</Td>
                        <Td>
                          <CategoryBadge>{item.category}</CategoryBadge>{" "}
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
                        <Td>
                          <Button
                            variant="primary"
                            onClick={() => {
                              setOpenItemId(item.id);
                              setQuantity(item.currentStock);
                            }}
                          >
                            Update
                          </Button>
                        </Td>
                      </Tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </InventoryWrapper>
          {selectedItem && (
            <Backdrop onClick={() => setOpenItemId(null)}>
              <Modal onClick={(e) => e.stopPropagation()}>
                <TitleProduct>Product: {selectedItem.name}</TitleProduct>
                <Title>Current Stock: {selectedItem.currentStock}</Title>

                <Field>
                  <label>Update quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </Field>

                <Field>
                  <label>Reason for change</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="">Select reason</option>
                    <option value="Restock from supplier">
                      Restock from supplier
                    </option>
                    <option value="Damaged items">Damaged items</option>
                    <option value="Manual adjustment">Manual adjustment</option>
                  </select>
                </Field>

                <ButtonRow>
                  <Button
                    variant="secondary"
                    onClick={() => setOpenItemId(null)}
                  >
                    Cancel
                  </Button>

                  <Button variant="primary" onClick={handleSubmit}>
                    {updating ? "Updating..." : "Update"}
                  </Button>
                </ButtonRow>
              </Modal>
            </Backdrop>
          )}
        </>
      )}
    </>
  );
};

export default InventoryList;
