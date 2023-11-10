import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  modal = createElement(`
  <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title" />
      </div>
      <div class="modal__body" />
    </div>
  </div>`);

  constructor() {
    this.modal.querySelector('.modal__close').addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    });
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    this.modal.querySelector('.modal__body').innerHTML = "";
    this.modal.querySelector('.modal__body').append(node);
  }

  open() {
    document.querySelector('body').append(this.modal);
    document.querySelector('body').classList.add('is-modal-open');
  }

  close() {
    document.querySelector('.modal')?.remove();
    document.querySelector('body').classList.remove('is-modal-open');
  }
}
