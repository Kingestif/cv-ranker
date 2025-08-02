import express from 'express';
import { Rank } from '../controllers/rank';
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = express.Router();

router.route('/').post(upload.array("files"),Rank);

export default router;