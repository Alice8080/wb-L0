import { INPUTS } from './constants.js';

export function inputsValidation() {
    const button = document.getElementById('order-btn');
    validateTel();
    validateInn();
    for (let item of Object.keys(INPUTS)) {
        const input = document.querySelector(`[name="${item}"]`);
        const label = document.querySelector(`[for="${item}"]`);
        const errorText = INPUTS[item].errorText;
        const emptyErrorText = INPUTS[item].emptyErrorText;
        const field = input.parentElement.parentElement;
        const elementError = field.querySelector('.input-help-text');

        input.onfocus = () => {
            activateLabel(label);
        }
        input.onblur = (e) => {
            showError(field, elementError, item, input, errorText, emptyErrorText);
            if (input.value.length === 0) {
                deactivateLabel(label);
            }
        };
        button.addEventListener('click', (e) => {
            if (input.value.length === 0) {
                showEmptyError(field, elementError, input, emptyErrorText);
            }
        });
    };
    document.getElementById('email-label').textContent = window.screen.width <= 660 ? 'Электронная почта' : 'Почта';
    window.onresize = () => {
        document.getElementById('email-label').textContent = window.screen.width <= 660 ? 'Электронная почта' : 'Почта';
    }
};

function showEmptyError(field, elementError, input, errorText) {
    field.classList.add('input-empty-error');
    elementError.textContent = errorText;
    input.oninput = (e) => {
        if (input.value.length > 0) {
            field.classList.remove('input-empty-error');
            elementError.textContent = '';
        }
    }
    input.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
};

function showError(field, elementError, item, input, errorText, emptyErrorText) {
    if (!INPUTS[item].isValid(input.value) && input.value.length > 0) {
        field.classList.add('input-error');
        elementError.textContent = errorText;
    } else if (elementError.textContent !== emptyErrorText) {
        field.classList.remove('input-error');
        elementError.textContent = '';
    }

    input.oninput = (e) => {
        if (INPUTS[item].isValid(input.value)) {
            field.classList.remove('input-error');
            elementError.textContent = '';
        }
    }
};

function validateInn() {
    const input = document.getElementById('inn');
    input.addEventListener("input", (e) => {
        const value = input.value.replace(/\D+/g, "");
        input.value = value;
    });
}

function validateTel() {
    const input = document.querySelector('[type="tel"]');
    input.addEventListener("input", (e) => {
        const value = input.value.replace(/\D+/g, "");
        const numberLength = 12;
        let result = "+";
        for (let i = 0; i < value.length && i < numberLength; i++) {
            switch (i) {
                case 1:
                    result += " ";
                    break;
                case 4:
                    result += " ";
                    break;
                case 7:
                    result += "-";
                    break;
                case 9:
                    result += "-";
                    break;
                default:
                    break;
            }
            result += value[i];
        }
        result = result.replace(/^\+8/, '+7');

        input.value = result;
    });
};

function activateLabel(label) {
    label.classList.add('active-label');
};

function deactivateLabel(label) {
    label.classList.remove('active-label');
};