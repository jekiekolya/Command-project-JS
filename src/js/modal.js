// Get Ref
const ref = {
  boxItems: document.querySelector('.gallery'),
  backDrop: document.querySelector('.modal__backdrop'),
  buttonCloseModal: document.querySelector('.modal-btn__close'),
  buttonMoreLoad: document.querySelector('.modal__btn-more'),
  inputResearch: document.querySelector('.input-text'),
  buttonSubmit: document.querySelector('.button-header'),
};

// Get ref to element on window where textContent is changing
const refWindow = {
  info: document.querySelector('.modal-info'),
  data: document.querySelector('.event-date'),
  time: document.querySelector('.event-time'),
  location: document.querySelector('.event-location'),
  address: document.querySelector('.event-address'),
  name: document.querySelector('.event-name'),
  price1: document.querySelector('.price1'),
  price2: document.querySelector('.price2'),
  standartPrice: document.querySelector('.price__standart'),
  vipPrice: document.querySelector('.price__vip'),
  imageBig: document.querySelector('.modal__img-big'),
  imageLittle: document.querySelector('.modal__img-small'),
};

// Add event listener for open
ref.boxItems.addEventListener('click', onClickEvent);

// Open modal window
function onClickEvent(e) {
  if (!e.target.closest('.gallery-link')) return;
  e.preventDefault();
  let item = e.target.closest('.gallery-link');

  // Get value from item and put them to window
  let values = getValue(item);
  inputDataToWindow(values);

  // Show modal window
  ref.backDrop.classList.toggle('hidden');

  // Add event listener for close modal window
  window.addEventListener('keydown', onKeydownESC);
  ref.buttonCloseModal.addEventListener('click', onClickButtonClose);
  ref.backDrop.addEventListener('click', OnClickBackDrop);
  ref.buttonMoreLoad.addEventListener('click', onClickButtonLoadMore);
}

// Close modal window after press ESC
function onKeydownESC(e) {
  if (e.code === 'Escape') {
    onCloseAndRemoveListeners();
  }
}

// Close modal window after click button
function onClickButtonClose() {
  onCloseAndRemoveListeners();
}

// Close modal window after click on backdrop
function OnClickBackDrop(e) {
  if (e.target === ref.backDrop) {
    onCloseAndRemoveListeners();
  }
}

// Close modal window after click on buttonLoadMore and create new fetch
async function onClickButtonLoadMore() {
  const author = refWindow.name.textContent;

  ref.inputResearch.value = `${author}`;
  ref.buttonSubmit.click();
  ref.inputResearch.value = `${author}`;
  // close and remove listeners
  onCloseAndRemoveListeners();
}

function onCloseAndRemoveListeners() {
  ref.backDrop.classList.toggle('hidden');
  window.removeEventListener('keydown', onKeydownESC);
  ref.buttonCloseModal.removeEventListener('click', onClickButtonClose);
  ref.backDrop.removeEventListener('click', OnClickBackDrop);
  ref.buttonMoreLoad.removeEventListener('click', onClickButtonLoadMore);
  setTimeout(() => {
    refWindow.price1.classList.add('hidden');
    refWindow.price2.classList.add('hidden');
  }, 300);
}

// Get value from element
function getValue(element) {
  let image = element.querySelector('.gallery-link__img');
  let itemID = element.dataset.eventid;
  let eventsData = JSON.parse(localStorage.getItem('eventsData'));

  // Condition for info
  let info = `${eventsData[itemID].name} - is the best event in ${eventsData[itemID]._embedded.venues[0].city.name}. This event will start ${eventsData[itemID].dates.start.localDate}, at the address ${eventsData[itemID]._embedded.venues[0].address.line1}.`;

  // Condition for price
  let price1Type;
  let price1Currency;
  let price1Range;
  let price2Type;
  let price2Currency;
  let price2Range;
  let standartPrice;
  let vipPrice;
  if (eventsData[itemID].priceRanges) {
    refWindow.price1.classList.remove('hidden');
    price1Type = eventsData[itemID].priceRanges[0].type;
    price1Currency = eventsData[itemID].priceRanges[0].currency;
    price1Range = `${eventsData[itemID].priceRanges[0].min}-${eventsData[itemID].priceRanges[0].max}`;
    standartPrice = `${price1Type} ${price1Range} ${price1Currency}`;
    if (eventsData[itemID].priceRanges[1]) {
      refWindow.price2.classList.remove('hidden');
      price2Type = eventsData[itemID].priceRanges[1].type;
      price2Currency = eventsData[itemID].priceRanges[1].currency;
      price2Range = `${eventsData[itemID].priceRanges[1].min}-${eventsData[itemID].priceRanges[1].max}`;
      vipPrice = `${price2Type} ${price2Range} ${price2Currency}`;
    }
  }

  // Create time content
  let time = eventsData[itemID].dates.start.localTime.slice(0, 5);
  let newTime = `${time} (${eventsData[itemID].dates.timezone})`;

  // Create location content
  let location = `${eventsData[itemID]._embedded.venues[0].city.name}, ${eventsData[itemID]._embedded.venues[0].country.name}`;

  const modalInfo = {
    info: info,
    data: eventsData[itemID].dates.start.localDate,
    time: newTime,
    location: location,
    address: eventsData[itemID]._embedded.venues[0].address.line1,
    name: eventsData[itemID].name,
    standartPrice: standartPrice,
    vipPrice: vipPrice,
    image: image.getAttribute('src'),
  };

  return modalInfo;
}

// Input data to window
function inputDataToWindow(values) {
  refWindow.info.textContent = values.info;
  refWindow.data.textContent = values.data;
  refWindow.time.textContent = values.time;

  refWindow.location.textContent = values.location;
  refWindow.address.textContent = values.address;
  refWindow.name.textContent = values.name;

  refWindow.standartPrice.textContent = values.standartPrice;
  refWindow.vipPrice.textContent = values.vipPrice;

  refWindow.imageBig.setAttribute('src', `${values.image}`);
  refWindow.imageLittle.setAttribute('src', `${values.image}`);
}
