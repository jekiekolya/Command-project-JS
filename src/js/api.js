const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const KEY = 'cMgNevJhP92xGIzmygmG3mL7Thmyi754';

export default class SearchService {
  constructor() {
    // this.searchQuery = '';
    // this.page = 0;
    // this.country = '';
  }
  async fetchApiEvent(searchQuery, country, page) {
    try {
      const url = `${BASE_URL}/events?keyword=${searchQuery}&apikey=${KEY}&countryCode=${country}&size=16&page=${page}`;

      const response = await fetch(url);
      const data = await response.json();
      //   const { _embedded } = data;

      //   return _embedded ? _embedded.events : null;
      return await data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchDefoltEvent() {
    const url = `${BASE_URL}/events.json?apikey=${KEY}&size=16&page=1`;
    return fetch(url)
      .then(data => data.json())
      .catch(err => console.log('error'));
  }
}
