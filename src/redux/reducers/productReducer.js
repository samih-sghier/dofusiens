import {
  ADD_PRODUCT_SUCCESS,
  CLEAR_SEARCH_STATE, EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_CLIENT_SUCESS,
  GET_USER_PRODUCTS_SUCCESS,
  GET_PRODUCTS_SUCCESS, REMOVE_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_SUCCESS,
  CLEAR_USER_PRODUCTS
} from 'constants/constants';

const initState = {
  lastRefKey: null,
  lastUserRefKey: null,
  total: 0,
  userTotal: 0,
  items: [],
  userItems: []
};

export default (state = {
  lastRefKey: null,
  lastUserRefKey: null,
  total: 0,
  userTotal: 0,
  items: [],
  userItems: [],
  searchedProducts: initState
}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: [...state.items, ...action.payload.products]
      };
    case GET_USER_PRODUCTS_SUCCESS:
      return {
        ...state,
        lastUserRefKey: action.payload.lastKey,
        userTotal: action.payload.total,
        userItems: [...state.userItems, ...action.payload.products]
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        userItems: [...state.userItems, action.payload]
      };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        searchedProducts: {
          lastRefKey: action.payload.lastKey,
          total: action.payload.total,
          items: [...state.searchedProducts.items, ...action.payload.products]
        }
      };
    case CLEAR_SEARCH_STATE:
      return {
        ...state,
        searchedProducts: initState
      };
    case CLEAR_USER_PRODUCTS:
      return {
        ...state,
        lastUserRefKey: null,
        userTotal: 0,
        userItems: []
      };
    case REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        items: state.items.filter((product) => product.id !== action.payload),
        userItems: state.userItems.filter((product) => product.id !== action.payload),

      };
    case EDIT_PRODUCT_SUCCESS || EDIT_PRODUCT_CLIENT_SUCCESS:
      return {
        ...state,
        items: state.items.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              ...action.payload.updates
            };
          }
          return product;
        }),
        userItems: state.userItems.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              ...action.payload.updates
            };
          }
          return product;
        })
      };
    default:
      return state;
  }
};
