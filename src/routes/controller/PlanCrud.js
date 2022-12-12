const { Gym, Plan } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");

let createPlan = async (req, res) => {
    const {gymId, planName,durationUnit,price} = req.body;
 
    if((durationUnit==="Day")||(durationUnit==="Week")||((durationUnit==="Month"))){

        let nameCapitalized = toCapitalize(planName)
        let priceParsed = parseFloat(price)
        
   

        try {
            let gym = await Gym.findOne({
                where: {
                    id: gymId
                }
            })
    
            let plan = await Plan.create({
                planName: nameCapitalized,
                price: priceParsed,
                durationUnit,

            })
    
            await plan.setGym(gym)
    
    
        
                res.status(201).json({ msg: "Plan price created" })
           
          
    
        } catch (err) {
            console.log(err)
            res.status(203).json({error:err});
    
        }


    }else{

        res.status(201).json({ msg: "Please provide duration in Day , Week or Month" })



    }
    

}

const getPlans= async(req, res)=>{
    const {gymId}= req.body
    if (gymId){
    try {
        
        let plan = await Plan.findAll({
            where: {
                gymId,
            }
        })

        res.status(200).json({plan,});
    } catch (error) {
        res.status(203).json({error:error});
        
    }
} else{
    res.status(203).json({error: "gymId must be send by req.body"});
   
}
}

module.exports = {
    createPlan,
    getPlans
}