/* eslint-disable no-undef */
const apiKey = 'ce6a234ec3974768af2db89e96451532';

export default class NewsApi {
  constructor(options) {
    this.q = options.q;
    this.from = options.from;
    this.to = options.to;
    this.pageSize = options.pageSize;
  }

  getNews() {
    return fetch(`https://newsapi.org/v2/everything?q=${this.q}&from=${this.from}&to=${this.to}&pageSize=${this.pageSize}&apiKey=${apiKey}`)
  }

}
