import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/authMiddleware';

const usersController = new UsersController();
const router = Router();

router.post('/', Validations.validateLogin, (req, res) => usersController.login(req, res));
router.get('/login/role', Validations.ValidateToken, Validations.ValidateRole);

export default router;
