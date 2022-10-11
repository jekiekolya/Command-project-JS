// Get Ref
const ref = {
  boxItems: document.querySelector('.gallery'),
  backDrop: document.querySelector('.modal__backdrop'),
  buttonCloseModal: document.querySelector('.modal-btn__close'),
  buttonMoreLoad: document.querySelector('.modal__btn-more'),
  inputResearch: document.querySelector('.input-text'),
  buttonSubmit: document.querySelector('.button'),
};

// Get ref to element on window where textContent is changing
const refWindow = {
  info: document.querySelector('.modal-info'),
  data: document.querySelector('.event-date'),
  time: document.querySelector('.event-time'),
  timezone: document.querySelector('.event-timezone'),
  city: document.querySelector('.event-city'),
  country: document.querySelector('.event-country'),
  address: document.querySelector('.event-location'),
  name: document.querySelector('.event-name'),
  price1: document.querySelector('.price1'),
  price1Type: document.querySelector('.price1__type'),
  price1Currency: document.querySelector('.price1__currency'),
  price1Range: document.querySelector('.price1__range'),
  price2: document.querySelector('.price2'),
  price2Type: document.querySelector('.price2__type'),
  price2Currency: document.querySelector('.price2__currency'),
  price2Range: document.querySelector('.price2__range'),

  imageBig: document.querySelector('.modal__img-big'),
  imageLittle: document.querySelector('.modal__img-small'),
};

// Add event listener for open
ref.boxItems.addEventListener('click', onClickEvent);

// Open modal window
function onClickEvent(e) {
  e.preventDefault();
  if (!e.target.closest('.gallery-link')) return;
  let item = e.target.closest('.gallery-link');

  // Get value from item and put them to window
  let values = getValue(item);
  console.log(values);
  inputDataToWindow(values);

  // Show modal window
  ref.backDrop.classList.toggle('is-hidden');

  // Add event listener for close modal window
  window.addEventListener('keydown', onKeydownESC);
  ref.buttonCloseModal.addEventListener('click', onClickButtonClose);
  ref.backDrop.addEventListener('click', OnClickBackDrop);
  ref.buttonMoreLoad.addEventListener('click', onClickButtonLoadMore);
}

// Close modal window after press ESC
function onKeydownESC(e) {
  if (e.code === 'Escape') {
    ref.backDrop.classList.toggle('is-hidden');
    window.removeEventListener('keydown', onKeydownESC);
    ref.buttonCloseModal.removeEventListener('click', onClickButtonClose);
    ref.backDrop.removeEventListener('click', OnClickBackDrop);
    ref.buttonMoreLoad.removeEventListener('click', onClickButtonLoadMore);
    setTimeout(() => {
      refWindow.price1.classList.add('is-hidden');
      refWindow.price1.classList.add('is-hidden');
    }, 300);
  }
}

// Close modal window after click button
function onClickButtonClose() {
  ref.backDrop.classList.toggle('is-hidden');
  window.removeEventListener('keydown', onKeydownESC);
  ref.buttonCloseModal.removeEventListener('click', onClickButtonClose);
  ref.backDrop.removeEventListener('click', OnClickBackDrop);
  ref.buttonMoreLoad.removeEventListener('click', onClickButtonLoadMore);
  setTimeout(() => {
    refWindow.price1.classList.add('is-hidden');
    refWindow.price1.classList.add('is-hidden');
  }, 300);
}

// Close modal window after click on backdrop
function OnClickBackDrop(e) {
  if (e.target === ref.backDrop) {
    ref.backDrop.classList.toggle('is-hidden');
    window.removeEventListener('keydown', onKeydownESC);
    ref.buttonCloseModal.removeEventListener('click', onClickButtonClose);
    ref.backDrop.removeEventListener('click', OnClickBackDrop);
    ref.buttonMoreLoad.removeEventListener('click', onClickButtonLoadMore);
    setTimeout(() => {
      refWindow.price1.classList.add('is-hidden');
      refWindow.price1.classList.add('is-hidden');
    }, 300);
  }
}

