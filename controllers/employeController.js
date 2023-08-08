import Employe from "../models/Employe.js";
import  express  from "express";

const router = express.Router()


export const list =  async (req, res) => {
    try {
      const employe = await Employe.findAll();
      res.status(200).json(employe);
    } catch (error) {
      console.error("Error fetching employe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  
  export const add =  async (req, res) => {
    try {
        const { name , email , dob , country , joining } = req.body
        console.log(name  , dob , country , joining)
      const newEmploye = await Employe.create({
         employeName : name ,
         employeEmail : email,
         employeDob : dob ,
         employeCountry : country,
         joiningDate : joining
      });
      console.log('employe created:', newEmploye.toJSON());
      
      res.send(newEmploye.toJSON());
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error creating user.');
    }
  };
  
  
//   app.post("/find" , (async(req ,res) => {
//    try { const {name} = req.body
//       const foundUser = await User.findOne({ where: { username: name } });
//       console.log('User found:', foundUser.toJSON());
//       res.send(foundUser.toJSON())}
  
//       catch (err){
//         console.log(err)
//         res.status(500).send("user not found")
  
//       }
//   }))
  
  export const update =  async ( req , res) => {
    try{
      const { email ,name ,dob , country , joining } = req.body
      const employe = await Employe.findOne({where : {employeEmail : email}})
      
      employe.update({
        employeName : name , 
        employeDob : dob,
        employeCountry : country ,
        joiningDate : joining
        
      })
  
      console.log("employeUpdated :" , employe.toJSON())
  
      res.send("employeupdated :" , employe.toJSON())
    }
  
    catch(error) {
      console.log( "employe not updated : " , error )
      res.status(500).send("employe not found")
    }
  }


export const deleteEmploye  = async (req, res) => {
  try {
    const { name  } = req.body;
    const employe = await Employe.findOne({ where: { EmployeName: name } });

    if (employe) {
      await employe.destroy();
      console.log("Employee Deleted:", employe.toJSON());
      res.status(200).send("Employee Deleted: " + JSON.stringify(employe.toJSON()));
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.log("Employee not deleted:", error);
    res.status(500).send("Error deleting employee");
  }
};



router.post("/add" ,add )
router.get("/list" , list)
router.post("/delete" , deleteEmploye)
router.post("/update" , update)
export default router