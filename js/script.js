import { PRODUCTS, MISSING_PRODUCTS, CARDS, ADDRESSES } from './constants.js';
import { inputsValidation } from './inputsValidation.js';


const details = {
    addressType: 'point',
    address: ADDRESSES.deliveryPoint,
    card: CARDS.mir
};

function getDetails() {
    return JSON.parse(localStorage.getItem('details'));
}

function manageDetails(details = getDetails()) {
    const addressElements = document.querySelectorAll('.address');
    addressElements.forEach(element => {
        element.textContent = details.address;
    });
    const orderDeliveryType = document.getElementById('order-delivery-type');
    orderDeliveryType.textContent = details.addressType === 'point' ? 'Доставка в пункт выдачи' : 'Доставка курьером';
    const deliveryType = document.getElementById('delivery-type-title');
    deliveryType.textContent = details.addressType === 'point' ? 'Пункт выдачи' : 'Доставка курьером';

    const paymentCard = document.getElementById('payment-card');
    paymentCard.innerHTML = `
    <img src="/assets/images/${details.card.img}">
    <p>${details.card.number}</p>
    <span>01/30</span>`;

    const orderCard = document.getElementById('order-card');
    orderCard.innerHTML = `
    <img src="/assets/images/${details.card.img}">
    <p>${details.card.number}</p>`;
    updateDetails(details);
}

setDetails(details);
setProducts('list', PRODUCTS);
setProducts('missing', MISSING_PRODUCTS);
update();

function setDetails(details) {
    const storage = localStorage.getItem('details');
    if (!storage) {
        localStorage.setItem('details', JSON.stringify(details));
    }
}

function updateDetails(details) {
    localStorage.setItem('details', JSON.stringify(details));
}

function showProducts(list) {
    const products = getProducts(list);
    const goodsList = document.querySelector(`.goods__${list}`);
    goodsList.innerHTML = '';
    products.forEach((product) => {
        const priceStyle = product.totalPrice >= 1000000 ? 'font-size: 16px; line-height: 24px; letter-spacing: normal;' : '';
        const img = list === 'missing' ? product.missingImg : product.img;
        const node = document.createElement('li');
        const totalPrice = Math.round(product.totalPrice).toLocaleString('ru');
        const oldTotalPrice = product.oldTotalPrice > 1000000 ? Math.round(product.oldTotalPrice).toLocaleString('ru').replace(' ', '&#8239;') : Math.round(product.oldTotalPrice);
        node.classList.add('goods__product', 'product');
        node.id = `${product.id}-${list}`;
        node.innerHTML = `
        <div class="product__left">
            <div class="product__check-img">
                <div class="product__check">
                    <input type="checkbox" name=${product.id} id=${product.id} ${product.isChecked ? 'checked' : ''}><label
                        for=${product.id}></label>
                </div>
                <img class="product__img" src="./assets/images/${img}">
            </div>
            <div class="product__info">
                <h4>${product.title}</h4>
                <div class="product__details"></div>
                <div class="product__delivery">
                    <p>${product.stock}</p>
                    <p>
                        ${product.seller}
                        <span class="hover-info">
                            <img src="./assets/images/icon-product-delivery.svg"
                                alt="Информация о доставке">
                            <span class="hover-info-block">
                                <span class="hover-title">${product.sellerInfo.title}</span>
                                <span>ОГРН: ${product.sellerInfo.OGRN}</span>
                                <span>${product.sellerInfo.address}</span>
                            </span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="product__right">
            <div class="product__count">
                <div class="product__counter">
                    <button class="product__counter-minus" ${product.count < 2 ? 'disabled' : ''}>&#8722;</button>
                    <span class="product__counter-item">${product.count}</span>
                    <button class="product__counter-plus" ${product.count === product.rest ? 'disabled' : ''}>+</button>
                </div>
                    ${product.rest ? `<span class="product__rest">Осталось ${product.rest} шт.</span>` : ''}
                <div class="product__buttons">
                    <button class="product__fav">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 4.05857C2.26589 4.75224 1.76684 5.83284 1.99493 7.42928C2.22332 9.02783 3.26494 10.6852 4.80436 12.3478C6.25865 13.9184 8.10962 15.4437 9.99996 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.735 10.6852 17.7766 9.02783 18.005 7.4293C18.233 5.83285 17.734 4.75224 16.9659 4.05856C16.1766 3.34572 15.055 3 14 3C12.1319 3 11.0923 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1582 5.04882 9.84166 5.04882 9.6464 4.85355C9.59641 4.80356 9.54182 4.7466 9.48224 4.68443C8.90757 4.08479 7.86797 3 5.99995 3C4.94495 3 3.82325 3.34573 3.03396 4.05857ZM2.36371 3.31643C3.37369 2.40427 4.75202 2 5.99995 2C8.07123 2 9.34539 3.11257 9.99996 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2668 5.66715 18.9949 7.5707C18.7233 9.47217 17.5149 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87773 18.0333 9.69995 17.9C7.69353 16.3952 5.66443 14.7485 4.0706 13.0272C2.48503 11.3148 1.27665 9.47217 1.00498 7.57072C0.733012 5.66716 1.33249 4.24776 2.36371 3.31643Z" fill="${product.isFav ? '#CB11AB' : 'black'}"/>
                        </svg>                                                        
                    </button>
                    <button class="product__del">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                        </svg>                                                        
                    </button>
                </div>
            </div>
            <div class="product__price" style="${product.totalPrice >= 1000000 ? 'padding-top: 10px;' : ''}">
                <p class="product__current-price"><span style="${priceStyle}">${totalPrice} </span>сом</p>
                <p class="product__old-price hover-price" style="${product.oldTotalPrice >= 1000000 ? 'margin-top: 2px;' : ''}">
                    ${oldTotalPrice} сом
                    <span class="hover-price-block">
                        <span class="hover-price-title">
                            <span>Скидка 55%</span>
                            <span>Скидка покупателя 10%</span>
                        </span>
                        <span class="hover-price-discount">
                            <span>&#8722;300 сом</span>
                            <span>&#8722;30 сом</span>                        
                        </span>
                    </span>
                </p>
            </div>
        </div>`;
        goodsList.appendChild(node);
        const details = document.querySelector(`#${node.id} .product__details`);
        details.classList.add('product__details');
        product.details.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item;
            details.appendChild(span);
        });
    });
};

