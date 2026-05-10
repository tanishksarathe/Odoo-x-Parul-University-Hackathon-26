import express from 'express';
import { tripRegisterController } from '../controller/tripsController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-trip', protect,tripRegisterController);

export default router;