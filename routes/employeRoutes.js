import express from 'express';
import { verifyToken } from '../middleware/middleware.js'; 
import { list, add, update, deleteEmploye } from '../controllers/employeController.js';

const router = express.Router();


// router.use(verifyToken);

router.post('/add', add);
router.get('/list', list);
router.post('/delete', deleteEmploye);
router.post('/update', update);

export default router;
