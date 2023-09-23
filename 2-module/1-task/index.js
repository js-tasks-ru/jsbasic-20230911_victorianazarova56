let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
};

function sumSalary(salariesObj) {
  let sum = 0;
  for (let key in salariesObj) {
    if (Number.isFinite(salariesObj[key])) {
      sum = sum + salariesObj[key];
    }
  }
  console.log(sum);
  return sum;
}

sumSalary(salaries);