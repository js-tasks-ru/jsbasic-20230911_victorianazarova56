function camelize(str) {
  let result = str.split('-')
  .map((item, index) => index > 0 ? item.slice(0, 1).toUpperCase() + item.slice(1) : item)
  .join('');
  return result;
}