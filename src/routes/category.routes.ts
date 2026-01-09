import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const categoryController = new CategoryController();
const authMiddleware = new AuthMiddleware();

// Pasang AuthMiddleware agar req.user terisi
router.use(authMiddleware.handle);

// Route Definitions
router.get('/', categoryController.index);
router.post('/', categoryController.create);

export default router;