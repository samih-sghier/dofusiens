/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
export const selectFilter = (products, filter) => {
  if (!products || products.length === 0) return [];

  const keyword = filter.keyword.toLowerCase();

  return products.filter((product) => {
    const isInRange = filter.maxPrice
      ? (product.price >= filter.minPrice && product.price <= filter.maxPrice)
      : true;
    const matchKeyword = product.keywords ? product.keywords.includes(keyword) : true;
    // const matchName = product.name ? product.name.toLowerCase().includes(keyword) : true;
    const matchDescription = product.description
      ? product.description.toLowerCase().includes(keyword)
      : true;
    const matchBrand = product.category ? product.category.toLowerCase().includes(filter.category) : true;
    const matchGame = product.game ? product.game.toLowerCase().includes(filter.game) : true;
    const matchServer = product.server ? product.server.toLowerCase().includes(filter.server) : true;
    const matchAsset = product.gameAsset ? product.gameAsset.toLowerCase().includes(filter.asset) : true;
    
    return ((matchKeyword || matchDescription) && matchBrand && matchGame && matchServer && matchAsset && isInRange);
  }).sort((a, b) => {
    if (filter.sortBy === 'name-desc') {
      return a.name < b.name ? 1 : -1;
    } else if (filter.sortBy === 'name-asc') {
      return a.name > b.name ? 1 : -1;
    } else if (filter.sortBy === 'price-desc') {
      return a.price < b.price ? 1 : -1;
    }

    return a.price > b.price ? 1 : -1;
  });
};

// Select product with highest price
export const selectMax = (products) => {
  if (!products || products.length === 0) return 0;

  let high = products[0];

  for (let i = 0; i < products.length; i++) {
    if (products[i].price > high.price) {
      high = products[i];
    }
  }

  return Math.floor(high.price);
};

// Select product with lowest price
export const selectMin = (products) => {
  if (!products || products.length === 0) return 0;
  let low = products[0];

  for (let i = 0; i < products.length; i++) {
    if (products[i].price < low.price) {
      low = products[i];
    }
  }

  return Math.floor(low.price);
};
