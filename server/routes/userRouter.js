const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { check } = require('express-validator');

router.post('/registration', [
	check('email', 'Email cannot be empty').notEmpty(),
	check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }),
], userController.registration);
router.post('/login', userController.login);
router.delete('/users/:id', roleMiddleware('ADMIN'), userController.delete);
router.get('/users', roleMiddleware('ADMIN'), userController.getUsers);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;