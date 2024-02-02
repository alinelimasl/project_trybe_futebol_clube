import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/authMiddleware';

const usersController = new UsersController();
const router = Router();

router.post('/', Validations.validateLogin, (req, res) => usersController.login(req, res));
router.get(
  '/role',
  Validations.ValidateToken,
  Validations.ValidateRole,
  (req, res) => usersController.login(req, res),
);

export default router;
