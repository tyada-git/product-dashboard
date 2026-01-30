import { rest } from "msw";
// import { rest } from "msw/lib/esm/rest";
import productsMock from "./productData";

export const handlers = [
  rest.get("/api/products", (req, res, ctx) => {
    // Optional: read query params for pagination/filtering
    const page = Number(req.url.searchParams.get("page") ?? 1);
    const limit = Number(req.url.searchParams.get("limit") ?? 12);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = productsMock.data.slice(start, end);

    return res(
      ctx.status(200),
      ctx.delay(500), // simulate network delay
      ctx.json({
        data: paginatedData,
        total: productsMock.total,
        page,
        limit,
      }),
    );
  }),
];
