import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { ColorChooser, ImageLoader, MessageDisplay } from 'components/common';
import { ProductShowcaseGrid } from 'components/product';
import { RECOMMENDED_PRODUCTS, SHOP, VIEW_PROFILE } from 'constants/routes';
import { displayMoney, paymentLogo } from 'helpers/utils';
import {
  useBasket,
  useDocumentTitle,
  useProduct,
  useRecommendedProducts,
  useScrollTop
} from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'redux/actions/userActions';

const ViewProduct = () => {
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const { addToBasket, isItemOnBasket } = useBasket(id);
  useScrollTop();
  useDocumentTitle(`View ${product?.name || 'Item'}`);
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const history = useHistory();

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useRecommendedProducts(6);
  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const onSelectedSizeChange = (newValue) => {
    setSelectedSize(newValue.value);
  };

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const handleAddToBasket = () => {
    addToBasket({ ...product });
  };

  return (
    <main className="content">
      {isLoading && (
        <div className="loader">
          <h4>Loading Product...</h4>
          <br />
          <LoadingOutlined style={{ fontSize: '3rem' }} />
        </div>
      )}
      {error && (
        <MessageDisplay message={error} />
      )}
      {(product && !isLoading) && (
        <div className="product-view">
          <Link to={SHOP}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; Back to shop
            </h3>
          </Link>
          <div className="product-modal">
            {product.imageCollection.length !== 0 && (
              <div className="product-modal-image-collection">
                {product.imageCollection.map((image) => (
                  <div
                    className="product-modal-image-collection-wrapper"
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    role="presentation"
                  >
                    <ImageLoader
                      className="product-modal-image-collection-img"
                      src={image.url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="product-modal-image-wrapper">
              {selectedColor && <input type="color" disabled ref={colorOverlay} id="color-overlay" />}
              <ImageLoader
                alt={product.name}
                className="product-modal-image"
                src={selectedImage}
              />
            </div>
            <div className="product-modal-details">
              <br />
              <span className="text-subtle">{product.brand}</span>
              <h1 className="margin-top-0">{product.name}</h1>
              <span>{product.description}</span>
              <br />
              <br />
              <div className="divider" />
              <br />
              Product Details
              <br />
              <br />
              {product.country && (
                <div>
                  <span className="text-subtle"><b>Country: <b>{product.country}</b></b></span>
                </div>
              )}
              <br />
              {product.city && (
                <div>
                  <span className="text-subtle"><b>City: <b>{product.city}</b></b></span>
                </div>
              )}
              <br />
              {product.category && (
                <div>
                  <span className="text-subtle"><b>Category: <b>{product.category}</b></b></span>
                </div>
              )}
              <br />
              {product.game && (
                <div>
                  <span className="text-subtle"><b>Game: <b>{product.game}</b></b></span>
                </div>
              )}
              <br />
              {product.gameAsset && (
                <div>
                  <span className="text-subtle"><b>Asset: <b>{product.gameAsset}</b></b></span>
                </div>
              )}
              <br />
              {product.community && (
                <div>
                  <span className="text-subtle"><b>Community: <b>{product.community}</b></b></span>

                </div>
              )}
              <br />
              {product.server && (
                <div>
                  <span className="text-subtle"><b>Server/Platform: <b>{product.server}</b></b></span>
                </div>
              )}
              <br />
              {product.keywords.length >= 1 && (
                <div>
                  <span className="text-subtle">Keywords: </span>
                  {product.keywords.map((size) => (<span>
                    #{size}
                  </span>))}
                </div>
              )}
              <br />
              <div className="divider" />
              {/* <div>
                <span className="text-subtle">Lens Width and Frame Size</span>
                <br />
                <br />
                <Select
                  placeholder="--Select Size--"
                  onChange={onSelectedSizeChange}
                  options={product.sizes.sort((a, b) => (a < b ? -1 : 1)).map((size) => ({ label: `${size} mm`, value: size }))}
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                />
              </div> */}
              <br />
              {/* {product.availableColors.length >= 1 && (
                <div>
                  <span className="text-subtle">Choose Color</span>
                  <br />
                  <br />
                  <ColorChooser
                    availableColors={product.availableColors}
                    onSelectedColorChange={onSelectedColorChange}
                  />
                </div>
              )} */}
              <div>
                Accepted Payments Methods
                <br />
                <br />
                {product.paymentMethods && product.paymentMethods.length >= 1 && (
                  <div className="logo-col-1">
                    {product.paymentMethods.map((method) => (
                      <div className="payment-logo-img-wrapper">
                        <img
                          alt=""
                          className="payment-logo-img"
                          src={paymentLogo(method)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <br />
              </div>
              <div className="divider" />
              <br />
              <div>
                Product Owner Details
                <br />
                <br />
                {product.ownerFullName && product.ownerId && (
                  <div className="logo-col-1">
                    <Link to={VIEW_PROFILE} onClick={() => {
                      dispatch(getUser(product.ownerId));

                      }} >
                      {product.ownerFullName}</Link>
                  </div>
                )}
                <br />
              </div>
              <div className="divider" />
              <br />
              <h1>{displayMoney(product.price)}</h1>
              <div className="product-modal-action">
                <button
                  className={`button button-small ${isItemOnBasket(product.id) ? 'button-border button-border-gray' : ''}`}
                  onClick={handleAddToBasket}
                  type="button"
                >
                  {isItemOnBasket(product.id) ? 'Remove From Basket' : 'Add To Basket'}
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '10rem' }}>
            <div className="display-header">
              <h1>Recommended</h1>
              <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
            </div>
            {errorFeatured && !isLoadingFeatured ? (
              <MessageDisplay
                message={error}
                action={fetchRecommendedProducts}
                buttonLabel="Try Again"
              />
            ) : (
                <ProductShowcaseGrid products={recommendedProducts} skeletonCount={3} />
              )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewProduct;
