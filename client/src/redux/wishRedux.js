import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wishlistId: null,
    wishlist: [],
  },
  reducers: {
    createWishlist: (state, action) => {
      state.wishlistId = action.payload._id;
      state.wishlist = [];
    },
    addToWishlist: (state, action) => {
      state.wishlistId = action.payload._id;
      state.wishlist = action.payload.wishlist;
    },
    updateWishlist: (state, action) => {
      state.wishlist = action.payload.wishlist;
    },
  },
});

export const { createWishlist, addToWishlist, updateWishlist } =
  wishSlice.actions;
export default wishSlice.reducer;
