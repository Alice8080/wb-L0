import { PRODUCTS, MISSING_PRODUCTS, DETAILS } from './utils/constants.js';
import { setDetails } from './components/details.js';
import { showProducts, setProducts } from './components/products.js';
import { update } from './utils/utils.js';

setDetails(DETAILS);
setProducts('list', PRODUCTS);
setProducts('missing', MISSING_PRODUCTS);
update();

window.onresize = function () {
    showProducts('list');
    showProducts('missing');
}