function showSalary(users, age) {
  let result = users
    .filter(user => user.age <= age)
    .map((user, index, array) => index < array.length - 1 ? `${user.name}, ${user.balance}\n` : `${user.name}, ${user.balance}`)
    .join('');
  return result;
}
