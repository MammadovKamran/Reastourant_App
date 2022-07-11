import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waiter: "",
  tableNumber: 0,
};

const forwardSlice = createSlice({
  name: "forward",
  initialState,
  reducers: {
    addWaiter: (state, action) => {
      const { waiterName, tableNumber } = action.payload;
      state.waiter = waiterName;
      state.tableNumber = tableNumber;
    },
  },
});

export const { addWaiter } = forwardSlice.actions;

export const selectForwardState = (state) => state.forward;

export default forwardSlice.reducer;
