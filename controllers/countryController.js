import  express  from "express";
import Countries from "../models/countries.js";

const router = express.Router()



export const list = async(req , res) => {
    try{
        const countries = await Countries.findAll()
        res.status(200).json(countries)
    }
    catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ error: "Internal server error" });
      }
   
    }


// export const add = async(req , res) => {
//     try {
//         const {countries} = req.body
//         console.log(countries)
//         countries.map(async (country , index) => {
//             const newCountry = await Countries.create({
//                 countryName : country
//              });
//             console.log(country)
//         })
        
//         res.status(200).json("data received")

//     }

//     catch (error){
//         console.log(error)
//     }
// }

    




export default router