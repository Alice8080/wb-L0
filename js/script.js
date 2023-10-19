const product = document.createElement('div');
const products = [
    {
        id: 'product-1',
        isChecked: true,
        title: 'Футболка UZcotton мужская',
        img: 'UZcotton.png',
        details: [
            'Цвет: белый',
            'Размер: 56',
        ],
        stock: 'Коледино WB',
        seller: 'OOO Вайлдберриз',
        sellerInfo: {
            'OGRN': '5167746237148',
            'address': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34'
        },
        count: 1,
        rest: 2,
        price: 522,
        totalPrice: 522,
        oldTotalPrice: 1051
    },
    {
        id: 'product-2',
        isChecked: true,
        title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        img: 'MobiSafe.png',
        details: [
            'Цвет: прозрачный',
        ],
        stock: 'Коледино WB',
        seller: 'OOO Мегапрофстиль',
        sellerInfo: {
            'OGRN': '5167746237148',
            'address': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34'
        },
        count: 200,
        rest: undefined,
        price: 10500.235,
        totalPrice: 2100047,
        oldTotalPrice: 2300047
    },
    {
        id: 'product-3',
        isChecked: true,
        title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
        img: 'FaberCastell.png',
        details: [],
        stock: 'Коледино WB',
        seller: 'OOO Вайлдберриз',
        sellerInfo: {
            'OGRN': '5167746237148',
            'address': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34'
        },
        count: 2,
        rest: 2,
        price: 247,
        totalPrice: 494,
        oldTotalPrice: 1051
    },
];

function showProducts(products) {
    const goodsList = document.querySelector('.goods__list');
    products.forEach((product) => {
        const node = document.createElement('li');
        node.classList.add('goods__product', 'product');
        node.id = product.id;
        node.innerHTML = `
            <div class="product__left">
            <div class="product__check">
                <input type="checkbox" name=${product.id} id=${product.id} checked><label
                    for=${product.id}></label>
            </div>
            <img class="product__img" src="./assets/images/${product.img}" alt="${product.title}">
            <div class="product__info">
                <h4>${product.title}</h4>
                <div class="product__details"></div>
                <div class="product__delivery">
                    <p>${product.stock}</p>
                    <p>
                        ${product.seller}
                        <img src="./assets/images/icon-product-delivery.svg"
                            alt="Информация о доставке">
                    </p>
                </div>
            </div>
        </div>
        <div class="product__right">
            <div class="product__count">
                <div class="product__counter">
                    <button class="product__counter-minus" ${product.count < 2 ? 'disabled' : ''}>&#8722;</button>
                    <span>${product.count}</span>
                    <button class="product__counter-plus">+</button>
                </div>
                    ${product.rest ? `<span class="product__rest">Осталось ${product.rest} шт.</span>` : ''}
                <div class="product__buttons">
                    <button class="product__fav">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 4.05857C2.26589 4.75224 1.76684 5.83284 1.99493 7.42928C2.22332 9.02783 3.26494 10.6852 4.80436 12.3478C6.25865 13.9184 8.10962 15.4437 9.99996 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.735 10.6852 17.7766 9.02783 18.005 7.4293C18.233 5.83285 17.734 4.75224 16.9659 4.05856C16.1766 3.34572 15.055 3 14 3C12.1319 3 11.0923 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1582 5.04882 9.84166 5.04882 9.6464 4.85355C9.59641 4.80356 9.54182 4.7466 9.48224 4.68443C8.90757 4.08479 7.86797 3 5.99995 3C4.94495 3 3.82325 3.34573 3.03396 4.05857ZM2.36371 3.31643C3.37369 2.40427 4.75202 2 5.99995 2C8.07123 2 9.34539 3.11257 9.99996 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2668 5.66715 18.9949 7.5707C18.7233 9.47217 17.5149 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87773 18.0333 9.69995 17.9C7.69353 16.3952 5.66443 14.7485 4.0706 13.0272C2.48503 11.3148 1.27665 9.47217 1.00498 7.57072C0.733012 5.66716 1.33249 4.24776 2.36371 3.31643Z" fill="black"/>
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
            <div class="product__price">
                <p class="product__current-price"><span>${product.totalPrice} </span>сом</p>
                <p class="product__old-price">${product.oldTotalPrice} сом</p>
            </div>
        </div>`;
        goodsList.appendChild(node);
        const details = document.querySelector(`#${product.id} .product__details`);
        details.classList.add('product__details');
        product.details.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item;
            details.appendChild(span);
        });
    });
}

showProducts(products);