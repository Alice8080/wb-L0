export const PRODUCTS = {
    'product-1': {
        id: 'product-1',
        isChecked: true,
        title: 'Футболка UZcotton мужская',
        img: 'UZcotton.png',
        missingImg: 'UZcottonMissing.png',
        smallImg: 'UZcottonSmall.png',
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
        oldPrice: 1051,
        totalPrice: 522,
        oldTotalPrice: 1051,
    },
    'product-2': {
        id: 'product-2',
        isChecked: true,
        title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        img: 'MobiSafe.png',
        missingImg: 'MobiSafeMissing.png',
        smallImg: 'MobiSafeSmall.png',
        details: [
            'Цвет: прозрачный',
        ],
        stock: 'Коледино WB',
        seller: 'OOO Мегапрофстиль',
        sellerInfo: {
            'OGRN': '5167746237148',
            'address': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34'
        },
        count: 185,
        rest: undefined,
        price: 10500.235,
        oldPrice: 57501.175,
        totalPrice: 2100047,
        oldTotalPrice: 2300047
    },
    'product-3': {
        id: 'product-3',
        isChecked: true,
        title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, <nobr>Faber-Castell</nobr>',
        img: 'FaberCastell.png',
        missingImg: 'FaberCastellMissing.png',
        smallImg: 'FaberCastellSmall.png',
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
        oldPrice: 475,
        totalPrice: 494,
        oldTotalPrice: 950
    },
};

export const CARDS = {
    mir: {
        img: 'card-mir.svg',
        number: '1234 12•• •••• 1234'
    },
    visa: {
        img: 'card-visa.svg',
        number: '1234 56•• •••• 1234'
    },
    mastercard: {
        img: 'card-mastercard.svg',
        number: '1234 56•• •••• 1234'
    },
    maestro: {
        img: 'card-maestro.svg',
        number: '1234 56•• •••• 1234'
    },
};

export const ADDRESSES = {
    'deliveryPoint': 'Бишкек, улица Ахматбека Суюмбаева, 12/1',
    'courier': {
        '1': 'Бишкек, улица Табышалиева, 57',
        '2': 'Бишкек, улица Жукеева-Пудовкина, 77/1',
        '3': 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1'
    }
};


export const INPUTS = {
    name: {
        emptyErrorText: 'Укажите имя',
        errorText: '',
        isValid(value) {
            return true;
        },
    },
    surname: {
        emptyErrorText: 'Введите фамилию',
        errorText: '',
        isValid(value) {
            return true;
        },
    },
    email: {
        emptyErrorText: 'Укажите электронную почту',
        errorText: 'Проверьте адрес электронной почты',
        isValid(value) {
            const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toLowerCase());
            return validEmail;
        },
    },
    phone: {
        emptyErrorText: 'Укажите номер телефона',
        errorText: 'Формат: +9 999 999 99 99',
        isValid(value) {
            const validPhone = /\+\d \d\d\d \d\d\d \d\d \d\d/.test(value)
            return validPhone;
        },
    },
    inn: {
        emptyErrorText: 'Укажите ИНН',
        errorText: 'Проверьте ИНН',
        isValid(value) {
            const validInn = /\d{14}/.test(value);
            return value.length === 14 && validInn;
        },
    },
};

