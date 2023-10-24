import { getProducts } from "./products.js";
import { validateEnding } from "../utils/utils.js";

export function renderBasketIcon() {
    const products = getProducts('list');
    const count = products.filter(product => product.isChecked).length;
    const basket = document.getElementById('nav-basket-count');
    const basketTabbar = document.getElementById('tabbar-basket-count');
    if (count === 0) {
        basket.parentNode.style.display = 'none';
        basketTabbar.parentNode.style.display = 'none';
    } else {
        basket.parentNode.style.display = 'flex';
        basket.textContent = count;
        basketTabbar.parentNode.style.display = 'flex';
        basketTabbar.textContent = count;
    }
}

export function renderBasketSummary(mainCount, mainPrice, mainMissing) {
    const listDetails = document.querySelector('.basket__details_list_main');
    const missingDetails = document.querySelector('.basket__details_list_missing');
    const listSummary = listDetails.querySelector('.basket__summary');
    const missingSummary = missingDetails.querySelector('.basket__summary');

    listDetails.addEventListener("toggle", () => {
        if (listDetails.open) {
            listSummary.innerHTML = `
            <div class="goods__select-all">
                <div>
                    <input type="checkbox" name="select-all" id="select-all">
                    <label for="select-all"><span>Выбрать все</span></label>
                </div>
                <img class="basket__summary-img" src="./assets/images/icon-hide.svg"
                    alt="Скрыть список">
            </div>`;
            selectProducts();
        } else {
            listSummary.innerHTML = `
            <div class="goods__select-all">
                <div>
                    <p>${mainCount} ${validateEnding(mainCount, 'товар', ['', 'а', 'ов'])}  · ${Math.round(mainPrice).toLocaleString('ru')} сом</p>
                </div>
                <img class="basket__summary-img" src="./assets/images/icon-hide.svg"
                    alt="Скрыть список">
            </div>`;
        }
    });

    missingSummary.innerHTML = `
    <h2>
        ${validateEnding(mainMissing, 'Отсутству', ['ет', 'ют', 'ет'])} · ${mainMissing} ${validateEnding(mainMissing, 'товар', ['', 'а', 'ов'])}
        <img class="basket__summary-img" src="./assets/images/icon-hide.svg"
            alt="Скрыть список">
    </h2>`;
}