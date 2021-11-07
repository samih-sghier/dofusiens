/* eslint-disable no-nested-ternary */
import { useDidMount } from 'hooks';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { applyFilter, resetFilter } from 'redux/actions/filterActions';
import { selectMax, selectMin } from 'selectors/selector';
import PriceRange from './PriceRange';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const Filters = ({ closeModal }) => {
  const { filter, isLoading, products } = useSelector((state) => ({
    filter: state.filter,
    isLoading: state.app.loading,
    products: state.products.items
  }));
  const [field, setFilter] = useState({
    category: filter.category,
    game: filter.game,
    server: filter.server,
    asset: filter.asset,
    country: filter.country,
    city: filter.city,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    sortBy: filter.sortBy
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const didMount = useDidMount();

  const max = selectMax(products);
  const min = selectMin(products);

  useEffect(() => {
    if (didMount && window.screen.width <= 480) {
      history.push('/');
    }

    if (didMount && closeModal) closeModal();

    setFilter(filter);
    window.scrollTo(0, 0);
  }, [filter]);


  const onPriceChange = (minVal, maxVal) => {
    setFilter({ ...field, minPrice: minVal, maxPrice: maxVal });
  };

  const onCategoryFilterChange = (e) => {
    const val = e.target.value;

    setFilter({ ...field, category: val });
  };

  const onGameFilterChange = (e) => {
    const val = e.target.value;

    setFilter({ ...field, game: val });
  };

  const onServerFilterChange = (e) => {
    const val = e.target.value;

    setFilter({ ...field, server: val });
  };

  const onAssetFilterChange = (e) => {
    const val = e.target.value;

    setFilter({ ...field, asset: val });
  };

  const onCountryFilterChange = (e) => {
    setFilter({ ...field, country: e });
  };

  const onCityFilterChange = (e) => {
    //const val = e.target.value;
    setFilter({ ...field, city: e });
  };


  const onSortFilterChange = (e) => {
    setFilter({ ...field, sortBy: e.target.value });
  };

  const onApplyFilter = () => {
    const isChanged = Object.keys(field).some((key) => field[key] !== filter[key]);

    if (field.minPrice > field.maxPrice) {
      return;
    }

    if (isChanged) {
      dispatch(applyFilter(field));
    } else {
      closeModal();
    }
  };

  const onResetFilter = () => {
    const filterFields = ['category', 'game', 'server', 'country', 'city', 'minPrice', 'maxPrice', 'sortBy'];

    if (filterFields.some((key) => !!filter[key])) {
      dispatch(resetFilter());
    } else {
      closeModal();
    }
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Category</span>
        <br />
        <br />
        {products.length === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
            <select
              className="filters-brand"
              value={field.category}
              disabled={isLoading || products.length === 0}
              onChange={onCategoryFilterChange}
            >
              <option value="">All Categories</option>
              <option value="gaming">Gaming</option>
            </select>
          )}
      </div>
      <div className="filters-field">
        <span>Sort By</span>
        <br />
        <br />
        <select
          className="filters-sort-by d-block"
          value={field.sortBy}
          disabled={isLoading || products.length === 0}
          onChange={onSortFilterChange}
        >
          <option value="">None</option>
          <option value="name-asc">Name Ascending A - Z</option>
          <option value="name-desc">Name Descending Z - A</option>
          <option value="price-desc">Price High - Low</option>
          <option value="price-asc">Price Low - High</option>
        </select>
      </div>
      {field.category == "gaming" ?
        <div className="filters-field">
          <span>Game</span>
          <br />
          <br />
          {products.length === 0 && isLoading ? (
            <h5 className="text-subtle">Loading Filter</h5>
          ) : (
              <select
                className="filters-brand"
                value={field.game}
                disabled={isLoading || products.length === 0}
                onChange={onGameFilterChange}
              >
                <option value="">All Games</option>
                <option value="dofus">Dofus</option>
                <option value="dofus touch">Dofus Touch</option>
              </select>
            )}
        </div> : null}
      {field.game == "dofus" ?
        <>
          <div className="filters-field">
            <span>Server</span>
            <br />
            <br />
            {products.length === 0 && isLoading ? (
              <h5 className="text-subtle">Loading Filter</h5>
            ) : (
                <select
                  className="filters-brand"
                  value={field.server}
                  disabled={isLoading || products.length === 0}
                  onChange={onServerFilterChange}
                >
                  <option value="">All Servers</option>
                  <option value="nidas">Nidas</option>
                  <option value="rushu">Rushu</option>
                </select>
              )}
          </div>
          <div className="filters-field">
            <span>Game Asset</span>
            <br />
            <br />
            {products.length === 0 && isLoading ? (
              <h5 className="text-subtle">Loading Filter</h5>
            ) : (
                <select
                  className="filters-brand"
                  value={field.asset}
                  disabled={isLoading || products.length === 0}
                  onChange={onAssetFilterChange}
                >
                  <option value="">All Game Assets</option>
                  <option value="kamas">Kamas</option>
                  <option value="account">Account</option>
                </select>
              )}
          </div>
        </>
        : null}


      <div className="filters-field">
        <span>Price Range</span>
        <br />
        <br />
        {(products.length === 0 && isLoading) || max === 0 ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : products.length === 1 ? (
          <h5 className="text-subtle">No Price Range</h5>
        ) : (
              <PriceRange
                min={min}
                max={max}
                initMin={field.minPrice}
                initMax={field.maxPrice}
                isLoading={isLoading}
                onPriceChange={onPriceChange}
                productsCount={products.length}
              />
            )}
      </div>
      <div className="filters-field">
        <span>Country</span>
        <br />
        <br />
        {products.length === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
            <CountryDropdown
              disabled
              className="filters-brand"
              defaultOptionLabel='Morocco'
              value={'Morocco'}
              onChange={val => onCountryFilterChange(val)}
            />
          )}
      </div>
      <div className="filters-field">
        <span>City</span>
        <br />
        <br />
        {products.length === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
            <RegionDropdown
              country={'Morocco'}
              className="filters-brand"
              value={field.city}
              onChange={val => onCityFilterChange(val)} />
          )}
      </div>
      <div className="filters-action">
        <button
          className="filters-button button button-small"
          disabled={isLoading || products.length === 0}
          onClick={onApplyFilter}
          type="button"
        >
          Apply filters
        </button>
        <button
          className="filters-button button button-border button-small"
          disabled={isLoading || products.length === 0}
          onClick={onResetFilter}
          type="button"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

Filters.propTypes = {
  closeModal: PropType.func.isRequired
};

export default withRouter(Filters);
