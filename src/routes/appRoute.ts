import express from 'express';
import { Rank } from '../controllers/rank';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // where to store
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName); // name of the file
  },
});

const upload = multer({ storage });

const router = express.Router();

router.route('/').post(upload.array("files"),Rank);

export default router;