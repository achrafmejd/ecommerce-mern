const { Router } = require('express');
const productControllers = require('../controllers/productControllers');

const router = Router();

router.get('/', productControllers.products_get);
router.get('/:id', productControllers.product_get_by_id);
router.post('/:id', productControllers.product_post_by_id);
router.post('/', productControllers.products_post);

/* Dashboard Admin routes */
// 1. Add product
router.post('/add', productControllers.add_product);

module.exports = router;