const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
//Midlleware que protege ruta, cuando este definido se usara

const { validator } = require('./middleware/validatorMid');
const { createUser, findUserByEmail, userActiveUpdater} = require('./controller/UserCrud');
const { createGym,findGymByName,findGymByRif } = require('./controller/GymCrud');

//User Crud
router.post("/create",createUser )
router.get("/finduser",findUserByEmail)
router.put("/userupdater",userActiveUpdater)

//Gym Crud
router.post("/creategym",createGym)
router.get("/gymname",findGymByName)
router.get("/gymrif",findGymByRif)






module.exports = router;
