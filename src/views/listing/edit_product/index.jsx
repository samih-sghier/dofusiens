import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useProduct, useScrollTop } from 'hooks';
import PropType from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { editProduct } from 'redux/actions/productActions';
import { displayActionMessage } from 'helpers/utils';

const ProductForm = lazy(() => import('../components/ProductForm'));

const EditProduct = ({ match }) => {
  useDocumentTitle('Edit Product | Dragoturkey');
  useScrollTop();
  const { product, error, isLoading } = useProduct(match.params.id);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const onSubmitForm = (updates) => {
    if (product && profile && product.ownerId == profile.id) {
      dispatch(editProduct(product.id, updates));
    } else {
      displayActionMessage("Error Updating Listing!", 'error');
      <Redirect to="/"/>
    }
  };

  return (
    <div className="checkout">

      <div className="product-form-container">
        {error && <Redirect to="/" />}
        <h2>Edit Product</h2>
        {product && (
          <Suspense fallback={(
            <div className="loader" style={{ minHeight: '80vh' }}>
              <h6>Loading ... </h6>
              <br />
              <LoadingOutlined />
            </div>
          )}
          >
            <ProductForm
              isLoading={isLoading}
              onSubmit={onSubmitForm}
              product={product}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

EditProduct.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string
    })
  }).isRequired
};

export default withRouter(EditProduct);
