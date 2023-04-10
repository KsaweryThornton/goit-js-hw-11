import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('button[type="submit"]');
const loadingBtn = document.querySelector('.load-more');

form.style.margin = '0px';
form.style.padding = '10px';
form.style.backgroundColor = 'teal';
form.style.display = 'flex';
form.style.flexDirection = 'column';

input.style.margin = 'auto';
input.style.marginBottom = '10px';
input.style.width = '600px';
input.style.textAlign = 'center';

gallery.style.marginBlock = '10px';
gallery.style.display = 'flex';
gallery.style.flexWrap = 'wrap';
gallery.style.gap = '10px';

searchBtn.style.cursor = 'pointer';
searchBtn.style.margin = 'auto';
searchBtn.style.padding = '5px';
searchBtn.style.width = '200px';
searchBtn.style.color = 'teal';
searchBtn.style.backgroundColor = 'white';
searchBtn.style.border = 'none';
searchBtn.style.borderRadius = '10px';
searchBtn.style.textAlign = 'center';

searchBtn.addEventListener('mouseover', () => {
  searchBtn.style.backgroundColor = 'black';
  searchBtn.style.color = 'white';
});

searchBtn.addEventListener('mouseout', () => {
  searchBtn.style.backgroundColor = 'white';
  searchBtn.style.color = 'teal';
});

loadingBtn.style.display = 'none';

let PAGE_VALUE = 1;
const PER_PAGE = 40;

const fetchData = async () => {
  try {
    const response = await axios.get(
      'https://pixabay.com/api/?key=35246224-6801bc7aa68140fc1be2a6241&q=' +
        `${input.value}` +
        '&image_type=photo&orientation=horizontal&safesearch=true&page=' +
        PAGE_VALUE +
        '&per_page=' +
        PER_PAGE
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const renderHtml = async () => {
  const data = await fetchData();
  let galleryHtml = '';
  data.hits.forEach(e => {
    galleryHtml += `<div class="photo-card">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${e.likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${e.views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${e.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${e.downloads}</b>
          </p>
        </div>
      </div>`;
  });
  gallery.innerHTML += galleryHtml;
  const image = document.querySelectorAll('img');
  image.forEach(e => {
    e.style.width = '291px';
    e.style.height = '200px';
    e.style.objectFit = 'cover';
    e.style.objectPosition = 'center';
  });
  const galleryItem = document.querySelectorAll('div.photo-card');
  galleryItem.forEach(e => {
    e.style.margin = 'auto';
    e.style.width = '300px';
    e.style.border = 'thick double #9FAACA';
  });
  const galleryInfo = document.querySelectorAll('div.info');
  galleryInfo.forEach(e => {
    e.style.display = 'flex';
    e.style.textAlign = 'center';
    e.style.fontSize = '15px';
    e.style.color = 'teal';
  });

  loadingBtn.style.cursor = 'pointer';
  loadingBtn.style.margin = 'auto';
  loadingBtn.style.marginBlock = '50px';
  loadingBtn.style.padding = '10px';
  loadingBtn.style.width = '300px';
  loadingBtn.style.fontSize = '25px';
  loadingBtn.style.color = 'white';
  loadingBtn.style.backgroundColor = 'teal';
  loadingBtn.style.border = 'none';
  loadingBtn.style.borderRadius = '10px';
  loadingBtn.style.display = 'flex';
  loadingBtn.style.justifyContent = 'center';

  loadingBtn.addEventListener('mouseover', () => {
    loadingBtn.style.backgroundColor = 'white';
    loadingBtn.style.color = 'teal';
    loadingBtn.style.border = 'solid 1px teal';
  });

  loadingBtn.addEventListener('mouseout', () => {
    loadingBtn.style.backgroundColor = 'teal';
    loadingBtn.style.color = 'white';
    loadingBtn.style.border = 'none';
  });
  if (data.total === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
};

loadingBtn.addEventListener('click', () => {
  PAGE_VALUE += 1;
  renderHtml();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  fetchData();
  renderHtml();
});
