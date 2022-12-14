const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
//Midlleware que protege ruta, cuando este definido se usara

const { validator } = require('./middleware/validatorMid');
const { createUser, findUserByEmail, userActiveUpdater,singIn, userUpdater} = require('./controller/UserCrud');
const { createGym,findGymByName,findGymByRif, softDeleteGym } = require('./controller/GymCrud');
const { createTrainer,getAllTrainers,findTrainerbyId } = require('./controller/TrainerCrud');
const { createCostumer,getAllCostumers,findCostumerbyId,customerUpdater,softDeleteCustomer } = require('./controller/CostumerCrud');
const { inscription, renovation, saleReport, getSales, getPaymentTotal, outCome} = require('./controller/SaleController');
const { createPayment, getPayments,softDeletePayment, deletePayment} = require('./controller/PaymentCrud');
const { createPlan, getPlans, softDeletePlan, planUpdater} = require('./controller/PlanCrud');
const { checkInRegister, getCheckins} = require('./controller/CheckinController');
const { resumeStat} = require('./controller/StatsController');








//User Crud
router.post("/signup",createUser )
router.get("/finduser/:email",findUserByEmail)
router.put("/userupdater",userActiveUpdater)
router.put("/updateuser",userUpdater )


//Gym Crud
router.post("/creategym",createGym)
router.get("/gymname",findGymByName)
router.get("/gymrif",findGymByRif)
router.post("/deletegym",softDeleteGym)
//Payment Crud
router.post("/addpayment",createPayment )
router.post("/getpayments",getPayments )
router.put("/paymentdisabler",softDeletePayment )
router.delete("/harddeletepayment",deletePayment )



//Plan Crud
router.post("/addplan",createPlan )
router.post("/getplans",getPlans )
router.put("/plandisabler",softDeletePlan )
router.put("/updateplan",planUpdater )




//Trainer Crud
router.post("/createtrainer",createTrainer)
router.get("/findtrainer",findTrainerbyId)
router.get("/gettrainers",getAllTrainers)

//costumer Crud
router.post("/createcostumer",createCostumer)
router.post("/findcostumer",findCostumerbyId)
router.get("/getcostumers/:gymId",getAllCostumers)
router.put("/updatecustomer",customerUpdater )
router.put("/customerdisabler",softDeleteCustomer )



//Sale Creator
router.post("/inscription",inscription)
router.post("/renovation",renovation)

//Sale Report
router.post("/sales",getSales)
router.post("/paymenttotal",getPaymentTotal)

//Outcome o Egresos
router.post("/outcome",outCome)


//User auth
router.post("/signin",singIn )

// Checking register

router.post("/checkin",checkInRegister )
router.post("/getcheckin",getCheckins )

// Stats
router.post("/resume",resumeStat)













module.exports = router;
