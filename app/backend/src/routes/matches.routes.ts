import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validations from '../middlewares/authMiddleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.ValidateToken,
  (req: Request, res: Response) => matchesController.findById(req, res),
);
router.patch(
  '/:id',
  Validations.ValidateToken,
  (req: Request, res: Response) => matchesController.getUpdatedMatch(req, res),
);
router.post(
  '/',
  Validations.ValidateToken,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
