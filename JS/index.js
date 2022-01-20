const sidebarCategories = document.getElementById("sidebar-categories");
const contentNews = document.getElementById("content-news");
const BASE_API = 'http://localhost/wordpress/apaiky/wp-json/wp/v2/';

document.addEventListener("DOMContentLoaded", () => {
  fetchData('categories')
  .then(data => {
      pintarSidebar(data);
    });
  fetchData('posts?per_page=10&page=1').then(data => {
    pintarNews(data);
  })
});

function fetchData(url) {
  return fetch(BASE_API + url)
    .then(response => response.json())
    .then(data => data);
}

function pintarSidebar(data = []) {
  data.map(element => {
    const li = document.createElement('li');
    li.classList.add('categories__option');
    li.innerHTML = `
      <i class="option__icon far fa-folder-open" />
      <a class="option__text" href="${element.link}">${element.name}</a>
    `;
    sidebarCategories.appendChild(li);
  })
}

function pintarNews(data = []) {
  contentNews.innerHTML = '';
  data.map(element => {
    const div = document.createElement('div');
    div.classList.add('news__card');
    fetchData('media/' + element.featured_media)
      .then(image => {
        div.innerHTML = `
          <a class="card__img" href=""><img src="${image.media_details.sizes.medium?.source_url}" alt="${image.title.rendered}"></a>
          <span class="card__categorie">${element} <span class="date">${new Date(element.date).toLocaleString()}</span></span>
          <a class="card__title" href="${element}"><h3>${element.title?.rendered}</h3></a>
          <p class="card__text">${element.content?.rendered}</p>
        `;
        contentNews.appendChild(div);
      });
  })
}