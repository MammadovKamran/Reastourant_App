import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const ordersAdapter = createEntityAdapter({
  selectId: (order) => order.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await fetch("http://localhost:3000/orders");
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

export const addOrder = createAsyncThunk("orders/addOrder", async (order) => {
  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: ordersAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchOrders.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.status = "succeeded";
      ordersAdapter.setAll(state, action.payload);
    },
    [fetchOrders.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [addOrder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      ordersAdapter.addOne(state, action.payload);
    },
    [addOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  selectEntities: selectOrderEntities,
  selectIds: selectOrderIds,
  selectAll: selectAllOrders,
  selectTotal: selectTotalOrdersSlice,
  selectById: selectOrderById,
} = ordersAdapter.getSelectors((state) => state.orders);

export default ordersSlice.reducer;
