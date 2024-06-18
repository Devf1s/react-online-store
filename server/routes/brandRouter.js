const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/create', roleMiddleware('ADMIN'), brandController.create);
router.delete('/delete', roleMiddleware('ADMIN'), brandController.delete);
router.get('/', brandController.getAll);

module.exports = router;