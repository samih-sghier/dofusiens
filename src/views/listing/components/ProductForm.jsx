/* eslint-disable jsx-a11y/label-has-associated-control */
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { ImageLoader } from 'components/common';
import {
  Select,
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
import {
  brandOptions, game, gameAsset, community,
  brazilServers, retroServers, frenchServers, spanishServers,
  internationalServers, payments
} from 'helpers/utils';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';



const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required.')
    .max(60, 'Product name must only be less than 60 characters.'),
  category: Yup.string()
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
  isFeatured: Yup.boolean(),
  isRecommended: Yup.boolean(),
  paymentMethods: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please add an acceptable payment method for this product.'),
  country: Yup.string()
    .required('Country is required.'),



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
    category: product?.category || '',
    game: product?.game || '',
    gameAsset: product?.gameAsset || '',
    server: product?.server || '',
    community: product?.community || '',
    price: product?.price || 0,
    maxQuantity: product?.maxQuantity || 0,
    description: product?.description || '',
    keywords: product?.keywords || [],
    isFeatured: product?.isFeatured || false,
    isRecommended: product?.isRecommended || false,
    // availableColors: product?.availableColors || [],
    paymentMethods: product?.paymentMethods || [],
    country: product?.country || 'Morocco',
    city: product?.city || '',
    currency: product?.currency || 'MAD'
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
    switch (com) {
      case 'French':
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
                    label="* Title"
                    placeholder="Selling Dofus Vulbis"
                    style={{ textTransform: 'capitalize' }}
                    component={CustomInput}
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.category, value: values.category }}
                    name="category"
                    iid="category"
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
                    label="* Price (MAD)"
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
                    defaultValue={values.paymentMethods.map((key) => ({ value: key, label: key }))}
                    name="paymentMethods"
                    iid="paymentMethods"
                    isMulti
                    options={payments}
                    disabled={isLoading}
                    placeholder="Select Acceptable Payment Methods"
                    label="* Acceptable Payment Methods"
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
                  <h5 className="d-flex-grow-1 margin-1">
                    &nbsp;* Country&nbsp;
                    </h5>
                  <CountryDropdown
                    disabled
                    defaultOptionLabel='Morocco'
                    value={'Morocco'}
                    onChange={(val) => setValues({ ...values, country: val })}
                  />
                </div>
                &nbsp;
                {values.country && (
                  <div className="product-form-field">
                    <h5 className="d-flex-grow-1 margin-1">
                      &nbsp;* Region&nbsp;
                    </h5>
                    <select>
                      <option value="">All</option>
                      <option value="Agadir">Agadir</option>
                      <option value="Ain Harrouda">Ain Harrouda</option>
                      <option value="Al Hoceima">Al Hoceima</option>
                      <option value="Azrou">Azrou</option>
                      <option value="Aït Melloul">Aït Melloul</option>
                      <option value="Ben Guerir">Ben Guerir</option>
                      <option value="Beni Ansa">Beni Ansa</option>
                      <option value="Beni Mellal">Beni Mellal</option>
                      <option value="Benslimane">Benslimane</option>
                      <option value="Berkane">Berkane</option>
                      <option value="Berrechid">Berrechid</option>
                      <option value="Bouskoura">Bouskoura</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Dar Bouazza">Dar Bouazza</option>
                      <option value="Dcheira El Jihadia">Dcheira El Jihadia</option>
                      <option value="Drargua">Drargua</option>
                      <option value="El Jadida">El Jadida</option>
                      <option value="El Kelaa Des Sraghna">El Kelaa Des Sraghna</option>
                      <option value="Errachidia">Errachidia</option>
                      <option value="Essaouira">Essaouira</option>
                      <option value="Fez">Fez</option>
                      <option value="Fnideq">Fnideq</option>
                      <option value="Fquih Ben Salah">Fquih Ben Salah</option>
                      <option value="Guelmim">Guelmim</option>
                      <option value="Guerci">Guerci</option>
                      <option value="Inezgane">Inezgane</option>
                      <option value="Kenitra">Kenitra</option>
                      <option value="Khemisset">Khemisset</option>
                      <option value="Khenifra">Khenifra</option>
                      <option value="Khouribga">Khouribga</option>
                      <option value="Ksar El Kebir">Ksar El Kebir</option>
                      <option value="Lahraouyine">Lahraouyine</option>
                      <option value="Larache">Larache</option>
                      <option value="Lqliaa">Lqliaa</option>
                      <option value="M'diq">M'diq</option>
                      <option value="Marrakesh">Marrakesh</option>
                      <option value="Martil">Martil</option>
                      <option value="Meknes">Meknes</option>
                      <option value="Midelt">Midelt</option>
                      <option value="Mohammedia">Mohammedia</option>
                      <option value="Nador">Nador</option>
                      <option value="Ouarzazate">Ouarzazate</option>
                      <option value="Ouazzane">Ouazzane</option>
                      <option value="Oued Zem">Oued Zem</option>
                      <option value="Oujda">Oujda</option>
                      <option value="Oulad Teima">Oulad Teima</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Safi">Safi</option>
                      <option value="Salé">Salé</option>
                      <option value="Sefrou">Sefrou</option>
                      <option value="Settat">Settat</option>
                      <option value="Sidi Bennour">Sidi Bennour</option>
                      <option value="Sidi Kacem">Sidi Kacem</option>
                      <option value="Sidi Slimane">Sidi Slimane</option>
                      <option value="Skhirat">Skhirat</option>
                      <option value="Souk El Arbaa">Souk El Arbaa</option>
                      <option value="Suq as-Sabt Awlad an-Nama">Suq as-Sabt Awlad an-Nama</option>
                      <option value="Tan-Tan">Tan-Tan</option>
                      <option value="Tangier">Tangier</option>
                      <option value="Taourirt">Taourirt</option>
                      <option value="Taroudant">Taroudant</option>
                      <option value="Taza">Taza</option>
                      <option value="Temara">Temara</option>
                      <option value="Tetouan">Tetouan</option>
                      <option value="Tifelt">Tifelt</option>
                      <option value="Tiznit">Tiznit</option>
                      <option value="Youssoufia">Youssoufia</option>
                    </select>



                  </div>)}
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
    category: PropType.string,
    gameAsset: PropType.string,
    game: PropType.string,
    community: PropType.string,
    server: PropType.string,
    price: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    paymentMethods: PropType.arrayOf(PropType.string),
    country: PropType.string,
    city: PropType.string,
    currency: PropType.string
    //availableColors: PropType.arrayOf(PropType.string)
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired
};

export default ProductForm;
