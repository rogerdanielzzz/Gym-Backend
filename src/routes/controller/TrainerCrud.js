const { Gym, User, Trainer } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");

let createTrainer = async (req, res) => {
    const {firstName ,lastName ,idNumber ,idType, gymRif } = req.body;
    // Encriptamos la contraseña
    let fnameCapitalized = toCapitalize(firstName)
    let lnameCapitalized = toCapitalize(lastName)
    let idParsed= parseInt(idNumber)
    let idTypeUpper = idType.toUpperCase()

    let rifUpper = gymRif.toUpperCase()

    try {

        let gym = await Gym.findOne({
            where: {
                rif: rifUpper
            }
        })

        let trainer = await Trainer.create({
            firstName: fnameCapitalized,
           lastName: lnameCapitalized,
           idNumber: idParsed,
           idType: idTypeUpper
        })

        await trainer.setGym(gym)

        res.status(201).json({ msg: trainer })

    } catch (err) {
        res.status(500).json({ err: err });

    }

}
let getAllTrainers = async (req, res) => {
    const { gymRif } = req.body;
    let rifUpper = gymRif?.toUpperCase()
    // Encuentra un usuario 
   try {
    let trainers= await Trainer.findAll({
       
        include:{
            model:Gym,
            where: {
                rif: rifUpper
            },
        }
    })
        res.status(201).json({ trainers, })
   } catch (err) {
    res.status(500).json({ err: err });
}
   
    

}

let findTrainerbyId = (req, res) => {
    const { gymRif, idNumber } = req.body;
    let idParsed = parseInt(idNumber)

    
    let rifUpper = gymRif?.toUpperCase()

    // Encuentra un usuario 
    Trainer.findOne({
        where: {
            idNumber: idParsed
        },
        include: {
            model:Gym,
            where: {
                rif: rifUpper
            },
        }

    }).then((gym) => {
        res.status(201).json({ gym: gym })
    }).catch(err => {
        res.status(500).json(err);
    });
}
module.exports = {
    createTrainer,
    getAllTrainers,
    findTrainerbyId
}