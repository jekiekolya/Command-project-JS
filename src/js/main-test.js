import axios from 'axios';

async function fetchDefaultEvents() {
  const data = await axios.get(
    'https://app.ticketmaster.com/discovery/v2/events.json?apikey=AVb62xy4mejBfqrebWvwxQ75zF1yJMBb&countryCode=US'
  );
  console.log(data);
  return data.data._embedded.events;
}

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

function rightPhotoUrl(array) {
  if (window.devicePixelRatio === 2) {
    const retinaPhoto = array
      .filter(photo => photo.url.includes('RETINA'))
      .filter(photo => photo.ratio.includes('3_2'));

    return retinaPhoto[0].url;
  }

  if (window.devicePixelRatio === 1) {
    const photo = array.filter(photo => photo.url.includes('CUSTOM'));

    return photo[0].url;
  }
}

async function doMagic() {
  const data = await fetchDefaultEvents();
  createMarkup(data);
}

console.log(window.devicePixelRatio);
console.log(window.screen.availHeight);
console.log(window.screen.availWidth);
console.log(window.screen.orientation);
doMagic();
