import { Router } from 'express';
import * as Timeslots from './controllers/timeslots_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our website!' });
});

router.route('/products')
  .get(Timeslots.getTimeslots);

export default router;
