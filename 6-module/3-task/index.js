import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    const slidesLayout = this.slides.map((slide) => {
      const slideDiv = createElement(`<div class="carousel__slide" data-id="penang-shrimp">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`);


      slideDiv.querySelector('.carousel__button').addEventListener('click', () => {
        slideDiv.dispatchEvent(new CustomEvent('product-add', {
          detail: slide.id, bubbles: true
        }));
      });

      return slideDiv;
    });


    const carousel = createElement(`<div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner"/></div>`);

    carousel.querySelector('.carousel__inner').append(...slidesLayout);

    const carouselArrowRight = carousel.querySelector('.carousel__arrow.carousel__arrow_right');
    const carouselArrowLeft = carousel.querySelector('.carousel__arrow.carousel__arrow_left');

    carouselArrowLeft.style.display = 'none';

    carouselArrowRight.addEventListener('click', () => {
      const carouselInner = carousel.querySelector('.carousel__inner');
      const carouselWidth = carouselInner.offsetWidth;
      const oldValue = Number(carouselInner.style.transform.replace(/\D+/g, ''));
      const newValue = oldValue + carouselWidth;
      carouselInner.style.transform = `translateX(-${newValue}px)`;
      if (newValue > 0) {
        carouselArrowLeft.style.display = '';
      }
      if (newValue === carouselWidth * (slides.length - 1)) {
        carouselArrowRight.style.display = 'none';
      }
    });

    carouselArrowLeft.addEventListener('click', () => {
      const carouselInner = carousel.querySelector('.carousel__inner');
      const carouselWidth = carouselInner.offsetWidth;
      const oldValue = Number(carouselInner.style.transform.replace(/\D+/g, ''));
      const newValue = oldValue - carouselWidth;
      carouselInner.style.transform = `translateX(-${newValue}px)`;
      if (newValue === 0) {
        carouselArrowLeft.style.display = 'none';
      }
      if (newValue < carouselWidth * (slides.length - 1)) {
        carouselArrowRight.style.display = '';
      }
    });

    this.elem = carousel;
  }
}
