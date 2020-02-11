const data = require('../server/index');

const products = data().products;
const element = item =>
  `<div class="product">
    <span>${item.face}</span>
    <span class="id">ID: ${item.id}</span>
    <span class="price">Price: ${item.price}</span>
    <span class="size">Size: ${item.size}</span>
</div>`;

products.map(item => {
  document.getElementById('root').insertAdjacentHTML('beforeend', element(item));
});
