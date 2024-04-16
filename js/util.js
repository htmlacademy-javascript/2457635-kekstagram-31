const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// eslint-disable-next-line no-unused-vars, arrow-body-style
const isEscapeKey = (evt) => {
// eslint-disable-next-line indent
return evt.key === 'Escape';
};
// eslint-disable-next-line arrow-body-style

export {getRandomInteger, createRandomIdFromRangeGenerator, isEscapeKey};
