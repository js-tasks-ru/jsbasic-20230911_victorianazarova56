function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    let result = 1;
    while (n > 1) {
      result *= n;
      --n;
    }
    return result;
  }
}
