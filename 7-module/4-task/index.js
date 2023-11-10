import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    const initialPercentage = value / steps * 100;

    const sliderSteps = Array.from({length: steps}, ((_, id) => {
      return createElement(`<span class="${value === id ? 'slider__step-active' : ''}"></span>`);
    }));

    const slider = createElement(`
        <div class="slider">
        <div class="slider__thumb" style="left: ${initialPercentage}%;">
          <span class="slider__value">${value}</span>
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

      this.elem.querySelector('.slider__value').textContent = value.toString();
      this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
      this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;

      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: value,
        bubbles: true,
      }));

      this.value = value;
    });

    slider.querySelector('.slider__thumb').onpointerdown = function(event) {
      event.preventDefault();

      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', onMouseUp);

      function onMouseMove(event) {
        slider.classList.add('slider_dragging');
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;

        slider.querySelector('.slider__thumb').style.left = `${leftPercents}%`;
        slider.querySelector('.slider__progress').style.width = `${leftPercents}%`;

        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);
        slider.querySelector('.slider__value').textContent = value.toString();
        this.value = value;
      }

      function onMouseUp(event) {
        slider.classList.remove('slider_dragging');
        slider.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        }));
        document.removeEventListener('pointerup', onMouseUp);
        document.removeEventListener('pointermove', onMouseMove);
      }

    };
    slider.querySelector('.slider__thumb').ondragstart = () => false;
    this.elem = slider;
  }
}
