import { Router } from 'express';
const router = Router();
import { getInflation } from '../controllers/inflation';

router.get('/', getInflation);

export default router;
