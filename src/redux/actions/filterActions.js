import {
  APPLY_FILTER,
  CLEAR_RECENT_SEARCH,
  REMOVE_SELECTED_RECENT, RESET_FILTER, SET_BRAND_FILTER,
  SET_MAX_PRICE_FILTER,
  SET_MIN_PRICE_FILTER, SET_TEXT_FILTER,
  SET_GAME_FILTER, SET_SERVER_FILTER, SET_ASSET_FILTER,
  SET_COUNTRY_FILTER, SET_CITY_FILTER
} from 'constants/constants';

export const setTextFilter = (keyword) => ({
  type: SET_TEXT_FILTER,
  payload: keyword
});

export const setBrandFilter = (brand) => ({
  type: SET_BRAND_FILTER,
  payload: brand
});

export const setGameFilter = (game) => ({
  type: SET_GAME_FILTER,
  payload: game
});

export const setServerFilter = (server) => ({
  type: SET_SERVER_FILTER,
  payload: server
});

export const setCountryFilter = (country) => ({
  type: SET_COUNTRY_FILTER,
  payload: country
});

export const setCityFilter = (city) => ({
  type: SET_CITY_FILTER,
  payload: city
});

export const setAssetFilter = (asset) => ({
  type: SET_ASSET_FILTER,
  payload: asset
});

export const setMinPriceFilter = (min) => ({
  type: SET_MIN_PRICE_FILTER,
  payload: min
});

export const setMaxPriceFilter = (max) => ({
  type: SET_MAX_PRICE_FILTER,
  payload: max
});

export const resetFilter = () => ({
  type: RESET_FILTER
});

export const clearRecentSearch = () => ({
  type: CLEAR_RECENT_SEARCH
});

export const removeSelectedRecent = (keyword) => ({
  type: REMOVE_SELECTED_RECENT,
  payload: keyword
});

export const applyFilter = (filters) => ({
  type: APPLY_FILTER,
  payload: filters
});
