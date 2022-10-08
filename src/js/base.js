import SearchService from './api';
const searchService = new SearchService();

const inputRef = document.querySelector('.input-text');
const formRef = document.querySelector('form');
let country = '';
let page = 1;

formRef.addEventListener('submit', fetchData);

async function fetchData(e) {
  e.preventDefault();
  searchQuery = inputRef.value.trim();
  const data = await searchService
    .fetchApiEvent(searchQuery, country, page)
    .then(res => res._embedded.events)
    .catch(err => alert('Ми нічого не знайшли'));
  clearData();
  createMarkup(data);
}

/*============================================= main page====================================================== */

function createMarkup(array) {
  const gallery = document.querySelector('.gallery');
  const cards = array
    .map(card => {
      return `<li class="gallery__itams">
          <a class="gallery-link" href="${card.url}">
            <div class="gallary-link__wrap">
              <div class="gallary-link__border"></div>
              <img
                class="gallery-link__img"
                src="${rightPhotoUrl(card.images)}"
                alt=""
              />
            </div>

            <h2 class="gallary-link__title">${card.name}</h2></a
          >
          <p class="gallery__date">${card.dates.start.localDate}</p>
          <a class="gallery__place" href="">
            <svg class="gallery__svg">
              <use href="./images/icon-place.svg#icon-place"></use>
            </svg>
            <span>${card._embedded.venues[0].name}</span>
          </a>
        </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', cards);
}

function clearData() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

function rightPhotoUrl(array) {
  if (window.devicePixelRatio === 1) {
    const photo = array.filter(photo => photo.url.includes('CUSTOM'));

    return photo[0].url;
  } else {
    const retinaPhoto = array
      .filter(photo => photo.url.includes('RETINA'))
      .filter(photo => photo.ratio.includes('3_2'));
    return retinaPhoto[0].url;
  }
}

async function doMagic() {
  const data = await searchService.fetchDefoltEvent();
  createMarkup(data);
}

doMagic();
/*============================================= main page====================================================== */
