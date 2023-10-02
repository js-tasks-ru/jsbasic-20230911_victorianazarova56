function getMinMax(str) {
  let result = str.split(' ').filter(symbol => !isNaN(Number(symbol)));
  const minValue = Math.min(...result);
  const maxValue = Math.max(...result);
  return {
    min: minValue,
    max: maxValue
  };
}
