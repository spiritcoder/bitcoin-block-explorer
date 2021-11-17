import express from 'express'
const router = express.Router();
import { validateRequest } from '../validators/validate-request';




/*
|-------------------------------------------------------------------------------
| Controller, Validator, Middleware, Utils Import
|-------------------------------------------------------------------------------
*/
import { blockController } from '../controllers';
import * as v from '../validators'

/*
|-------------------------------------------------------------------------------
| Route Declaration
|-------------------------------------------------------------------------------
*/
router.get('/getAllBlocks/:time',blockController.getBlocks);
router.get('/getABlock/:hash', v.validateHash, validateRequest,  blockController.getABlock)










/*
|-------------------------------------------------------------------------------
| Route Export
|-------------------------------------------------------------------------------
*/
export { router as placeRoutes }