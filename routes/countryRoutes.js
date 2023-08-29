import express from "express"
import { list } from "../controllers/countryController.js"
import {verifyToken} from "../middleware/middleware.js"

 

const router = express.Router()

router.use(verifyToken)

router.get("/list" ,list)


export default router