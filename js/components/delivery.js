import { getProducts } from "./products.js";

export function renderDelivery() {
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
            <img src="./assets/images/${product.smallImg}">
            <p>${product.count > 1 ? `<span>${product.count}</span>` : ''}</p>`;
            if (product.count <= max) {
                firstList.appendChild(node);
                if (secondNode.parentElement) {
                    secondNode.parentElement.removeChild(secondNode);
                }
            } else {
                node.innerHTML = `
                <img src="./assets/images/${product.smallImg}">
                <p>${product.count > 1 ? `<span>${max}</span>` : ''}</p>`;
                firstList.appendChild(node);

                secondNode.innerHTML = `
                <img src="./assets/images/${product.smallImg}">
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