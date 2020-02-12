const throttle = require('lodash/throttle');
let currentPage = 1;
let endOfCatalogue = 0;
let sortBy = 'id';

const dateToDisplay = date => {
  const today = new Date();
  const previousDay = new Date(date);
  const numberOfDays = parseInt((today - previousDay) / 8.64e7, 10);
  if (numberOfDays > 7) return previousDay.toLocaleDateString();
  return numberOfDays + ' day(s) ago';
};

const element = item =>
  `<div class="product">
    <span style="font-size: ${item.size}px;">${item.face}</span>
    <span class="id">ID: ${item.id}</span>
    <span class="price">
      Price: ${(item.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    </span>
    <span class="size">Size: ${item.size}</span>
    <span class="size">Date: ${dateToDisplay(item.date)}</span>
</div>`;

const getProducts = async () => {
  const response = await fetch(
    'http://localhost:3000/products?_page=' + currentPage + '&_limit=20&_sort=' + sortBy
  );
  const jsonResponse = await response.json();
  return jsonResponse;
};

getProducts().then(products =>
  products.map(item =>
    document.getElementById('root').insertAdjacentHTML('beforeend', element(item))
  )
);

document.getElementById('idButton').addEventListener('click', () => sortProducts('id'));
document.getElementById('sizeButton').addEventListener('click', () => sortProducts('size'));
document.getElementById('priceButton').addEventListener('click', () => sortProducts('price'));

const sortProducts = sortWith => {
  sortBy = sortWith;

  // show user which sorting order is used
  const sortButtons = document.getElementsByClassName('sortButton');
  for (const button of sortButtons) button.style.backgroundColor = 'white';
  document.getElementById(sortBy + 'Button').style.backgroundColor = '#A9A9A9';

  getProducts().then(products => {
    document.getElementById('root').innerHTML = null;
    console.log(products);
    products.map(item => {
      document.getElementById('root').insertAdjacentHTML('beforeend', element(item));
    });
  });
};

const throttledFunction = throttle(async () => {
  const windowHeight = document.getElementById('root').scrollHeight;

  if (windowHeight - window.pageYOffset < 1200) {
    currentPage++;
    const products = await getProducts();

    if (products.length === 0 && !endOfCatalogue) {
      document
        .getElementById('productsSection')
        .insertAdjacentHTML(
          'beforeend',
          `<div style="margin-top: 16px; display: flex; justifyContent: center">~ end of catalogue ~</div>`
        );
      endOfCatalogue++;
    }
    products.map(item =>
      document.getElementById('root').insertAdjacentHTML('beforeend', element(item))
    );
  }
}, 3000);

document.addEventListener('scroll', throttledFunction);