function setProducts(id, products) {
    const storage = localStorage.getItem(id);
    if (!storage) {
        localStorage.setItem(id, JSON.stringify(products));
    }
}

function updateProducts(id, products) {
    localStorage.setItem(id, JSON.stringify(products));
}

function updateProduct(id, storageProduct) {
    const storage = JSON.parse(localStorage.getItem('list'));
    if (storage) {
        localStorage.setItem('list', JSON.stringify({ ...storage, [id]: storageProduct }));
    };
}

function manageProducts() {
    const products = getProducts('list');
    let mainCount = 0;
    let mainPrice = 0;
    products.forEach((product) => {
        mainPrice += product.totalPrice;
        mainCount += product.count;
        const id = product.id;
        const storage = JSON.parse(localStorage.getItem('list'));
        const storageProduct = storage[id];
        const productElement = document.getElementById(`${id}-list`);
        const minusBtn = productElement.querySelector('.product__counter-minus');
        const plusBtn = productElement.querySelector('.product__counter-plus');
        const count = productElement.querySelector('.product__counter-item');
        let currentCount = parseInt(count.textContent);
        minusBtn.addEventListener('click', (e) => {
            currentCount--;
            render();
        });
        plusBtn.addEventListener('click', (e) => {
            currentCount++;
            render();
        });

        function render() {
            storageProduct.count = currentCount;
            storageProduct.totalPrice = currentCount * storageProduct.price;
            storageProduct.oldTotalPrice = currentCount * storageProduct.oldPrice;
            updateProduct(id, storageProduct);
            update();
        };

        manageProductBtns(id, 'list', productElement);
    });

    const missingProducts = getProducts('missing');
    const mainMissing = missingProducts.length;
    renderBasketSummary(mainCount, mainPrice, mainMissing);

    missingProducts.forEach((product) => {
        const id = product.id;
        const productElement = document.getElementById(`${id}-missing`);
        manageProductBtns(id, 'missing', productElement);
    });
};

