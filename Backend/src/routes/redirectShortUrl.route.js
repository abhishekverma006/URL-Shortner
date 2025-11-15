import express from 'express'
import {redirectShortUrlController} from '../controllers/shortUrl.controller.js'


const router = express.Router();

router.get('/:id',redirectShortUrlController)

export default router