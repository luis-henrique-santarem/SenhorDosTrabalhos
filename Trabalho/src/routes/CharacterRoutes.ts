import { Router } from 'express';
import { CharacterController } from '../controllers/CharacterController';

const router = Router();
const controller = new CharacterController();

router.get('/characters',controller.list);
router.post('/characters',controller.create);
router.delete('/characters/:id',controller.delete);
router.put('/characters/:id',controller.update);

export default router;