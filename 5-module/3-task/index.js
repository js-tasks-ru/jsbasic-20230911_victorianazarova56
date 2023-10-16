function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselWidth = carouselInner.offsetWidth;

  const carouselArrowRight = document.querySelector('.carousel__arrow.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow.carousel__arrow_left');

  carouselArrowLeft.style.display = 'none';

  carouselArrowRight.addEventListener('click', () => {
    const oldValue = Number(carouselInner.style.transform.replace(/\D+/g, ''));
    const newValue = oldValue + carouselWidth;
    carouselInner.style.transform = `translateX(-${newValue}px)`;    
    if (newValue > 0) {
      carouselArrowLeft.style.display = '';
    } 
    if (newValue === carouselWidth * 3) {
      carouselArrowRight.style.display = 'none';
    }
  });

  carouselArrowLeft.addEventListener('click', () => {
    const oldValue = Number(carouselInner.style.transform.replace(/\D+/g, ''));
    const newValue = oldValue - carouselWidth;
    carouselInner.style.transform = `translateX(-${newValue}px)`;
    if (newValue === 0) {
      carouselArrowLeft.style.display = 'none';
    } 
    if (newValue < carouselWidth * 3) {
      carouselArrowRight.style.display = '';
    }
  });
}
