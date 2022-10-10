import SearchService from './api';
import Notiflix from 'notiflix';
const searchService = new SearchService();

const inputRef = document.querySelector('.input-text');
const formRef = document.querySelector('form');
let country = '';
let page = 1;

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};

formRef.addEventListener('submit', fetchData);

async function fetchData(e) {
  e.preventDefault();
  searchQuery = inputRef.value.trim();
  const data = await searchService
    .fetchApiEvent(searchQuery, country, page)
    .then(res => res._embedded.events)
    .catch(err => {
      Notiflix.Notify.failure(
        'Sorry, we did not find anything, refine your query'
      );
    });
  clearData();
  if (data) {
    createMarkup(data);
  }
}

/*============================================= main page====================================================== */
function createMarkup(array) {
  localStorage.setItem('eventsData', JSON.stringify(array));
  const gallery = document.querySelector('.gallery');
  let i = 0;
  const cards = array
    .map(card => {
      return `<li class="gallery__itams">
          <div class="gallery-link" event-id="${i++}" data-id="${
        card.id
      }" href="${card.url}">
            <div class="gallary-link__wrap">
              <div class="gallary-link__border"></div>
              <img
                class="gallery-link__img"
                src="${rightPhotoUrl(card.images)}"
                alt=""
              />
            </div>

            <h2 class="gallary-link__title">${card.name}</h2>
            </div>
          <p class="gallery__date">${card.dates.start.localDate}</p>
          <a class="gallery__place" href="">
           
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
  array.sort((a, b) => {
    return a.width - b.width;
  });

  try {
    if (window.devicePixelRatio === 1) {
      const photo = array.filter(photo => photo.url.includes('CUSTOM'));

      return photo[0].url;
    } else {
      const retinaPhoto = array
        .filter(photo => photo.url.includes('RETINA'))
        .filter(photo => photo.ratio.includes('3_2'));
      return retinaPhoto[0].url;
    }
  } catch (error) {
    return array[0].url;
  }
}

async function doMagic() {
  const data = await searchService.fetchDefoltEvent();

  createMarkup(data);
}

doMagic();
/*============================================= main page====================================================== */
