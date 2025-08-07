import express from 'express';
import { Search } from '../controllers/search';

const router = express.Router();
router.route('/:searchQuery').get(Search);

export default router;