import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  CANCEL_GET_PRODUCTS,
  CLEAR_SEARCH_STATE,
  EDIT_PRODUCT,
  EDIT_PRODUCT_CLIENT,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  SEARCH_PRODUCT,
  SEARCH_PRODUCT_SUCCESS,
  EDIT_PRODUCT_CLIENT_SUCESS,
  GET_USER_PRODUCTS,
  GET_USER_PRODUCTS_SUCCESS
} from 'constants/constants';

export const getProducts = (lastRef) => ({
  type: GET_PRODUCTS,
  payload: lastRef
});

export const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products
});

export const cancelGetProducts = () => ({
  type: CANCEL_GET_PRODUCTS
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product
});

export const searchProduct = (searchKey) => ({
  type: SEARCH_PRODUCT,
  payload: {
    searchKey
  }
});

export const searchProductSuccess = (products) => ({
  type: SEARCH_PRODUCT_SUCCESS,
  payload: products
});

export const clearSearchState = () => ({
  type: CLEAR_SEARCH_STATE
});

export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product
});

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  payload: id
});

export const removeProductSuccess = (id) => ({
  type: REMOVE_PRODUCT_SUCCESS,
  payload: id
});

export const editProduct = (id, updates) => ({
  type: EDIT_PRODUCT,
  payload: {
    id,
    updates
  }
});

export const editProductSuccess = (updates) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: updates
});


export const editProductClient = (id, updates) => ({
  type: EDIT_PRODUCT_CLIENT,
  payload: {
    id,
    updates
  }
});

export const editProductClientSuccess = (updates) => ({
  type: EDIT_PRODUCT_CLIENT_SUCESS,
  payload: updates
});


/** USER ACTIONS */

export const getUserProducts = (id, lastRef) => ({
  type: GET_USER_PRODUCTS,
  payload: {
    id,
    lastRef
  }
});

export const getUserProductsSuccess = (products) => ({
  type: GET_USER_PRODUCTS_SUCCESS,
  payload: products
});