function manageProductBtns(id, list, productElement) {
    const delBtn = productElement.querySelector('.product__del');
    delBtn.addEventListener('click', (e) => {
        if (list === 'list') {
            const delivery = document.getElementById(`${id}-delivery`);
            const delivery2 = document.getElementById(`${id}-delivery-2`);
            delivery.parentElement.removeChild(delivery);
            if (delivery2) {
                delivery2.parentElement.removeChild(delivery2);
            }
        }
        const storageProducts = getProducts(list);
        const products = storageProducts
            .filter(product => product.id !== id)
            .map(product => [[product.id], product]);
        updateProducts(list, Object.fromEntries(products));
        update();
    });

    const favBtn = productElement.querySelector('.product__fav');
    favBtn.addEventListener('click', (e) => {
        const storageProducts = getProducts(list);
        const products = storageProducts.map(product => {
            if (product.id === id) {
                product.isFav = !product.isFav;
            }
            return [[product.id], product];
        });
        updateProducts(list, Object.fromEntries(products));
        update();
    });

}

function renderBasketSummary(mainCount, mainPrice, mainMissing) {
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

function renderOrder() {
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
    checkPayment.checked = paymentType;
    if (paymentType) {
        orderBtn.textContent = `Оплатить ${Math.round(priceItem).toLocaleString('ru')} сом`;
        paymentText.style.display = 'none';
    } else {
        orderBtn.textContent = `Заказать`;
        paymentText.style.display = 'block';
    }
    checkPayment.addEventListener('change', (e) => {
        if (checkPayment.checked) {
            orderBtn.textContent = `Оплатить ${Math.round(priceItem).toLocaleString('ru')} сом`;
            paymentText.style.display = 'none';
        } else {
            orderBtn.textContent = `Заказать`;
            paymentText.style.display = 'block';
        }
        localStorage.setItem('paymentType', checkPayment.checked);
    });
}

function renderDelivery() {
    const products = getProducts('list');
    const dates = {
        '5-6': {
            'product-1': {
                maxCount: 2,
            },
            'product-2': {
                maxCount: 184,
            },
            'product-3': {
                maxCount: 2,
            },
        },
    };
    const firstList = document.querySelector('.delivery__5-6').querySelector('.delivery__products');
    const secondList = document.querySelector('.delivery__7-8').querySelector('.delivery__products');
    products.forEach(product => {
        if (product.isChecked) {
            const id = `${product.id}-delivery`;
            const id2 = `${product.id}-delivery-2`;
            let node;
            let secondNode;

            if (!document.getElementById(id)) {
                node = document.createElement('div');
                node.classList.add('delivery__product');
                node.id = id;
            } else {
                node = document.getElementById(id);
            }

            if (!document.getElementById(id2)) {
                secondNode = document.createElement('div');
                secondNode.classList.add('delivery__product');
                secondNode.id = id2;
            } else {
                secondNode = document.getElementById(id2);
            }

            const max = dates['5-6'][product.id].maxCount;
            node.innerHTML = `
            <img src="/assets/images/${product.smallImg}">
            <p>${product.count > 1 ? `<span>${product.count}</span>` : ''}</p>`;
            if (product.count <= max) {
                firstList.appendChild(node);
                if (secondNode.parentElement) {
                    secondNode.parentElement.removeChild(secondNode);
                }
            } else {
                node.innerHTML = `
                <img src="/assets/images/${product.smallImg}">
                <p>${product.count > 1 ? `<span>${max}</span>` : ''}</p>`;
                firstList.appendChild(node);

                secondNode.innerHTML = `
                <img src="/assets/images/${product.smallImg}">
                <p>${product.count > 1 ? `<span>${product.count - max}</span>` : ''}</p>`;
                    secondList.appendChild(secondNode);
            }
        } else {
            const id = `${product.id}-delivery`;
            const id2 = `${product.id}-delivery-2`;
            const node = document.getElementById(id);
            const secondNode = document.getElementById(id2);
            if (node) {
                node.parentElement.removeChild(node);
            }
            if (secondNode) {
                secondNode.parentElement.removeChild(secondNode);
            }
        }
    });
    const deliveryProduct = document.querySelector('.delivery__7-8 .delivery__product');
    if (!deliveryProduct) {
        document.querySelector('.order__delivery-date span').textContent = '5–6 фев';
    } else {
        document.querySelector('.order__delivery-date span').textContent = '5–8 фев';
    }
}

function selectProducts() {
    let checkedCount = 0;
    const mainChekbox = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.goods__list .product__check input[type="checkbox"]');
    if (mainChekbox) {
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) checkedCount++;
        });
        if (checkboxes.length > 0) {
            if (checkedCount === checkboxes.length) {
                mainChekbox.checked = true;
            }
            if (checkedCount === 0 && 0 !== checkboxes.length) {
                mainChekbox.checked = false;
            }
        }
        mainChekbox.onchange = function (e) {
            const storageProducts = getProducts('list');
            const products = storageProducts.map(product => {
                product.isChecked = mainChekbox.checked;
                return [[product.id], product];
            });
            updateProducts('list', Object.fromEntries(products));
            update();
        };
        checkboxes.forEach(checkbox => {
            checkbox.onchange = function (e) {
                const id = checkbox.id;
                const n = checkbox.checked ? 1 : -1;
                checkedCount += n;
                if (checkedCount === checkboxes.length) {
                    mainChekbox.checked = true;
                }
                if (checkedCount === 0) {
                    mainChekbox.checked = false;
                }

                const products = getProducts('list');
                const storageProduct = products.find(i => i.id === id);
                storageProduct.isChecked = checkbox.checked;
                updateProduct(id, storageProduct);
                update();
            };
        });
    }
}

