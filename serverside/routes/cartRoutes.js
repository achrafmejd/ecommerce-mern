const { Router } = require('express');
const cartController = require('../controllers/cartControllers');

const router = Router();

router.get('/', cartController.cart_get);
router.post('/:id', cartController.cart_post);


module.exports = router;