function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  button.addEventListener('click', () => {
    const text = document.getElementById('text');
    const isHidden = text.hasAttribute('hidden');
    if (isHidden) {
      text.removeAttribute('hidden');
    } else {
      text.setAttribute('hidden', '');
    }
  });
}