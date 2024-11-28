import express from 'express';
import { searchPlaces } from '../controllers/places.controller';

const router = express.Router();

router.post('/search', searchPlaces);

export default router; 