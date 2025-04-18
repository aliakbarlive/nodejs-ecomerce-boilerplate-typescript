import { Router } from "express";
import userRoute from './user.route';

const router: Router = Router();

// user routes
router.use('/user', userRoute);

export default router;