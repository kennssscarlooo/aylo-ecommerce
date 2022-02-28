import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders = action.payload;
    },
    updateOrder: (state, action) => {
      state.orders[
        state.orders.findIndex((order) => order._id === action.payload.id)
      ] = action.payload.order;
    },
  },
});

export const { addOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
