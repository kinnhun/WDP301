import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    productList: [],
    totalPage: 0,
    status: "idle",
    page: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    //productList
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productList = action.payload.listProduct;
      state.totalPage = action.payload.totalPage;
      state.status = "idle";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "failed";
    });
    //productDetail
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (page = 1, { rejectedWithValue }) => {
    const response = await fetch(
      `https://api-exercise-sopi.vercel.app/api/v1/products?limit=8&page=${page}`
    );
    if (!response.ok) {
      return rejectedWithValue("data");
    }
    const products = await response.json();
    // console.log(products.data.listProduct);
    return { listProduct: products.data.listProduct, totalPage: products.data.totalPage };
  }
);

export const fetchProduct = createAsyncThunk(
  "fetchProduct",
  async (id = 1, { rejectedWithValue }) => {
    const response = await fetch(`https://api-exercise-sopi.vercel.app/api/v1/products/${id}`);
    if (!response.ok) {
      return rejectedWithValue("data");
    }
    const product = await response.json();
    return product.data;
  }
);
