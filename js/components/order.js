import { getProducts } from "./products.js";
import { validateEnding } from "../utils/utils.js";

export function renderOrder() {
    const products = getProducts('list');
    const price = document.querySelector('.order__price');
    const discount = document.querySelector('.order__discount');
    const productsCount = document.querySelector('.order__products-count');
    const oldPrice = document.querySelector('.order__old-price');
    let discountItem = 0;
    let productsCountItem = 0;
    let oldPriceItem = 0;
    products.forEach(product => {
        if (product.isChecked) {
            const discount = product.oldTotalPrice - product.totalPrice;
            discountItem += discount;
            productsCountItem += product.count;
            oldPriceItem += product.oldTotalPrice;
        }
    });
    let priceItem = Math.round(oldPriceItem) - Math.round(discountItem);
    price.innerHTML = `${Math.round(priceItem).toLocaleString('ru')} <span class="order__som">сом</span>`;
    discount.innerHTML = `−${Math.round(discountItem).toLocaleString('ru')} <span class="order__som">сом</span>`;
    productsCount.innerHTML = `${productsCountItem} ${validateEnding(productsCountItem, 'товар', ['', 'а', 'ов'])}`;
    oldPrice.innerHTML = `${Math.round(oldPriceItem).toLocaleString('ru')} сом`;

    const checkPayment = document.getElementById('write-off-payment');
    const orderBtn = document.getElementById('order-btn').querySelector('span');
    const paymentType = JSON.parse(localStorage.getItem('paymentType'));
    const paymentText = document.querySelector('.order__write-off-text');
    const paymentText2 = document.querySelector('.details__card-info');
    checkPayment.checked = paymentType;

    if (paymentType) {
        orderBtn.textContent = `Оплатить ${Math.round(priceItem).toLocaleString('ru')} сом`;
        paymentText.style.display = 'none';
        paymentText2.style.display = 'none';
    } else {
        orderBtn.textContent = `Заказать`;
        paymentText.style.display = 'block';
        paymentText2.style.display = 'block';
    }

    checkPayment.addEventListener('change', (e) => {
        if (checkPayment.checked) {
            orderBtn.textContent = `Оплатить ${Math.round(priceItem).toLocaleString('ru')} сом`;
            paymentText.style.display = 'none';
            paymentText2.style.display = 'none';
        } else {
            orderBtn.textContent = `Заказать`;
            paymentText.style.display = 'block';
            paymentText2.style.display = 'block';
        }
        localStorage.setItem('paymentType', checkPayment.checked);
    });
}