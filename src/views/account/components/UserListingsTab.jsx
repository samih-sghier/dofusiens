
/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from 'components/common';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from 'selectors/selector';
import ProductsTable from 'views/account/components/ProductsTable';
import UserProductList from 'components/product/UserProductList';

const UserListingsTab = () => {
  useDocumentTitle('My Listings');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredProducts: state.products.userItems,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    products: state.products
  }));

  return (
    <>
      {store.filteredProducts.length >= 0 ?
        <div className="product-admin-items">
          <UserProductList {...store}>
            <ProductsTable filteredProducts={store.filteredProducts} />
          </UserProductList>
        </div> :
        <div className="loader" style={{ minHeight: '80vh' }}>
          <h3>My Listings</h3>
          <strong><span className="text-subtle">You don&apos;t have any orders</span></strong>
        </div>
      }
    </>

  );
};

export default withRouter(UserListingsTab);