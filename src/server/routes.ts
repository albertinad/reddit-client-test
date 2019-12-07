import { Router } from 'express';
import routes from '@app/pages/home/routes';

const router = Router();

router.use('/', routes);

export default router;
