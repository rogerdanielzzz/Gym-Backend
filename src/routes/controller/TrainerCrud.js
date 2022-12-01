const { Gym, User, Trainer } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");

let createTrainer = async (req, res) => {
    const {name  ,idNumber ,idType, gymId } = req.body;
    // Encriptamos la contraseña
    let fnameCapitalized = toCapitalize(name)
    let idParsed= parseInt(idNumber)
    let idTypeUpper = idType.toUpperCase()


    try {

        let gym = await Gym.findOne({
            where: {
                id: gymId
            }
        })

        let trainer = await Trainer.create({
            fullname: fnameCapitalized,
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
    const { gymId } = req.body;
    // Encuentra un usuario 
   try {
    let trainers= await Trainer.findAll({
       
        include:{
            model:Gym,
            where: {
                id: gymId
            },
        }
    })
        res.status(201).json({ trainers, })
   } catch (err) {
    res.status(500).json({ err: err });
}
   
    

}

let findTrainerbyId = (req, res) => {
    const { gymId, idNumber } = req.body;
    let idParsed = parseInt(idNumber)

    

    // Encuentra un usuario 
    Trainer.findOne({
        where: {
            idNumber: idParsed
        },
        include: {
            model:Gym,
            where: {
                id: gymId
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