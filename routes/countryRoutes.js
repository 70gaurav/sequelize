import express from "express"
import { list } from "../controllers/countryController.js"
 

const router = express.Router()

router.get("/list" ,list)
// router.post("/add" ,add)

export default router