import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const waitersAdapter = createEntityAdapter({
  selectId: (waiter) => waiter.id,
  sortComparer: (a, b) => b.name.localeCompare(a.name),
});

export const fetchWaiters = createAsyncThunk(
  "waiters/fetchWaiters",
  async () => {
    try {
      const response = await fetch("http://localhost:3000/waiters");
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
);

const waitersSlice = createSlice({
  name: "waiters",
  initialState: waitersAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchWaiters.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchWaiters.fulfilled]: (state, action) => {
      state.status = "succeeded";
      waitersAdapter.setAll(state, action.payload);
    },
    [fetchWaiters.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  selectEntities: selectWaiterEntities,
  selectIds: selectWaiterIds,
  selectAll: selectAllWaiters,
  selectTotal: selectTotalWaitersSlice,
  selectById: selectWaiterById,
} = waitersAdapter.getSelectors((state) => state.waiters);

export default waitersSlice.reducer;
