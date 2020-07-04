/* eslint-disable no-undef */
export default function renderLoading(isLoading) {
  const loadingBlock = document.querySelector('.loading');
  const noResults = document.querySelector('.no-results');

  if (isLoading) {
    loadingBlock.classList.add('loading_is-opened');
    noResults.classList.remove('no-results_is-opened');
  } else {
    loadingBlock.classList.remove('loading_is-opened');
  }
}
