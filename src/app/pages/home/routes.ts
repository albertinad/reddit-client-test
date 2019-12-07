import { Router } from 'express';
import { render } from './controller';

const router = Router();

router.get('/', render);

export default router;
