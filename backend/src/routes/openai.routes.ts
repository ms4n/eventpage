import express from 'express';
import { generateDescription } from '../controllers/openai.controller';

const router = express.Router();

router.post('/generate-description', generateDescription);

export default router; 