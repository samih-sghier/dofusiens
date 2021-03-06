/* eslint-disable no-nested-ternary */
import { CloseCircleOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { applyFilter } from 'redux/actions/filterActions';

const ProductAppliedFilters = ({ filteredProductsCount }) => {
  const filter = useSelector((state) => state.filter, shallowEqual);
  const fields = ['category', 'asset', 'game', 'server', 'minPrice', 'country', 'city', 'maxPrice', 'sortBy', 'keyword'];
  const isFiltered = fields.some((key) => !!filter[key]);
  const dispatch = useDispatch();

  const onRemoveKeywordFilter = () => {
    dispatch(applyFilter({ keyword: '' }));
  };

  const onRemovePriceRangeFilter = () => {
    dispatch(applyFilter({ minPrice: 0, maxPrice: 0 }));
  };

  const onRemoveBrandFilter = () => {
    dispatch(applyFilter({ category: '', game: '', server: '', asset: '' }));
  };

  const onRemoveGameFilter = () => {
    dispatch(applyFilter({ game: '', server: '', asset: '' }));
  };

  const onRemoveServerFilter = () => {
    dispatch(applyFilter({ server: '' }));
  };

  const onRemoveAssetFilter = () => {
    dispatch(applyFilter({ asset: '' }));
  };

  const onRemoveSortFilter = () => {
    dispatch(applyFilter({ sortBy: '' }));
  };

  const onRemoveCountryFilter = () => {
    dispatch(applyFilter({ country: '', city: '' }));
  };

  const onRemoveCityFilter = () => {
    dispatch(applyFilter({ city: '' }));
  };

  return !isFiltered ? null : (
    <>
      <div className="product-list-header">
        <div className="product-list-header-title">
          <h5>
            {filteredProductsCount > 0
              && `Found ${filteredProductsCount} ${filteredProductsCount > 1 ? 'products' : 'product'}`}
          </h5>
        </div>
      </div>
      <div className="product-applied-filters">
        {filter.keyword && (
          <div className="pill-wrapper">
            <span className="d-block">Keyword</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{filter.keyword}</h5>
              <div className="pill-remove" onClick={onRemoveKeywordFilter} role="presentation">
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {filter.country && (
          <div className="pill-wrapper">
            <span className="d-block">Country</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{filter.country}</h5>
              <div className="pill-remove" onClick={onRemoveCountryFilter} role="presentation">
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}

        {filter.city && (
          <div className="pill-wrapper">
            <span className="d-block">City</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{filter.city}</h5>
              <div className="pill-remove" onClick={onRemoveCityFilter} role="presentation">
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {filter.category && (
          <div className="pill-wrapper">
            <span className="d-block">Category</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{filter.category}</h5>
              <div className="pill-remove" onClick={onRemoveBrandFilter} role="presentation">
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {filter.game && (
          <div className="pill-wrapper">
            <span className="d-block">Game</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{filter.game}</h5>
              <div className="pill-remove" onClick={onRemoveGameFilter} role="presentation">
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}

        {filter.server && (
          <div className="pill-wrapper">
            <span className="d-block">Server</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{filter.server}</h5>
              <div className="pill-remove" onClick={onRemoveServerFilter} role="presentation">
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}


        {filter.asset && (
          <div className="pill-wrapper">
            <span className="d-block">Asset</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{filter.asset}</h5>
              <div className="pill-remove" onClick={onRemoveAssetFilter} role="presentation">
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}

        {(!!filter.minPrice || !!filter.maxPrice) && (
          <div className="pill-wrapper">
            <span className="d-block">Price Range</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">
                $
                {filter.minPrice}
                - $
                {filter.maxPrice}
              </h5>
              <div
                className="pill-remove"
                onClick={onRemovePriceRangeFilter}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {filter.sortBy && (
          <div className="pill-wrapper">
            <span className="d-block">Sort By</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">
                {filter.sortBy === 'price-desc'
                  ? 'Price High - Low'
                  : filter.sortBy === 'price-asc'
                    ? 'Price Low - High'
                    : filter.sortBy === 'name-desc'
                      ? 'Name Z - A'
                      : 'Name A - Z'}
              </h5>
              <div
                className="pill-remove"
                onClick={onRemoveSortFilter}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

ProductAppliedFilters.defaultProps = {
  filteredProductsCount: 0
};

ProductAppliedFilters.propTypes = {
  filteredProductsCount: PropType.number
};

export default ProductAppliedFilters;
