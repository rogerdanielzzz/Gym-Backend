const { Gym, Plan } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");

let createPlan = async (req, res) => {
    const { gymId, planName, durationUnit, durationQty, price } = req.body;

    if ((durationUnit === "Day") || (durationUnit === "Week") || ((durationUnit === "Month")) || ((durationUnit === "Year"))) {

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
                durationQty

            })

            await plan.setGym(gym)



            res.status(201).json({ msg: "Plan price created" })



        } catch (err) {
            console.log(err)
            res.status(203).json({ error: err });

        }


    } else {

        res.status(201).json({ msg: "Please provide duration in Day , Week or Month" })



    }


}

const getPlans = async (req, res) => {
    const { gymId } = req.body
    if (gymId) {
        try {

            let plan = await Plan.findAll({
                where: {
                    gymId,
                    active: true
                }
            })

            res.status(200).json({ plan, });
        } catch (error) {
            res.status(203).json({ error: error });

        }
    } else {
        res.status(203).json({ error: "gymId must be send by req.body" });

    }
}



const softDeletePlan = async (req, res) => {
    const { planId } = req.body
    if (planId) {
        try {
            await Plan.update({ active: false }, { where: { id: planId } })
            res.status(201).json({ success: "Plan Disabled" });
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    } else res.status(404).json({ error: "planId must be Sent" });


}

let planUpdater = async (req, res) => {
    const { id, plan } = req.body;
    let newPlan = { ...plan }


    if (id && plan.price && plan.durationQty && plan.durationUnit && plan.planName) {
        newPlan.price = parseInt(plan.price)
        newPlan.durationQty = parseInt(plan.durationQty)
        newPlan.planName = toCapitalize(plan.planName)
        newPlan.durationUnit = toCapitalize(plan.durationUnit)

        try {
            await Plan.update(newPlan, { where: { id: id } })
            res.status(201).json({ success: "plan Modified" });
        } catch (e) {
            res.status(404).json({ error: e.message });
        }

    } else res.status(404).json({ error: "Must be send Id and plan" });

}
module.exports = {
    createPlan,
    getPlans,
    softDeletePlan,
    planUpdater
}