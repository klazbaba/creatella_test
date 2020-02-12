const data = require('../server/index');
const throttle = require('lodash/throttle');
const getProducts = () => data().products;

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

getProducts().map(item =>
  document.getElementById('root').insertAdjacentHTML('beforeend', element(item))
);

document.getElementById('idButton').addEventListener('click', () => sortProducts('id'));
document.getElementById('sizeButton').addEventListener('click', () => sortProducts('size'));
document.getElementById('priceButton').addEventListener('click', () => sortProducts('price'));

const sortProducts = sortBy => {
  // for re arranging
  const reArrangeProducts = products => {
    document.getElementById('root').innerHTML = null;
    products.map(item => {
      document.getElementById('root').insertAdjacentHTML('beforeend', element(item));
    });
  };

  // show user which sorting order is used
  const sortButtons = document.getElementsByClassName('sortButton');
  for (const button of sortButtons) button.style.backgroundColor = 'white';
  document.getElementById(sortBy + 'Button').style.backgroundColor = '#A9A9A9';

  const products = getProducts();
  switch (sortBy) {
    case 'id':
      products.sort((firstElement, secondElement) => {
        if (firstElement.id < secondElement.id) return -1;
        else if (firstElement.id > secondElement.id) return 1;
        else return 0;
      });
      reArrangeProducts(products);
      break;
    case 'size':
      products.sort((firstElement, secondElement) => {
        return firstElement.size - secondElement.size;
      });
      reArrangeProducts(products);
      break;
    case 'price':
      products.sort((firstElement, secondElement) => {
        return firstElement.price - secondElement.price;
      });
      reArrangeProducts(products);
      break;
    default:
      break;
  }
};

const throttledFunction = throttle(() => {
  const windowHeight = document.getElementById('root').scrollHeight;
  if (windowHeight - window.pageYOffset < 1000) console.log(windowHeight - window.pageYOffset);
}, 3000);

document.addEventListener('scroll', throttledFunction);
