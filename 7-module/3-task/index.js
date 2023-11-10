import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({steps, value = 0}) {
    this.value = value;
    this.steps = steps;
    const initialPercentage = value / steps * 100;

    const sliderSteps = Array.from({length: steps}, ((_, id) => {
      return createElement(`<span class="${value === id ? 'slider__step-active' : ''}"></span>`);
    }));

    const slider = createElement(`
        <div class="slider">
        <div class="slider__thumb" style="left: ${initialPercentage}%;">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width: ${initialPercentage}%;"></div>
        <div class="slider__steps" />
      </div>`);


    slider.querySelector('.slider__steps').append(...sliderSteps);
    slider.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;

      slider.querySelector('.slider__value').textContent = value.toString();
      slider.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
      slider.querySelector('.slider__progress').style.width = `${valuePercents}%`;

      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: value,
        bubbles: true,
      }));
    });

    this.elem = slider;
  }
}
