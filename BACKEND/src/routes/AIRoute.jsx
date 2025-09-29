import express from 'express';
const AIRouter=express.Router();
import { uploadAudio, uploadImage,uploadText } from '../controllers/AIController.js';

AIRouter.post('/text', uploadText);
AIRouter.post('/audio',uploadAudio);
AIRouter.post('/image',uploadImage);

export default AIRouter;

