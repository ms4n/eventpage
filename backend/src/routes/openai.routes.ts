import express, { Router, RequestHandler } from 'express';
import { generateDescription } from '../controllers/openai.controller';

const router: Router = express.Router();

router.post('/generate-description', generateDescription as RequestHandler);

export default router; 