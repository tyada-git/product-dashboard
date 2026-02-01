import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Specification {
  label: string;
  value: string;
}

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
  fullDescription: string;
  specifications: Specification[];
  reviews: object;
  lastStockUpdate: string;
  relatedProducts: Array<number>;
  images: Array<string>;
}

interface FetchProductsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  category?: string;
  inStock?: boolean;
}

export const fetchProducts = createAsyncThunk<
  { data: Product[]; total: number; page: number; limit: number },
  FetchProductsParams,
  { rejectValue: string }
>("products/fetchProducts", async (params, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 12),
      sort: params.sort ?? "",
      order: params.order ?? "",
      category: params.category ?? "",
      inStock: String(params.inStock ?? ""),
    });

    const res = await fetch(`/api/products?${query.toString()}`);

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    return data; // MSW response - from handler -
  } catch {
    return rejectWithValue("something went wrong");
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("product/fetchProductById", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    const data = await res.json();

    return data;
  } catch {
    return rejectWithValue("something went wrong");
  }
});
