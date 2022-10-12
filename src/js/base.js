import SearchService from './api';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import Notiflix from 'notiflix';
const submitSimulation = document.querySelector('.button-header');
const searchService = new SearchService();
let pagePagination = 1;
const inputRef = document.querySelector('.input-text');
const formRef = document.querySelector('form');
let country = '';
let page = 0;
let logicFetch = true;
let changeQuery = '';
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
  if (searchQuery !== changeQuery) {
    logicFetch = true;
  }
  changeQuery = searchQuery;
  const data = await searchService
    .fetchApiEvent(searchQuery, country, page)
    .then(res => {
      if (logicFetch) {
        pagePagination = 1;
        updatePagination();
      }

      return res._embedded.events;
    })
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
      return `<li class="gallery__itams" data-eventID="${i++}" data-id="${
        card.id
      }">
          <a class="gallery-link" href="${card.url}">
            <div class="gallary-link__wrap">
              <div class="gallary-link__border"></div>
              <img
                class="gallery-link__img lazyload"
                src="${lowQualitiPhotoPicker(card.images)}"
                data-src="${rightPhotoUrl(card.images)}"
                alt=""
              />
            </div>

            <h2 class="gallary-link__title">${card.name}</h2>
            </a>
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

function lowQualitiPhotoPicker(array) {
  array.sort((a, b) => {
    return a.width - b.width;
  });

  return array[0].url;
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
  await updatePagination();

  createMarkup(data);
}

doMagic();
/*============================================= main page====================================================== */
//export default logicFetch;

function updatePagination() {
  const listPagination = document.querySelector('.pagination ul');
  let totalPages = localStorage.getItem('totalPage');

  console.log(totalPages);
  listPagination.addEventListener('click', newPagination);
  function newPagination(e) {
    const ref = {
      itemActive: listPagination.querySelector('.active.numb'),
      itemNext: listPagination.querySelector('.next.numb'),
      itemPrev: listPagination.querySelector('.prev.numb'),
      itemDots: listPagination.querySelector('.dots'),
    };
    let itemNumber = e.target.closest('.numb');
    if (itemNumber === null) return;

    if (
      !itemNumber.classList.contains('prev') &&
      !itemNumber.classList.contains('next') &&
      !itemNumber.classList.contains('dots') &&
      !itemNumber.classList.contains('active')
    ) {
      pagePagination = itemNumber.children[0].innerHTML * 1;
      page = pagePagination - 1;
      console.log(pagePagination);
      logicFetch = false;
      submitSimulation.click();
      createPagination(totalPages, pagePagination);
      page = 0;
      //pagePagination = 1;
      return;
    }

    if (itemNumber === ref.itemNext) {
      pagePagination += 1;
      page = pagePagination - 1;
      logicFetch = false;
      submitSimulation.click();
      createPagination(totalPages, pagePagination);
      page = 0;
      //pagePagination = 1;
      return;
    }

    if (itemNumber === ref.itemPrev) {
      pagePagination -= 1;
      page = pagePagination - 1;
      logicFetch = false;
      submitSimulation.click();
      createPagination(totalPages, pagePagination);
      page = 0;
      //pagePagination = 1;
      return;
    }
  }

  listPagination.innerHTML = createPagination(totalPages, pagePagination);
  function createPagination(totalPages, page) {
    totalPages = localStorage.getItem('totalPage');
    let liTag = '';
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (page > 1) {
      liTag += `<li class="numb prev"><span><i class="angle-left"></i> < Prev</span></li>`;
    }
    if (page > 2) {
      liTag += `<li class="first numb"><span>1</span></li>`;
      if (page > 3) {
        liTag += `<li class="dots"><span>...</span></li>`;
      }
    }

    if (page === totalPages) {
      beforePage = beforePage - 2;
    } else if (page === totalPages - 1) {
      beforePage = beforePage - 1;
    }

    if (page === 1) {
      afterPage = afterPage + 2;
    } else if (page === 2) {
      afterPage = afterPage + 1;
    }

    for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
      if (pageLength > totalPages) {
        break;
      }
      if (pageLength === 0) {
        pageLength = pageLength + 1;
      }
      if (page === pageLength) {
        active = 'active';
      } else {
        active = '';
      }
      liTag += `<li class="numb ${active}"><span>${pageLength}</span></li>`;
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        liTag += `<li class="dots"><span>...</span></li>`;
      }
      liTag += `<li class="last numb"><span>${totalPages}</span></li>`;
    }
    if (page < totalPages) {
      liTag += `<li class="numb next"><span>Next ><i class="angle-right"></i></span></li>`;
    }

    listPagination.innerHTML = liTag;
    return liTag;
  }
}
