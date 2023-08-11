import Employe from "../models/Employe.js";
import  express  from "express";
import logger from "../logger/logger.js";

const router = express.Router()



export const list =  async (req, res) => {
    try {
      const employe = await Employe.findAll();
      res.status(200).json(employe);
    } catch (error) {

      // console.error("Error fetching employe:", error);

      logger.error("error fetching employe list:" , error )
      res.status(500).json({ error: "Internal server error" });
    }
  };
 
  
  
  
  export const add =  async (req, res) => {
    try {
        const { employeName , employeEmail , employeDob , employeCountry , joiningDate} = req.body

        const employe = await Employe.findOne({ where: { employeEmail: employeEmail } });

        if (employe) {
          console.log("Email already exist :");
          res.status(500).send("Error adding employee");
          logger.error("adding employe with existing  email" )
        }
        // console.log(employeName , employeEmail , employeDob , employeCountry , joiningDate)
        const image = req.file;
        console.log(image)

  
      // if (!image) {
      //   return res.status(400).send('Image file is required.');
      // }
        
      const newEmploye = await Employe.create({
         employeName : employeName ,
         employeEmail : employeEmail,
         employeDob : employeDob ,
         employeCountry : employeCountry,
         joiningDate : joiningDate,
         image: "http://localhost:3000/uploads/"+image.filename,
      });
      logger.info('Employee created:', newEmploye.toJSON());
      
      res.send(newEmploye.toJSON());
    } catch (error) {
      // console.error('Error:', error);
      logger.error("error:" , error )
      res.status(500).send('Error creating user.');
    }
  };


  
  
  // export const update =  async ( req , res) => {
  //   try{
  //     const { employeEmail ,employeName ,employeDob , employeCountry , joiningDate } = req.body
  //     console.log(employeEmail ,employeName ,employeDob , employeCountry , joiningDate)
  //     const employe = await Employe.findOne({where : {employeEmail : employeEmail}})
      
  //     employe.update({
  //       employeName : employeName , 
  //       employeDob : employeDob,
  //       employeCountry : employeCountry ,
  //       joiningDate : joiningDate
        
  //     })
  
  //     // console.log("employeUpdated : " , employe.toJSON())
  //     logger.info("employeUpdated : " , employe.toJSON());

  
  //     res.status(200).send("employeupdated : " , employe.toJSON())
  //   }
  
  //   catch(error) {
  //     // console.log( "employe not updated : " , error )
  //     logger.error("employe not updated:" , error )
  //     res.status(500).send("employe not found")
  //   }
  // }

  export const update = async (req, res) => {
    try {
      const { employeEmail, employeName, employeDob, employeCountry, joiningDate, image } = req.body;
      console.log(employeEmail, employeName, employeDob, employeCountry, joiningDate ,image);
      const employe = await Employe.findOne({ where: { employeEmail: employeEmail } });
  
      if (!employe) {
       
        logger.warn('Employee not found for update');
        return res.status(404).send('Employee not found');
      }
  
      await employe.update({
        employeName: employeName,
        employeDob: employeDob,
        employeCountry: employeCountry,
        joiningDate: joiningDate,
        image: image
      });
  
      logger.info('Employee updated:', employe.toJSON());
      res.status(200).json(employe.toJSON());
    } catch (error) {
      logger.error('Error updating employee:', error);
      res.status(500).send('Error updating employee');
    }
  };


export const deleteEmploye  = async (req, res) => {
  try {
    const { employeEmail  } = req.body;
    const employe = await Employe.findOne({ where: { employeEmail: employeEmail } });

    if (employe) {
      await employe.destroy();
      // console.log("Employee Deleted:", employe.toJSON());


      logger.info("employe deleted : " , employe.toJSON());
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