/* eslint-disable react/forbid-prop-types */
import { Boundary, MessageDisplay } from 'components/common';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { getUserProducts } from 'redux/actions/productActions';

const UserProductList = (props) => {
  const {
    products, filteredProducts, isLoading, requestStatus, children
  } = props;
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const fetchProducts = () => {
    setFetching(true);
    dispatch(getUserProducts(profile.id, products.lastUserRefKey));
  };

  useEffect(() => {
    if (products.userItems.length === 0 || !products.lastUserRefKey) {
      fetchProducts();
    }

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [products.lastUserRefKey]);

  if (filteredProducts.length === 0 && !isLoading) {
    return (
      <MessageDisplay message={requestStatus?.message || 'No Listings Found.'} />
    );
  } if (filteredProducts.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || 'Something went wrong :('}
        action={fetchProducts}
        buttonLabel="Try Again"
      />
    );
  }
  return (
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {products.userItems.length < products.userTotal && (
        <div className="d-flex-center padding-l">
          <button 
            className="button button-small"
            disabled={isFetching}
            onClick={fetchProducts}
            type="button"
          >
            {isFetching ? 'Fetching Items...' : 'Show More Items'}
          </button>
        </div>
      )}
    </Boundary>
  );
};

UserProductList.defaultProps = {
  requestStatus: null
};

UserProductList.propTypes = {
  products: PropType.object.isRequired,
  filteredProducts: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default UserProductList;

