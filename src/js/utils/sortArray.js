/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

function countDubl(array) {
  const newArray = array.reduce((result, item) => {
    if (result[item.keyword] === undefined) {
      result[item.keyword] = 0;
    }
    result[item.keyword]++;
    return result;
  }, {});

  return newArray;
};

export default function sortArray(array) {
  const newArray = countDubl(array)
  const finalArray = Object.keys(newArray).map(i => ({
    keyword: i,
    count: newArray[i],
  })).sort((a, b) => b.count - a.count);

  return finalArray;
}