// Close modal window after click on buttonLoadMore and create new fetch
async function onClickButtonLoadMore() {
  const author = refWindow.name.textContent;

  ref.inputResearch.value = `${author}`;
  ref.buttonSubmit.click();

  // close and remove listeners
  ref.backDrop.classList.toggle('is-hidden');
  window.removeEventListener('keydown', onKeydownESC);
  ref.buttonCloseModal.removeEventListener('click', onClickButtonClose);
  ref.backDrop.removeEventListener('click', OnClickBackDrop);
  ref.buttonMoreLoad.removeEventListener('click', onClickButtonLoadMore);
}

// Get value from element
function getValue(element) {
  let image = element.querySelector('.gallery-link__img');
  let itemID = element.dataset.eventid;
  let eventsData = JSON.parse(localStorage.getItem('eventsData'));

  // Condition for info
  let info;
  if (eventsData[itemID].info) {
    info = eventsData[itemID].info;
  } else {
    info = `${eventsData[itemID].name} - is the best event in ${eventsData[itemID]._embedded.venues[0].city.name}. This event will start ${eventsData[itemID].dates.start.localDate}, at the address ${eventsData[itemID]._embedded.venues[0].address.line1}`;
  }

  // Condition for price
  let price1Type;
  let price1Currency;
  let price1Range;
  let price2Type;
  let price2Currency;
  let price2Range;
  if (eventsData[itemID].priceRanges) {
    refWindow.price1.classList.remove('is-hidden');
    price1Type = eventsData[itemID].priceRanges[0].type;
    price1Currency = eventsData[itemID].priceRanges[0].currency;
    price1Range = `${eventsData[itemID].priceRanges[0].min}-${eventsData[itemID].priceRanges[0].max}`;
    if (eventsData[itemID].priceRanges[1]) {
      refWindow.price2.classList.remove('is-hidden');
      price2Type = eventsData[itemID].priceRanges[1].type;
      price2Currency = eventsData[itemID].priceRanges[1].currency;
      price2Range = `${eventsData[itemID].priceRanges[1].min}-${eventsData[itemID].priceRanges[1].max}`;
    }
  }

  const modalInfo = {
    info: info,
    data: eventsData[itemID].dates.start.localDate,
    time: eventsData[itemID].dates.start.localTime,
    timezone: eventsData[itemID].dates.timezone,
    city: eventsData[itemID]._embedded.venues[0].city.name,
    country: eventsData[itemID]._embedded.venues[0].country.name,
    address: eventsData[itemID]._embedded.venues[0].address.line1,
    name: eventsData[itemID].name,
    price1Type: price1Type,
    price1Currency: price1Currency,
    price1Range: price1Range,
    price2Type: price2Type,
    price2Currency: price2Currency,
    price2Range: price2Range,
    image: image.getAttribute('src'),
  };

  return modalInfo;
}

// Input data to window
function inputDataToWindow(values) {
  refWindow.info.textContent = values.info;
  refWindow.data.textContent = values.data;
  refWindow.time.textContent = values.time;
  refWindow.timezone.textContent = values.timezone;
  refWindow.city.textContent = values.city;
  refWindow.country.textContent = values.country;
  refWindow.address.textContent = values.address;
  refWindow.name.textContent = values.name;

  refWindow.price1Type.textContent = values.price1Type;
  refWindow.price1Currency.textContent = values.price1Currency;
  refWindow.price1Range.textContent = values.price1Range;
  refWindow.price2Type.textContent = values.price2Type;
  refWindow.price2Currency.textContent = values.price2Currency;
  refWindow.price2Range.textContent = values.price2Range;

  refWindow.imageBig.setAttribute('src', `${values.image}`);
  refWindow.imageLittle.setAttribute('src', `${values.image}`);
}
