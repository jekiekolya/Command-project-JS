import SearchService from './api';
const searchService = new SearchService();

const inputRef = document.querySelector('.input-text');
const formRef = document.querySelector('form');
let country = '';
let page = 1;

let data = searchService.fetchDefoltEvent().then(res => res._embedded.events);

formRef.addEventListener('submit', fetchData);

function fetchData(e) {
  e.preventDefault();
  searchQuery = inputRef.value.trim();
  data = searchService
    .fetchApiEvent(searchQuery, country, page)
    .then(res => console.log(res));
}
