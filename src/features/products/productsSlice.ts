import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductById,
  fetchProducts,
  type Product,
} from "./productsThunks";

interface ProductsState {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;

  selectedProduct: Product | null;
  detailsLoading: boolean;
  detailsError: string | null;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 12,
  loading: false,
  error: null,

  selectedProduct: null,
  detailsLoading: false,
  detailsError: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "unknowm error";
      });

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload ?? "unknown error";
      });
  },
});

export default productsSlice.reducer;
