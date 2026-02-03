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

export interface UpdateInventoryRequest {
  id: number;
  quantity: number;
  reason: string;
}

export interface UpdateInventoryResponse {
  id: number;
  previousStock: number;
  newStock: number;
  change: number;
  reason: string;
  timestamp: string;
  stockHasbeenUpdated: boolean;
}

export const updateInventoryStock = createAsyncThunk<
  UpdateInventoryResponse,
  UpdateInventoryRequest,
  { rejectValue: string }
>(
  "inventory/updateInventoryStock",
  async ({ id, quantity, reason }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, reason }),
      });

      if (!res.ok) throw new Error("Failed to update stock");
      const data = await res.json();
      return data;
    } catch {
      return rejectWithValue("something went wrong");
    }
  },
);
