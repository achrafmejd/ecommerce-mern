const { Router } = require('express');
const orderController = require('../controllers/orderControllers');

const router = Router();

router.get('/', orderController.order_get);
router.post('/', orderController.order_post);


module.exports = router;