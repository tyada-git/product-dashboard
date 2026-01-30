// export const fetchProducts = createAsyncThunk<
//   Product[],
//   void,
//   { rejectValue: string }
// >("products/fetchProducts", async (_, { rejectWithValue }) => {
//   // TY - rejectvalue - to avoid action.payload as undefined I have added to give string from my side
//   try {
//     // const res = await fetch("/api/products");
//     // const data = await res.json();
//     // console.log(data);
//     // if (!res.ok) throw new Error("Failed to fetch products");
//     return productsMock.data;
//   } catch {
//     return rejectWithValue("something went wrong");
//   }
// });
import { createAsyncThunk } from "@reduxjs/toolkit";
import productsMock from "../../mocks/productData";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  popularity: number;
  createdAt: string;
}

interface FetchProductsParams {
  page?: number;
  limit?: number;
  sort?: keyof Product;
  order?: "asc" | "desc";
  category?: string;
  inStock?: boolean;
}

export const fetchProducts = createAsyncThunk<
  { data: Product[]; total: number; page: number; limit: number }, // returned value
  FetchProductsParams, // input params
  { rejectValue: string }
>("products/fetchProducts", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort,
      order = "asc",
      category,
      inStock,
    } = params;

    // Filter by category
    let filtered = productsMock.data;
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Filter by stock
    if (inStock) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    // Sort
    if (sort) {
      filtered = filtered.sort((a, b) => {
        const aValue = a[sort];
        const bValue = b[sort];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    // Pagination
    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filtered.slice(start, end);

    return { data: paginatedData, total, page, limit };
  } catch {
    return rejectWithValue("something went wrong");
  }
});
