import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import createCart from './api/createCart';
import addLineItemToCart from './api/addLineItemToCart';
import getAllProductFromCart from './api/getAllProductFromCart';

const appContainer = document.createElement('div');
appContainer.id = 'root';
document.body.append(appContainer);

if (!localStorage.getItem('cart-id')) {
  createCart().then((response) => {
    console.log('create!!', response, response.id);
    localStorage.setItem('cart-id', response.id);
    localStorage.setItem('version-cart', '1');
  });
}

addLineItemToCart(
  localStorage.getItem('cart-id'),
  '1f262fbd-e389-4116-a0a7-aa78190a88b6',
  1,
  1,
);
getAllProductFromCart(localStorage.getItem('cart-id'));
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
