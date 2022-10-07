// Get Ref
const ref = {
  boxItems: document.querySelector('.gallery'),
  backDrop: document.querySelector('.modal__backdrop'),
  buttonCloseModal: document.querySelector('.close-modal'),
  test: document.querySelector('.modal__backdrop.is-hidden .modal__window'),
};

// Add event listener for open
ref.boxItems.addEventListener('click', onClickEvent);

// Open modal window
function onClickEvent(e) {
  if (!e.target.classList.contains('item')) return;

  // Show modal window
  ref.backDrop.classList.toggle('is-hidden');

  // Add event listener for close modal window
  window.addEventListener('keydown', onKeydownESC);
  ref.buttonCloseModal.addEventListener('click', onClickButtonClose);
  ref.backDrop.addEventListener('click', OnClickBackDrop);
}

// Close modal window after press ESC
function onKeydownESC(e) {
  if (e.code === 'Escape') {
    ref.backDrop.classList.toggle('is-hidden');
    window.removeEventListener('keydown', onKeydownESC);
    ref.buttonCloseModal.removeEventListener('click', onClickButtonClose);
    ref.backDrop.removeEventListener('click', OnClickBackDrop);
  }
}

// Close modal window after click button
function onClickButtonClose() {
  ref.backDrop.classList.toggle('is-hidden');
  window.removeEventListener('keydown', onKeydownESC);
  ref.buttonCloseModal.removeEventListener('click', onClickButtonClose);
  ref.backDrop.removeEventListener('click', OnClickBackDrop);
}

// Close modal window after click on backdrop
function OnClickBackDrop(e) {
  if (e.target === ref.backDrop) {
    ref.backDrop.classList.toggle('is-hidden');
    window.removeEventListener('keydown', onKeydownESC);
    ref.buttonCloseModal.removeEventListener('click', onClickButtonClose);
    ref.backDrop.removeEventListener('click', OnClickBackDrop);
  }
}

// Get value from element
function getValue(element) {
  const modalInfo = {
    info: element.dataset.info,
    time: element.dataset.time,
    place: element.dataset.place,
    author: element.dataset.author,
    price: element.dataset.price,
  };

  return modalInfo;
}
