const { Gym, Costumer } = require("../../db.js");
const { toCapitalize, dateFormated } = require("../../utils/utils");

let createCostumer = async (req, res) => {
    const { name, idNumber, idType, gymId,birthdate,cellphone } = req.body;
    let fnameCapitalized = toCapitalize(name)
    let idParsed = parseInt(idNumber)
    let idTypeUpper = idType.toUpperCase()
    let expire = dateFormated()

    try {
        let gym = await Gym.findOne({
            where: {
                id: gymId
            }
        })


        let costumer = await Costumer.create({
            fullname: fnameCapitalized,
            idNumber: idParsed,
            idType: idTypeUpper,
            birthdate,
            expire,
            cellphone,

        })

        await costumer.setGym(gym)

        res.status(201).json({ msg: costumer })

    } catch (err) {
        res.status(500).json({ err: err });

    }

}
let getAllCostumers = async (req, res) => {
    const { gymId } = req.params;
    try {
        let costumer = await Costumer.findAll({

            include: {
                model: Gym,
                where: {
                    id: gymId
                },
            }
        })
        res.status(201).json({ costumer, })
    } catch (err) {
        res.status(500).json({ err: err });
    }



}

let findCostumerbyId = (req, res) => {
    const { gymId, idNumber } = req.body;

    let idParsed = parseInt(idNumber)

    // Encuentra un usuario 
    Costumer.findOne({
        where: {
            idNumber: idParsed
        },
        include: {
            model: Gym,
            where: {
                id: gymId
            },
        }

    }).then((costumer) => {
        res.status(201).json({ costumer: costumer })
    }).catch(err => {
        res.status(500).json(err);
    });
}
module.exports = {
    createCostumer,
    getAllCostumers,
    findCostumerbyId
}