function renderBasketIcon() {
    const products = getProducts('list');
    const count = products.filter(product => product.isChecked).length;
    const basket = document.getElementById('nav-basket-count');
    if (count === 0) {
        basket.parentNode.style.display = 'none';
    } else {
        basket.parentNode.style.display = 'flex';
        basket.textContent = count;
    }
}



function manageModals() {
    function modal(id, btns, content) {
        const modal = document.getElementById(id);
        btns.forEach(btn => {
            modal.innerHTML = content;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const close = modal.querySelector(".modal__close");
                const closeBtn = modal.querySelector(".modal__button-select");
                modal.style.display = "block";
                const hideModal = () => {
                    modal.style.display = "none";
                };
                close.onclick = hideModal;
                closeBtn.onclick = hideModal;
                window.onclick = function (event) {
                    if (event.target == modal) {
                        hideModal();
                    }
                }
            });
        });
    }
    const deliveryBtns = document.querySelectorAll('.modal__button_type_delivery');
    const courierContent = `
    <label class="radio">
        <span class="radio-block">
            Бишкек, улица Табышалиева, 57
            <svg class="radio-del" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
            </svg>            
        </span>
        <input type="radio" name="address" value="courier-1">
        <span class="radio__checkmark"></span>
    </label>
    <label class="radio">
        <span class="radio-block">
            Бишкек, улица Жукеева-Пудовкина, 77/1
            <svg class="radio-del" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
            </svg>
        </span>
        <input type="radio" name="address" value="courier-2">
        <span class="radio__checkmark"></span>
    </label>
    <label class="radio">
        <span class="radio-block">
            Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1
            <svg class="radio-del" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
            </svg>
        </span>
        <input type="radio" name="address" value="courier-3">
        <span class="radio__checkmark"></span>
    </label>`;
    const pointContent = `
    <label class="radio">
        <span class="radio-block">
            Бишкек, улица Ахматбека Суюмбаева, 12/1
            <svg class="radio-del" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
            </svg>
        </span>
        <input type="radio" name="address" value="deliveryPoint" checked>
        <span class="radio__checkmark"></span>
    </label>
    `;
    const deliveryContent = `
        <div class="modal__content modal__delivery">
            <section class="modal__section">
                <p class="modal__header">
                    Способ доставки
                    <span class="modal__close">
                        <img src="/assets/images/close.svg" alt="Закрыть">
                    </span>
                </p>
                <div class="radio-btns">
                    <label class="radio-btn">
                        В пункт выдачи
                        <input id="address-point" type="radio" name="delivery-type" value="point" checked>
                    </label>
                    <label class="radio-btn">
                        Курьером
                        <input id="address-courier" type="radio" name="delivery-type" value="courier">
                    </label>
                </div>
                <p class="modal__subheader">Мои адреса</p>
                <fieldset class="modal__delivery-fieldset">
                    ${courierContent}
                </fieldset>            
            </section>
            <button class="modal__button-select modal__button-select_type_delivery">
                Выбрать
            </button>
        </div>`;
    const paymentBtns = document.querySelectorAll('.modal__button_type_payment');
    const paymentContent = `
    <div class="modal__content modal__payment">
    <section class="modal__section">
        <p class="modal__header">
            Способ оплаты
            <span class="modal__close">
                <img src="/assets/images/close.svg" alt="Закрыть">
            </span>
        </p>
        <fieldset>
            <label class="radio">
                <img src="/assets/images/card-mir.svg">
                1234 56•• •••• 1234
                <input type="radio" name="radio-card" value="mir" checked>
                <span class="radio__checkmark"></span>
            </label>
            <label class="radio">
                <img src="/assets/images/card-visa.svg">
                1234 56•• •••• 1234
                <input type="radio" name="radio-card" value="visa">
                <span class="radio__checkmark"></span>
            </label>
            <label class="radio">
                <img src="/assets/images/card-mastercard.svg">
                1234 56•• •••• 1234
                <input type="radio" name="radio-card" value="mastercard">
                <span class="radio__checkmark"></span>
            </label>
            <label class="radio">
                <img src="/assets/images/card-maestro.svg">
                1234 56•• •••• 1234
                <input type="radio" name="radio-card" value="maestro">
                <span class="radio__checkmark"></span>
            </label>
        </fieldset>
        </section>
        <button class="modal__button-select modal__button-select_type_cards">
            Выбрать
        </button>
    </div>`;
    modal('delivery-modal', deliveryBtns, deliveryContent);
    modal('payment-modal', paymentBtns, paymentContent);

    const point = document.getElementById('address-point');
    const courier = document.getElementById('address-courier');
    const fieldset = document.querySelector('.modal__delivery-fieldset');
    if (courier.checked) {
        fieldset.innerHTML = courierContent;
    } else {
        fieldset.innerHTML = pointContent;
    }
    courier.addEventListener('change', (e) => {
        if (courier.checked) {
            fieldset.innerHTML = courierContent;
        } else {
            fieldset.innerHTML = pointContent;
        }
    });
    point.addEventListener('change', (e) => {
        if (point.checked) {
            fieldset.innerHTML = pointContent;
        } else {
            fieldset.innerHTML = courierContent;
        }
    });

    const btnTypeDelivery = document.querySelector('.modal__button-select_type_delivery');
    btnTypeDelivery.addEventListener('click', (e) => {
        const deliveryTypes = document.querySelectorAll('[name="delivery-type"]');
        const addressTypes = document.querySelectorAll('[name="address"]');
        const checked = Array.from(deliveryTypes).find(item => item.checked);
        const checkedAddress = Array.from(addressTypes).find(item => item.checked);
        const details = getDetails();
        details.addressType = checked.value;
        details.address = ADDRESSES[checkedAddress.value];
        manageDetails(details);
    });
    const btnCards = document.querySelector('.modal__button-select_type_cards');
    btnCards.addEventListener('click', (e) => {
        const cards = document.querySelectorAll('[name="radio-card"]');
        const checked = Array.from(cards).find(item => item.checked);
        const details = getDetails();
        details.card = CARDS[checked.value];
        manageDetails(details);
    });
}

function getProducts(id) {
    return Object.values(JSON.parse(localStorage.getItem(id)));
}

function validateEnding(number, text, endings, cases = [2, 0, 1, 1, 1, 2]) {
    return `${text}${endings[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`;
}

function update() {
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