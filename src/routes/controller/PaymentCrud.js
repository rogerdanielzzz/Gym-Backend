const { Gym, Payment } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");

let createPayment = async (req, res) => {
    const { name, gymId, currency, description,banco ,correo,telefono,cedula,cuenta} = req.body;


    if((currency==="USD")||(currency==="BS")){

        let nameCapitalized = toCapitalize(name)
        
   

        try {
    
            let gym = await Gym.findOne({
                where: {
                    id: gymId
                }
            })
    
            let payment = await Payment.create({
                name: nameCapitalized,
                currency,
                description,
                banco,
                correo,
                telefono,
                cedula,
                cuenta
            })
    
            await payment.setGym(gym)
    
    
        
                res.status(201).json({ msg: "Payment method added" })
           
          
    
        } catch (err) {
            console.log(err)
            res.status(203).json({error:err});
    
        }


    }else{

        res.status(201).json({ msg: "Currency Must be USD or BS" })



    }
    

}

const getPayments= async(req, res)=>{
    const {gymId}= req.body
    if (gymId){
    try {
        
        let payment = await Payment.findAll({
            where: {
                gymId,
            }
        })

        res.status(200).json({payment,});
    } catch (error) {
        res.status(203).json({error:error});
        
    }
} else{
    res.status(203).json({error: "gymId must be send by req.body"});
   
}
}

module.exports = {
    createPayment,
    getPayments
}