/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from 'components/common';
import { AppliedFilters, ReviewsList, ProductList } from 'components/product';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from 'selectors/selector';
import { ProductsNavbar } from '../components';
import ProductsTable from '../components/ProductsTable';

const Products = () => {
  useDocumentTitle('User Reviews');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    products: state.products,
    reviews: state.reviews,
    users: state.reviews.users
  }));

  return (
    <Boundary>
      <div className="product-admin-items">
        <ProductsNavbar
          productsCount={store.reviews.total}
          totalProductsCount={store.reviews.total}
        />
        <ReviewsList {...store}>
          {/* <AppliedFilters filter={store.filter} /> */}
          <ProductsTable filteredProducts={store.users} />
        </ReviewsList>
      </div>
    </Boundary>
  );
};

export default withRouter(Products);
