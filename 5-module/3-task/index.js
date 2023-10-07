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

/*
1. Узнать ширину элемента. (Нужно получить DOM элемент класса карусели).
2. Нужно получить DOM элементы кнопок внутри карусели.
3. Привязать обработчик событий к полученым DOM элементам кнопкам.
4. Нам нужно сделать так, что если мы нажимаем на левую кнопку, то слайд сдвигается влево на длину элемента, а и так же на правую кнопку.
5.
*/