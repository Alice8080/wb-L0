import { inputsValidation } from './inputsValidation.js';
import { manageDetails } from '../components/details.js';
import { showProducts, selectProducts, manageProducts } from '../components/products.js';
import { renderBasketIcon } from '../components/basket.js';
import { renderDelivery } from '../components/delivery.js';
import { manageModals } from '../components/modals.js';
import { renderOrder } from '../components/order.js';

export function validateEnding(number, text, endings, cases = [2, 0, 1, 1, 1, 2]) {
    return `${text}${endings[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`;
}

export function update() {
    showProducts('list');
    showProducts('missing');
    renderOrder();
    renderBasketIcon();
    renderDelivery();
    selectProducts();
    manageProducts();
    inputsValidation();
    manageModals();
    manageDetails();
}