import express from 'express';
import { createTask, deleteMyTask, getMyTask, updateMyTask } from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.post('/new',isAuthenticated,createTask);
router.get('/myTask', isAuthenticated, getMyTask);
//dynamic route
router.route('/:id').put(isAuthenticated, updateMyTask).delete(isAuthenticated, deleteMyTask);
export default router;