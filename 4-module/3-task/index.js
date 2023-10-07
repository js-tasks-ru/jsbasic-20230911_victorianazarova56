function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    const dataValue = table.rows[i].cells[3].getAttribute('data-available');
    if (dataValue === 'true') {
      table.rows[i].classList.add('available');
    } else if (dataValue === 'false') {
      table.rows[i].classList.add('unavailable');
    } else {
      table.rows[i].setAttribute('hidden', '');
    }
    const gender = table.rows[i].cells[2].textContent;
    if (gender === 'm') {
      table.rows[i].classList.add('male');
    } else {
      table.rows[i].classList.add('female');
    }
    const age = parseInt(table.rows[i].cells[1].textContent);
    if (age < 18) {
      table.rows[i].style.textDecoration = 'line-through';
    }
  }
}