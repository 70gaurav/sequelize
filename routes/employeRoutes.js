import express from 'express';
import { add, list, update, deleteEmploye } from '../controllers/employeController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now()
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), add);
router.get('/list', list);
router.post('/update', update);
router.post('/delete', deleteEmploye);

export default router;
