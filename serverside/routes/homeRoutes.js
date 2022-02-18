const { Router } = require('express');
const homeControllers = require('../controllers/homeControllers');

const router = Router();

router.get('/', homeControllers.get_home);

module.exports = router;