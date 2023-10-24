export function getDetails() {
    return JSON.parse(localStorage.getItem('details'));
}

export function setDetails(details) {
    const storage = localStorage.getItem('details');
    if (!storage) {
        localStorage.setItem('details', JSON.stringify(details));
    }
}

export function updateDetails(details) {
    localStorage.setItem('details', JSON.stringify(details));
}

export function manageDetails(details = getDetails()) {
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