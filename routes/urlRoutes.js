import express from 'express'
import {urlshortener, getOriginalUrl} from '../controllers/urlShortener.js';
const router = express.Router();

router.post('/', urlshortener);
router.get('/:shortUrl', getOriginalUrl);

export default router;