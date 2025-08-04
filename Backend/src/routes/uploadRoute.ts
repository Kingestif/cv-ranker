import express from 'express';
import { Upload } from '../controllers/rank';
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = express.Router();

router.route('/').post(upload.array("files"),Upload);

export default router;