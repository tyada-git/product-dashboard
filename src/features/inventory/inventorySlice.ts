import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInventory,
  updateInventoryStock,
  type Inventory,
} from "./inventoryThunk";

interface InventoryState {
  items: Inventory[];
  loading: boolean;
  error: string | null;

  updating: boolean;
  updateError: string | null;
}

const initialState: InventoryState = {
  items: [],
  loading: true,
  error: null,

  updating: false,
  updateError: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "unknown error";
      })
      .addCase(updateInventoryStock.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateInventoryStock.fulfilled, (state, action) => {
        state.updating = false;

        const { id, newStock, timestamp } = action.payload;
        // inventory table we are updating
        const item = state.items.find((x) => x.id === id);
        if (item) {
          item.currentStock = newStock;
          item.lastUpdated = timestamp;
        }
      })
      .addCase(updateInventoryStock.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload ?? "unknown error";
      });
  },
});
export default inventorySlice.reducer;
