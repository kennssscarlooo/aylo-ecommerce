import { publicRequest, userRequest } from "../request";
import {
  signinSuccess,
  signinStart,
  signinFailure,
} from "./userRedux";
import {
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import {
  getMemberStart,
  getMemberSuccess,
  getMemberFailure,
  deleteMemberStart,
  deleteMemberSuccess,
  deleteMemberFailure,
  updateMemberStart,
  updateMemberSuccess,
  updateMemberFailure,
  addMemberStart,
  addMemberSuccess,
  addMemberFailure,
} from "./memberRedux";
import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} from "./orderRedux";

// LOGIN
async function signinRequest(dispatch, user) {
  dispatch(signinStart());
  try {
    const response = await publicRequest.post("auth/signin", user);
    dispatch(signinSuccess(response.data));
  } catch (error) {
    dispatch(signinFailure());
    console.error(error);
  }
}

// PRODUCTS
async function getProducts(dispatch) {
  dispatch(getProductStart());
  try {
    const response = await publicRequest.get("products");
    dispatch(getProductSuccess(response.data));
  } catch (error) {
    dispatch(getProductFailure());
    console.error(error);
  }
}
async function deleteProduct(id, dispatch) {
  dispatch(deleteProductStart());
  try {
    const response = await userRequest.delete(`products/${id}`);
    dispatch(deleteProductSuccess(response.data));
  } catch (error) {
    dispatch(deleteProductFailure());
    console.error(error);
  }
}
async function updateProduct(id, product, dispatch) {
  dispatch(updateProductStart());
  try {
    const response = await userRequest.patch(`/products/${id}`, product);
    dispatch(updateProductSuccess(response.data));
  } catch (error) {
    dispatch(updateProductFailure());
  }
}
async function addProduct(product, dispatch) {
  dispatch(addProductStart());
  try {
    const response = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(response.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
}
// ORDERS
async function getOrders(dispatch) {
  dispatch(getOrderStart());
  try {
    const response = await userRequest.get("orders");
    dispatch(getOrderSuccess(response.data));
  } catch (error) {
    dispatch(getOrderFailure());
    console.error(error);
  }
}
async function deleteOrder(id, dispatch) {
  dispatch(deleteOrderStart());
  try {
    const response = await userRequest.delete(`orders/${id}`);
    dispatch(deleteOrderSuccess(response.data));
  } catch (error) {
    dispatch(deleteOrderFailure());
    console.error(error);
  }
}
async function updateOrder(id, order, dispatch) {
  dispatch(updateOrderStart());
  try {
    const response = await userRequest.patch(`/orders/${id}`, order);
    dispatch(updateOrderSuccess(response.data));
  } catch (error) {
    dispatch(updateOrderFailure());
  }
}

// MEMBERS
async function getMembers(dispatch) {
  dispatch(getMemberStart());
  try {
    const response = await publicRequest.get("users");
    dispatch(getMemberSuccess(response.data));
  } catch (error) {
    dispatch(getMemberFailure());
    console.error(error);
  }
}
async function deleteMember(id, dispatch) {
  dispatch(deleteMemberStart());
  try {
    const response = await userRequest.delete(`users/${id}`);
    dispatch(deleteMemberSuccess(response.data));
  } catch (error) {
    dispatch(deleteMemberFailure());
    console.error(error);
  }
}
async function updateMember(id, member, dispatch) {
  dispatch(updateMemberStart());
  try {
    const response = await userRequest.patch(`/users/${id}`, member);
    dispatch(updateMemberSuccess(response.data));
  } catch (error) {
    dispatch(updateMemberFailure());
  }
}
async function addMember(admin, dispatch) {
  dispatch(addMemberStart());
  try {
    const response = await userRequest.post(`/auth/signup`, admin);
    dispatch(addMemberSuccess(response.data));
  } catch (error) {
    dispatch(addMemberFailure());
  }
}

export {
  signinRequest,
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct,
  getMembers,
  updateMember,
  deleteMember,
  addMember,
  getOrders,
  updateOrder,
  deleteOrder,
};
