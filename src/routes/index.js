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
const { inscription, renovation, saleReport} = require('./controller/SaleController');




//User Crud
router.post("/signup",createUser )
router.get("/finduser",findUserByEmail)
router.put("/userupdater",userActiveUpdater)

//Gym Crud
router.post("/creategym",createGym)
router.get("/gymname",findGymByName)
router.get("/gymrif",findGymByRif)

//Trainer Crud
router.post("/createtrainer",createTrainer)
router.get("/findtrainer",findTrainerbyId)
router.get("/gettrainers",getAllTrainers)

//costumer Crud
router.post("/createcostumer",createCostumer)
router.get("/findcostumer",findCostumerbyId)
router.get("/getcostumers/:gymId",getAllCostumers)

//Sale Creator
router.post("/inscription",inscription)
router.post("/renovation",renovation)

//Sale Report
router.get("/sales",saleReport)

//User auth
router.post("/signin",singIn )










module.exports = router;
