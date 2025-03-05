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

export const compareArraysByName = (array1, array2) => {
  const names1 = new Set(array1.map(item => item.name));
  const names2 = new Set(array2.map(item => item.name));

  return {
    onlyInArray1: array1.filter(item => !names2.has(item.name)),
    onlyInArray2: array2.filter(item => !names1.has(item.name)),
    commonItems: array1.filter(item => names2.has(item.name))
  };
};