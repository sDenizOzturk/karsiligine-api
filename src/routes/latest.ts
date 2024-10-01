import { Router } from 'express';
const router = Router();
import { getLatest } from '../controllers/latest';

router.get('/', getLatest);

export default router;
