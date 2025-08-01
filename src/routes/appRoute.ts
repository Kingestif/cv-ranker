import express from 'express';
import { Rank } from '../controllers/rank';
export const router = express.Router();

router.route('/').post(Rank);