import { getDetails, manageDetails, updateDetails } from "./details.js";
import { update } from "../utils/utils.js";
import { ADDRESSES, CARDS } from "../utils/constants.js";

export function manageModals() {
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
    const details = getDetails();
    let courierContent = ``;
    const address1 = details.addresses.hasOwnProperty('courier1') ? `
    <label class="radio" id="courier1">
        <span class="radio__block">
            <div class="radio__main-block">
                <span>Бишкек, улица Табышалиева, 57</span>
                <svg class="radio__del" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
                </svg> 
                <div class="radio__block-info">
                    <img src="/assets/images/star.png">
                    <p>Пункт выдачи</p>
                </div>         
            </div>
        </span>
        <input type="radio" name="address" value="courier1">
        <span class="radio__checkmark"></span>
    </label>` : '';
    const address2 = details.addresses.hasOwnProperty('courier2') ? `
    <label class="radio" id="courier2">
        <span class="radio__block">
            <div class="radio__main-block">
                <span>Бишкек, улица Жукеева-Пудовкина, 77/1</span>
                <svg class="radio__del" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
                </svg> 
                <div class="radio__block-info">
                    <img src="/assets/images/star.png">
                    <p>4.99</p>
                    <p>Пункт выдачи</p>
                </div>         
            </div>
        </span>
        <input type="radio" name="address" value="courier2">
        <span class="radio__checkmark"></span>
    </label>` : '';
    const address3 = details.addresses.hasOwnProperty('courier3') ? `
    <label class="radio" id="courier3">
        <span class="radio__block">
            <div class="radio__main-block">
                <span>Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1</span>
                <svg class="radio__del" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
                </svg> 
                <div class="radio__block-info">
                    <img src="/assets/images/star.png">
                    <p>4.99</p>
                    <p>Пункт выдачи</p>
                </div>         
            </div>
        </span>
        <input type="radio" name="address" value="courier3">
        <span class="radio__checkmark"></span>
    </label>` : '';
    courierContent = [address1, address2, address3].join('');
    const pointContent = details.addresses.deliveryPoint ? `
    <label class="radio" id="deliveryPoint">
        <span class="radio__block">
            <div class="radio__main-block">
                <span>Бишкек, улица Ахматбека Суюмбаева, 12/1</span>
                <svg class="radio__del" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
                </svg> 
                <div class="radio__block-info">
                    <img src="/assets/images/star.png">
                    <p>4.99</p>
                    <p>Пункт выдачи</p>
                </div>         
            </div>
        </span>
        <input type="radio" name="address" value="deliveryPoint" checked>
        <span class="radio__checkmark"></span>
    </label> ` : '';
    const deliveryContent = `
        <div class="modal__content modal__delivery">
            <section class="modal__section">
                <p class="modal__header">
                    Способ доставки
                    <span class="modal__close">
                        <img src="/assets/images/close.svg" alt="Закрыть">
                    </span>
                </p>
                <div class="radio__btns">
                    <label class="radio__btn">
                        В пункт выдачи
                        <input id="address-point" type="radio" name="delivery-type" value="point" checked>
                    </label>
                    <label class="radio__btn">
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

    function delAddress() {
        const delBtns = document.querySelectorAll('.radio__del');
        delBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.parentNode.parentNode.parentNode.id;
                const details = getDetails();
                console.log(details)
                delete details.addresses[id];
                console.log(details)

                updateDetails(details);
                update();
            });
        })
    }
    if (courier.checked) {
        fieldset.innerHTML = courierContent;
    } else {
        fieldset.innerHTML = pointContent;
    }
    delAddress();
    courier.addEventListener('change', (e) => {
        if (courier.checked) {
            fieldset.innerHTML = courierContent;
        } else {
            fieldset.innerHTML = pointContent;
        }
        delAddress();
    });
    point.addEventListener('change', (e) => {
        if (point.checked) {
            fieldset.innerHTML = pointContent;
        } else {
            fieldset.innerHTML = courierContent;
        }
        delAddress();
    });

    const btnTypeDelivery = document.querySelector('.modal__button-select_type_delivery');
    btnTypeDelivery.addEventListener('click', (e) => {
        const deliveryTypes = document.querySelectorAll('[name="delivery-type"]');
        const addressTypes = document.querySelectorAll('[name="address"]');
        const checked = Array.from(deliveryTypes).find(item => item.checked);
        const checkedAddress = Array.from(addressTypes).find(item => item.checked);
        console.log(checkedAddress.value)
        const details = getDetails();
        details.addressType = checked.value;
        details.address = ADDRESSES[checkedAddress.value];
        console.log(details)
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