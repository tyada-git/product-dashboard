import { rest } from "msw";
import productsMock from "./productData";
import inventoryMock from "./inventoryData";
import { historyMock } from "./historyMock";

export const handlers = [
  rest.get("/api/products", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page") ?? 1);
    const limit = Number(req.url.searchParams.get("limit") ?? 12);

    const category = req.url.searchParams.get("category") || "";
    const inStockParam = req.url.searchParams.get("inStock");

    const sort = req.url.searchParams.get("sort") || "";
    const order = req.url.searchParams.get("order");

    let filtered = [...productsMock.data];

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (inStockParam === "true") {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    if (sort) {
      filtered.sort((a, b) => {
        // newest => createdAt - check mock to validate as we have copy pasted the mocks
        if (sort === "newest") {
          const aTime = new Date(a.createdAt).getTime();
          const bTime = new Date(b.createdAt).getTime();
          return order === "asc" ? aTime - bTime : bTime - aTime;
        }

        if (sort === "price_asc" || sort === "price_desc") {
          return order === "asc" ? a.price - b.price : b.price - a.price;
        }

        if (sort === "popularity_asc" || sort === "popularity_desc") {
          return order === "asc"
            ? a.popularity - b.popularity
            : b.popularity - a.popularity;
        }

        return 0;
      });
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filtered.slice(start, end);

    return res(
      ctx.status(200),
      ctx.delay(600),
      ctx.json({
        data: paginatedData,
        total,
        page,
        limit,
      }),
    );
  }),

  rest.get("/api/products/:id", (req, res, ctx) => {
    const id = Number(req.params.id);

    const selectedProduct = productsMock.data.find((p) => p.id === id);
    // console.log("msw-------");
    // I was returning object and thats was causing issue in details page -
    // console.log(selectedProduct);
    return res(ctx.status(200), ctx.delay(200), ctx.json(selectedProduct));
  }),

  rest.get("/api/inventory", (req, res, ctx) => {
    const category = req.url.searchParams.get("category") || "";
    const lowStockThreshold = Number(
      req.url.searchParams.get("lowStockThreshold") ?? 0,
    );

    let filteredInventory = [...inventoryMock.data];

    if (category) {
      filteredInventory = filteredInventory.filter(
        (i) => i.category === category,
      );
    }
    if (lowStockThreshold) {
      filteredInventory = filteredInventory.filter(
        (i) => i.currentStock <= lowStockThreshold,
      );
    }
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json({ data: filteredInventory }),
    );
  }),

  rest.put("/api/inventory/:id", async (req, res, ctx) => {
    const id = Number(req.params.id);

    const body = (await req.json()) as { quantity: number; reason: string };

    const newStock = Number(body.quantity);
    const reason = String(body.reason ?? "Manual adjustment");
    const timestamp = new Date().toISOString();

    const invItem = inventoryMock.data.find((x) => x.id === id);
    if (!invItem) {
      return res(
        ctx.status(404),
        ctx.json({ message: "Inventory item not found" }),
      );
    }

    const previousStock = invItem.currentStock;
    invItem.currentStock = newStock;
    invItem.lastUpdated = timestamp;

    //update products mock to keep screens consistent
    const prod = productsMock.data.find((p) => p.id === id);
    if (prod) {
      prod.stock = newStock;
      prod.lastStockUpdate = timestamp;
    }

    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json({
        id,
        previousStock,
        newStock,
        change: newStock - previousStock,
        reason,
        timestamp,
        stockHasbeenUpdated: true,
      }),
    );
  }),

  rest.get("/api/inventory/:id/history", (req, res, ctx) => {
    const id = Number(req.params.id);
    const filtered = historyMock.data.filter((x) => x.productId === id);
    return res(ctx.status(200), ctx.delay(200), ctx.json({ data: filtered }));
  }),
];
