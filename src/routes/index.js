const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
//Midlleware que protege ruta, cuando este definido se usara

const { validator } = require('./middleware/validatorMid');
const { createUser, findUserByEmail, userActiveUpdater,singIn} = require('./controller/UserCrud');
const { createGym,findGymByName,findGymByRif } = require('./controller/GymCrud');
const { createTrainer,getAllTrainers,findTrainerbyId } = require('./controller/TrainerCrud');
const { createCostumer,getAllCostumers,findCostumerbyId } = require('./controller/CostumerCrud');
const { inscription, renovation, saleReport, getSales} = require('./controller/SaleController');
const { createPayment, getPayments,softDeletePayment, deletePayment} = require('./controller/PaymentCrud');
const { createPlan, getPlans} = require('./controller/PlanCrud');
const { checkInRegister, getCheckins} = require('./controller/CheckinController');







//User Crud
router.post("/signup",createUser )
router.get("/finduser/:email",findUserByEmail)
router.put("/userupdater",userActiveUpdater)

//Gym Crud
router.post("/creategym",createGym)
router.get("/gymname",findGymByName)
router.get("/gymrif",findGymByRif)
//Payment Crud
router.post("/addpayment",createPayment )
router.post("/getpayments",getPayments )
router.put("/paymentdisabler",softDeletePayment )
router.delete("/harddeletepayment",deletePayment )



//Plan Crud
router.post("/addplan",createPlan )
router.post("/getplans",getPlans )


//Trainer Crud
router.post("/createtrainer",createTrainer)
router.get("/findtrainer",findTrainerbyId)
router.get("/gettrainers",getAllTrainers)

//costumer Crud
router.post("/createcostumer",createCostumer)
router.post("/findcostumer",findCostumerbyId)
router.get("/getcostumers/:gymId",getAllCostumers)

//Sale Creator
router.post("/inscription",inscription)
router.post("/renovation",renovation)

//Sale Report
router.post("/sales",getSales)

//User auth
router.post("/signin",singIn )

// Checking register

router.post("/checkin",checkInRegister )
router.post("/getcheckin",getCheckins )












module.exports = router;
