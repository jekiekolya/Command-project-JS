export default function updatePagination() {
  const listPagination = document.querySelector('.pagination ul');
  let totalPages = localStorage.getItem('totalPage');
  let page = 1;

  listPagination.addEventListener('click', newPagination);
  function newPagination(e) {
    const ref = {
      itemActive: listPagination.querySelector('.active.numb'),
      itemNext: listPagination.querySelector('.next.numb'),
      itemPrev: listPagination.querySelector('.prev.numb'),
      itemDots: listPagination.querySelector('.dots'),
    };
    let itemNumber = e.target.closest('.numb');

    if (
      !itemNumber.classList.contains('prev') &&
      !itemNumber.classList.contains('next') &&
      !itemNumber.classList.contains('dots') &&
      !itemNumber.classList.contains('active')
    ) {
      page = itemNumber.children[0].innerHTML * 1;

      createPagination(totalPages, page);
      return;
    }

    if (itemNumber === ref.itemNext) {
      page += 1;
      createPagination(totalPages, page);
      return;
    }

    if (itemNumber === ref.itemPrev) {
      page -= 1;
      createPagination(totalPages, page);
      return;
    }
  }

  listPagination.innerHTML = createPagination(totalPages, page);
  function createPagination(totalPages, page) {
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
