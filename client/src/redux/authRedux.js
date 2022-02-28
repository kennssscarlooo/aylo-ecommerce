import { publicRequest } from "../apiRequest";
import {
  signinSuccess,
  signinStart,
  signinFailure,
  updateUser,
} from "./userRedux";
import { createWishlist, addToWishlist, updateWishlist } from "./wishRedux";
import { addOrder, updateOrder } from "./orderRedux";

// USER
async function signupRequest(dispatch, user) {
  dispatch(signinStart());
  try {
    const signupResponse = await publicRequest.post("auth/signup", user);
    const userId = await signupResponse.data._id;
    const wishlistResponse = await publicRequest.post(`wishlist`, {
      userId: userId,
    });
    const ordersResponse = await publicRequest.get(`orders/${userId}`);
    dispatch(signinSuccess(signupResponse.data));
    dispatch(createWishlist(wishlistResponse.data));
    dispatch(addOrder(ordersResponse.data));
  } catch (error) {
    dispatch(signinFailure());
  }
}
async function signinRequest(dispatch, user) {
  dispatch(signinStart());
  try {
    const signinResponse = await publicRequest.post("auth/signin", user);
    const userId = await signinResponse.data._id;
    const wishlistResponse = await publicRequest.get(`wishlist/${userId}`);
    const ordersResponse = await publicRequest.get(`orders/${userId}`);
    dispatch(signinSuccess(signinResponse.data));
    dispatch(addToWishlist(wishlistResponse.data));
    dispatch(addOrder(ordersResponse.data));
  } catch (error) {
    dispatch(signinFailure());
    console.error(error);
  }
}
async function updateUserInfo(id, user, dispatch) {
  try {
    const response = await publicRequest.patch(`users/${id}`, user);
    dispatch(updateUser(response.data));
  } catch (error) {
    console.error(error);
  }
}

// WISHLIST
async function updateWishlistProducts(id, item, dispatch) {
  try {
    const response = await publicRequest.patch(`wishlist/${id}`, item);
    dispatch(updateWishlist(response.data));
  } catch (error) {
    console.error(error);
  }
}

// ORDERS

async function getOrders(userID, dispatch) {
  try {
    const response = await publicRequest.get(`orders/${userID}`);
    dispatch(addOrder(response.data));
  } catch (error) {
    console.error(error);
  }
}
async function updateOrderStatus(id, item, dispatch) {
  try {
    const response = await publicRequest.patch(`orders/${id}`, item);
    dispatch(updateOrder(response.data));
  } catch (error) {
    console.error(error);
  }
}

export {
  signinRequest,
  signupRequest,
  updateUserInfo,
  updateWishlistProducts,
  getOrders,
  updateOrderStatus,
};
