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
        const { employeName , employeEmail , employeDob , employeCountry , joiningDate ,image} = req.body
        // console.log(employeName , employeEmail , employeDob , employeCountry , joiningDate)
        // const image = req.file;

  
      // if (!image) {
      //   return res.status(400).send('Image file is required.');
      // }
        
      const newEmploye = await Employe.create({
         employeName : employeName ,
         employeEmail : employeEmail,
         employeDob : employeDob ,
         employeCountry : employeCountry,
         joiningDate : joiningDate,
         image: image,
      });
      console.log('employe created:', newEmploye.toJSON());
      
      res.send(newEmploye.toJSON());
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error creating user.');
    }
  };


  
  
  export const update =  async ( req , res) => {
    try{
      const { employeEmail ,employeName ,employeDob , employeCountry , joiningDate } = req.body
      const employe = await Employe.findOne({where : {employeEmail : employeEmail}})
      
      employe.update({
        employeName : employeName , 
        employeDob : employeDob,
        employeCountry : employeCountry ,
        joiningDate : joiningDate
        
      })
  
      console.log("employeUpdated : " , employe.toJSON())
  
      res.status(200).send("employeupdated : " , employe.toJSON())
    }
  
    catch(error) {
      console.log( "employe not updated : " , error )
      res.status(500).send("employe not found")
    }
  }


export const deleteEmploye  = async (req, res) => {
  try {
    const { employeEmail  } = req.body;
    const employe = await Employe.findOne({ where: { employeEmail: employeEmail } });

    if (employe) {
      await employe.destroy();
      console.log("Employee Deleted:", employe.toJSON());
      res.status(200).send("Employee Deleted: " + JSON.stringify(employe.toJSON()));
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