const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const roleMiddleware = require('../middleware/roleMiddleware'); 

router.post('/create', roleMiddleware('ADMIN'), deviceController.create);
router.delete('/delete', roleMiddleware('ADMIN'), deviceController.delete);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;