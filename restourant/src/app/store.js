import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./../features/Redux/orders/ordersSlice";
import waitersReducer from "./../features/Redux/waiters/waitersSlice";
import productsReducer from "./../features/Redux/products/productsSlice";
import forwardReducer from "./../features/Redux/forward/forwardSlice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    waiters: waitersReducer,
    products: productsReducer,
    forward: forwardReducer,
  },
});

export default store;
