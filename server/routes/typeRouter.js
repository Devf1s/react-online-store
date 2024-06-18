const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/create', roleMiddleware('ADMIN'), typeController.create);
router.delete('/delete', roleMiddleware('ADMIN'), typeController.delete);
router.get('/', typeController.getAll);

module.exports = router;