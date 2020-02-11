const data = require('../server/index');
const getProducts = () => data().products;

const element = item =>
  `<div class="product">
    <span>${item.face}</span>
    <span class="id">ID: ${item.id}</span>
    <span class="price">Price: ${item.price}</span>
    <span class="size">Size: ${item.size}</span>
</div>`;

getProducts().map(item => {
  document.getElementById('root').insertAdjacentHTML('beforeend', element(item));
});

document.getElementById('idButton').addEventListener('click', () => sortProducts('id'));
document.getElementById('sizeButton').addEventListener('click', () => sortProducts('size'));
document.getElementById('priceButton').addEventListener('click', () => sortProducts('price'));

const sortProducts = sortBy => {
  const reArrangeProducts = products => {
    document.getElementById('root').innerHTML = null;
    products.map(item => {
      document.getElementById('root').insertAdjacentHTML('beforeend', element(item));
    });
  };

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
