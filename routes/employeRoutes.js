import express from 'express';
import { add ,deleteEmploye,list, update } from "../controllers/employeController.js"

const employeRouter = express.Router();

employeRouter.post("/add" , add);
employeRouter.get("/list" , list);
employeRouter.post("/delete" , deleteEmploye)
employeRouter.post("/update" , update)
// employeRouter.post();

export default employeRouter;