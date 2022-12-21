const { Gym, Payment } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");

let createPayment = async (req, res) => {
    const { name, gymId, currency, description,banco ,correo,tipoTel,telefono,Ncedula,nCuenta,tipo} = req.body;
let cedula;
let celular;

    if (tipo&&Ncedula) cedula= tipo+"-"+Ncedula
    if (tipoTel&&telefono) celular= tipoTel+"-"+telefono


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
                telefono:celular,
                cedula,
                cuenta: nCuenta
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
                active:true
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

const softDeletePayment = async(req,res)=>{
    const {gymId,paymentId}= req.body
    try {

        await Payment.update({ active:false }, { where: { gymId: gymId, id: paymentId } })
        res.status(201).json({ success: "Payment Disable" });
    } catch (e) {
        res.status(404).json({ error: e.message });
    }

}

const deletePayment = async(req,res)=>{
    const {gymId,paymentId}= req.body
    try {

        await Payment.destroy({ where: { gymId: gymId, id: paymentId } })
        res.status(201).json({ success: "Payment Deleted" });
    } catch (e) {
        res.status(404).json({ error: e.message });
    }

}

module.exports = {
    createPayment,
    getPayments,
    deletePayment,
    softDeletePayment
}