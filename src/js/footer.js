const element = document.querySelector('.pagination ul');
let totalPages = 29;
let page = 1;

element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    liTag += `<li class="numb prev" onclick="createPagination(totalPages, ${
      page - 1
    })"><span><i class="angle-left"></i> < Prev</span></li>`;
  }
  if (page > 2) {
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span class="number_page">1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }

  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }
  for (var pageLength = beforePage; pageLength <= afterPage; pageLength++) {
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    }
    if (page == pageLength) {
      active = 'active';
    } else {
      active = '';
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {
    liTag += `<li class="numb next" onclick="createPagination(totalPages, ${
      page + 1
    })"><span>Next ><i class="angle-right"></i></span></li>`;
  }

  element.innerHTML = liTag;
  return liTag;
}
