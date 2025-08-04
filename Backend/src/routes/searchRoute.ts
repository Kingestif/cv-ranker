import express from 'express';
import { Search } from '../controllers/search';

const router = express.Router();
router.route('/:sessionId/:searchQuery').post(Search);

export default router;