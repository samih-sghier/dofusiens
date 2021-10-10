/* eslint-disable jsx-a11y/label-has-associated-control */
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { ImageLoader } from 'components/common';
import {
  CustomColorInput, CustomCreatableSelect, CustomInput, CustomTextarea
} from 'components/formik';
import {
  Field, FieldArray, Form, Formik
} from 'formik';
import { useFileHandler } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

// Default brand names that I used. You can use what you want
const brandOptions = [
  { value: 'Gaming', label: 'Gaming' }
];

const game = [
  { value: 'Dofus', label: 'Dofus' },
  { value: 'Dofus Touch', label: 'Dofus Touch' },
];

const gameAsset = [
  { value: 'Kamas', label: 'Kamas' },
  // { value: 'Items', label: 'Items' },
  // { value: 'Accounts', label: 'Accounts' },
];
const community = [
  { value: 'All', label: 'All' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Spanish', label: 'Espagnole' },
  { value: 'French', label: 'French' },
  { value: 'International', label: 'International' },
  { value: 'Retro 1.30', label: 'Retro 1.30' }
];

const brazilServers = [
  { value: 'All', label: 'All' },
  { value: 'Crocabulia', label: 'Crocabulia' }
];

const retroServers = [
  { value: 'All', label: 'All' },
  { value: 'Boune', label: 'Boune' },
  { value: 'Crail', label: 'Crail' },
  { value: 'Eratz', label: 'Eratz' },
  { value: 'Galgarion', label: 'Galgarion' },
  { value: 'Henual', label: 'Henual' }
];

const frenchServers = [
  { value: 'All', label: 'All' },
  { value: 'Agride', label: 'Agride' },
  { value: 'Brumen', label: 'Brumen' },
  { value: 'Furye', label: 'Furye' },
  { value: 'Julith', label: 'Julith' },
  { value: 'Meriana', label: 'Meriana' },
  { value: 'Merkator', label: 'Merkator' },
  { value: 'Nidas', label: 'Nidas' },
  { value: 'Pandore', label: 'Pandore' },
  { value: 'Ush', label: 'Ush' }
];

const spanishServers = [
  { value: 'All', label: 'All' },
  { value: 'Atcham', label: 'Atcham' },
  { value: 'Rubilax', label: 'Rubilax' }
];

const internationalServers = [
  { value: 'All', label: 'All' },
  { value: 'Dagob', label: 'Dagob' },
  { value: 'Domo', label: 'Domo' },
  { value: 'Echo', label: 'Echo' },
  { value: 'Hoskar', label: 'Hoskar' },
  { value: 'Hulhu', label: 'Hulhu' },
  { value: 'Ilyzaelle', label: 'Ilyzaelle' },
  { value: 'Jahash', label: 'Jahash' },
  { value: 'Muta', label: 'Muta' },
  { value: 'Ombre', label: 'Ombre' },
  { value: 'Oto Mustam', label: 'Oto Mustam' },
  { value: 'Pikmi', label: 'Pikmi' },
  { value: 'Sak', label: 'Sak' },
  { value: 'Ultram', label: 'Ultram' }
];


const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required.')
    .max(60, 'Product name must only be less than 60 characters.'),
  brand: Yup.string()
    .required('Brand name is required.'),
  game: Yup.string()
    .required('Game is required.'),
  community: Yup.string()
    .required('Community is required.'),
  server: Yup.string()
    .required('Server is required.'),
  gameAsset: Yup.string()
    .required('Game Asset is required.'),
  price: Yup.number()
    .positive('Price is invalid.')
    .integer('Price should be an integer.')
    .required('Price is required.'),
  description: Yup.string()
    .required('Description is required.'),
  maxQuantity: Yup.number()
    .positive('Max quantity is invalid.')
    .integer('Max quantity should be an integer.')
    .required('Max quantity is required.'),
  keywords: Yup.array()
    .of(Yup.string())
    .min(1, 'Please enter at least 1 keyword for this product.'),
  sizes: Yup.array()
    .of(Yup.number())
    .min(1, 'Please enter a size for this product.'),
  isFeatured: Yup.boolean(),
  isRecommended: Yup.boolean(),
  // availableColors: Yup.array()
  //   .of(Yup.string().required())
  //   .min(1, 'Please add a default color for this product.')
});

