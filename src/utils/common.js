export const parseDataByCategory = (data) => {
  //if(!data) { return {}; }

  return data.reduce((acc, item) => {
    // Check if the category already exists in the accumulator object
    if (!acc[item.category]) {
      acc[item.category] = [];  // Initialize an empty array for this category
    }
    acc[item.category].push(item);  // Add the current item to the appropriate category
    return acc;
  }, {});
}

export const parseDataByObjectKey = (data, key) => {
  if(!data) { return {}; }

  return data.reduce((acc, item) => {
    // Check if the category already exists in the accumulator object
    if (!acc[item[key]]) {
      acc[item[key]] = [];  // Initialize an empty array for this category
    }
    acc[item[key]].push(item);  // Add the current item to the appropriate category
    return acc;
  }, {});
}

export const compareArraysByName = (array1, array2) => {
  const names1 = new Set(array1.map(item => item.name));
  const names2 = new Set(array2.map(item => item.name));

  return {
    onlyInArray1: array1.filter(item => !names2.has(item.name)),
    onlyInArray2: array2.filter(item => !names1.has(item.name)),
    commonItems: array1.filter(item => names2.has(item.name))
  };
};

export const convertAllProductsToColourArray = (products) => {
    let result = [];

    for (const productId in products) {
        const product = products[productId];
        const productName = product.name;

        for (const colorKey in product.colors) {
            const color = product.colors[colorKey];

            for (const attrKey in color) {
                if (attrKey === "name" || attrKey === "image") continue;

                const attribute = color[attrKey];
                result.push({
                    id_product: product.id_product,
                    product_name: productName,
                    color_name: color.name,
                    color_image: color.image,
                    id_product_attribute: attribute.id_product_attribute,
                    price: attribute.price,
                    weight: attribute.weight,
                    m2: attribute.m2,
                    visible: true
                });
            }
        }
    }

    return result;
}

export const getDefaultPallet = (data) => {
  const result = {};

  data.forEach(pallet => {
    const title = pallet.title;
    const palletResult = [];

    const productEntries = Object.values(pallet.colors || {});

    productEntries.forEach(product => {
      const productName = product.name;
      const id_product = product.id_product;

      const colorEntries = Object.values(product.colors || {});

      colorEntries.forEach(color => {
        const colorName = color.name;
        const colorImage = color.image;

        // Iterate through values in color object to find attributes
        Object.values(color).forEach(value => {
          if (typeof value === 'object' && value.id_product_attribute) {
            palletResult.push({
              id_product,
              product_name: productName,
              color_name: colorName,
              color_image: colorImage,
              id_product_attribute: value.id_product_attribute,
              price: value.price,
              weight: value.weight,
              m2: value.m2,
              visible: true
            });
          }
        });
      });
    });

    result[title] = palletResult;
  });

  return result;
};


export const truncateToTwoDecimals = (num) => {
  return Math.ceil(num * 100) / 100;
}