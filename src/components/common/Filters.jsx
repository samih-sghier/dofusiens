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
    const filterFields = ['category', 'game', 'asset', 'server', 'country', 'city', 'minPrice', 'maxPrice', 'sortBy'];

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
                {/* <option value="dofus touch">Dofus Touch</option> */}
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
                  <option value="Agride">Agride</option>
                  <option value="Atcham">Atcham</option>
                  <option value="Boune">Boune</option>
                  <option value="Brumen">Brumen</option>
                  <option value="Crail">Crail</option>
                  <option value="Crocabulia">Crocabulia</option>
                  <option value="Dagob">Dagob</option>
                  <option value="Domo">Domo</option>
                  <option value="Echo">Echo</option>
                  <option value="Eratz">Eratz</option>
                  <option value="Furye">Furye</option>
                  <option value="Galgarion">Galgarion</option>
                  <option value="Henual">Henual</option>
                  <option value="Hoskar">Hoskar</option>
                  <option value="Hulhu">Hulhu</option>
                  <option value="Ilyzaelle">Ilyzaelle</option>
                  <option value="Jahash">Jahash</option>
                  <option value="Julith">Julith</option>
                  <option value="Meriana">Meriana</option>
                  <option value="Merkator">Merkator</option>
                  <option value="Muta">Muta</option>
                  <option value="Nidas">Nidas</option>
                  <option value="Ombre">Ombre</option>
                  <option value="Oto Mustam">Oto Mustam</option>
                  <option value="Pandore">Pandore</option>
                  <option value="Pikmi">Pikmi</option>
                  <option value="Rubilax">Rubilax</option>
                  <option value="Sak">Sak</option>
                  <option value="Ultram">Ultram</option>
                  <option value="Ush">Ush</option>
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
                  <option value="Kamas">Kamas</option>
                  <option value="Item">Item</option>
                  <option value="Account">Account</option>
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
            <select
              className="filters-brand"
              value={field.city}
              disabled={isLoading || products.length === 0}
              onChange={onCityFilterChange}
            >
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