const ProductForm = ({ product, onSubmit, isLoading }) => {
  const profile = useSelector((state) => state.profile);
  const initFormikValues = {
    ownerId: profile.id,
    ownerFullName: profile.fullname,
    name: product?.name || '',
    brand: product?.brand || '',
    game: product?.game || '',
    gameAsset: product?.gameAsset || '',
    server: product?.server || '',
    community: product?.community || '',
    price: product?.price || 0,
    maxQuantity: product?.maxQuantity || 0,
    description: product?.description || '',
    keywords: product?.keywords || [],
    sizes: product?.sizes || [],
    isFeatured: product?.isFeatured || false,
    isRecommended: product?.isRecommended || false,
    availableColors: product?.availableColors || []
  };

  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage
  } = useFileHandler({ image: {}, imageCollection: product?.imageCollection || [] });

  const onSubmitForm = (form) => {
    if (imageFile.image.file || product.imageUrl || product.image) {
      onSubmit({
        ...form,
        quantity: 1,
        // due to firebase function billing policy, let's add lowercase version
        // of name here instead in firebase functions
        name_lower: form.name.toLowerCase(),
        dateAdded: new Date().getTime(),
        image: imageFile?.image?.file || product.imageUrl || product.image,
        imageCollection: imageFile.imageCollection
      });
    } else {
      // eslint-disable-next-line no-alert
      alert('Product thumbnail image is required.');
    }
  };

  const currentServer = (com) => {
    switch(com) {
      case 'French' :
        return frenchServers;
      case 'International':
        return internationalServers;
      case 'Brazil':
        return brazilServers;
      case 'Spanish':
        return spanishServers;
      case 'Retro 1.30':
        return retroServers;
      default:
        return [];
      }
  }

  return (
    <div>
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onSubmitForm}
      >
        {({ values, setValues }) => (
          <Form className="product-form">
            <div className="product-form-inputs">
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="name"
                    type="text"
                    label="* Product Name"
                    placeholder="Gago"
                    style={{ textTransform: 'capitalize' }}
                    component={CustomInput}
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.brand, value: values.brand }}
                    name="brand"
                    iid="brand"
                    options={brandOptions}
                    disabled={isLoading}
                    placeholder="Select Category"
                    label="* Category"
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.game, value: values.game }}
                    name="game"
                    iid="game"
                    options={game}
                    disabled={isLoading}
                    placeholder="Select Game"
                    label="* Game"
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.gameAsset, value: values.gameAsset }}
                    name="gameAsset"
                    iid="gameAsset"
                    options={gameAsset}
                    disabled={isLoading}
                    placeholder="Game Asset"
                    label="* Game Asset"
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.community, value: values.community }}
                    name="community"
                    iid="community"
                    options={community}
                    disabled={isLoading}
                    placeholder="Community"
                    label="* Community"
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.server, value: values.server }}
                    name="server"
                    iid="server"
                    options={currentServer(values.community)}
                    disabled={isLoading}
                    placeholder="Select Server"
                    label="* Server"
                  />
                </div>
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="description"
                  id="description"
                  rows={3}
                  label="* Product Description"
                  component={CustomTextarea}
                />
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="price"
                    id="price"
                    type="number"
                    label="* Price"
                    component={CustomInput}
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="maxQuantity"
                    type="number"
                    id="maxQuantity"
                    label="* Max Quantity"
                    component={CustomInput}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={values.keywords.map((key) => ({ value: key, label: key }))}
                    name="keywords"
                    iid="keywords"
                    isMulti
                    disabled={isLoading}
                    placeholder="Create/Select Keywords"
                    label="* Keywords"
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={values.sizes.map((key) => ({ value: key, label: key }))}
                    name="sizes"
                    iid="sizes"
                    type="number"
                    isMulti
                    disabled={isLoading}
                    placeholder="Create/Select Sizes"
                    label="* Sizes (Millimeter)"
                  />
                </div>
              </div>
              <div className="product-form-field">
                <span className="d-block padding-s">Image Collection</span>
                {!isFileLoading && (
                  <label htmlFor="product-input-file-collection">
                    <input
                      disabled={isLoading}
                      hidden
                      id="product-input-file-collection"
                      multiple
                      onChange={(e) => onFileChange(e, { name: 'imageCollection', type: 'multiple' })}
                      readOnly={isLoading}
                      type="file"
                    />
                    Choose Images
                  </label>
                )}
              </div>
              <div className="product-form-collection">
                <>
                  {imageFile.imageCollection.length >= 1 && (
                    imageFile.imageCollection.map((image) => (
                      <div
                        className="product-form-collection-image"
                        key={image.id}
                      >
                        <ImageLoader
                          alt=""
                          src={image.url}
                        />
                        <button
                          className="product-form-delete-image"
                          onClick={() => removeImage({ id: image.id, name: 'imageCollection' })}
                          title="Delete Image"
                          type="button"
                        >
                          <i className="fa fa-times-circle" />
                        </button>
                      </div>
                    ))
                  )}
                </>
              </div>
              <br />
              <div className="d-flex">
                <div className="product-form-field">
                  <input
                    checked={values.isFeatured}
                    className=""
                    id="featured"
                    onChange={(e) => setValues({ ...values, isFeatured: e.target.checked })}
                    type="checkbox"
                  />
                  <label htmlFor="featured">
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; Add to Featured &nbsp;
                    </h5>
                  </label>
                </div>
                <div className="product-form-field">
                  <input
                    checked={values.isRecommended}
                    className=""
                    id="recommended"
                    onChange={(e) => setValues({ ...values, isRecommended: e.target.checked })}
                    type="checkbox"
                  />
                  <label htmlFor="recommended">
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; Add to Recommended &nbsp;
                    </h5>
                  </label>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className="product-form-field product-form-submit">
                <button
                  className="button"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                  &nbsp;
                  {isLoading ? 'Saving Product' : 'Save Product'}
                </button>
              </div>
            </div>
            {/* ----THUBMNAIL ---- */}
            <div className="product-form-file">
              <div className="product-form-field">
                <span className="d-block padding-s">* Thumbnail</span>
                {!isFileLoading && (
                  <label htmlFor="product-input-file">
                    <input
                      disabled={isLoading}
                      hidden
                      id="product-input-file"
                      onChange={(e) => onFileChange(e, { name: 'image', type: 'single' })}
                      readOnly={isLoading}
                      type="file"
                    />
                    Choose Image
                  </label>
                )}
              </div>
              <div className="product-form-image-wrapper">
                {(imageFile.image.url || product.image) && (
                  <ImageLoader
                    alt=""
                    className="product-form-image-preview"
                    src={imageFile.image.url || product.image}
                  />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ProductForm.propTypes = {
  product: PropType.shape({
    ownerId: PropType.string,
    ownerFullName: PropType.string,
    name: PropType.string,
    brand: PropType.string,
    gameAsset: PropType.string,
    game: PropType.string,
    community: PropType.string,
    server: PropType.string,
    price: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    //availableColors: PropType.arrayOf(PropType.string)
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired
};

export default ProductForm;
