import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Inventory {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  reorderLevel: number;
  lastUpdated: string;
}
interface FetchInventoryParams {
  category: string;
  lowStockThreshold: number;
}

export const fetchInventory = createAsyncThunk<
  { data: Inventory[] },
  FetchInventoryParams,
  { rejectValue: string }
>("inventory/fetchInventory", async (params, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams({
      category: String(params.category ?? ""),
      lowStockThreshold: String(params.lowStockThreshold ?? 12),
    });

    const res = await fetch(`/api/inventory?${query.toString()}`);
    const data = await res.json();

    return data;
  } catch {
    return rejectWithValue("spmething went wrong");
  }
});
