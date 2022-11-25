const { Gym, Costumer } = require("../../db.js");
const { toCapitalize, dateFormated } = require("../../utils/utils");

let createCostumer = async (req, res) => {
    const { firstName, lastName, idNumber, idType, gymRif } = req.body;
    let fnameCapitalized = toCapitalize(firstName)
    let lnameCapitalized = toCapitalize(lastName)
    let idParsed = parseInt(idNumber)
    let idTypeUpper = idType.toUpperCase()
    let rifUpper = gymRif.toUpperCase()
    let expire = dateFormated()

    try {
        let gym = await Gym.findOne({
            where: {
                rif: rifUpper
            }
        })


        let costumer = await Costumer.create({
            firstName: fnameCapitalized,
            lastName: lnameCapitalized,
            idNumber: idParsed,
            idType: idTypeUpper,
            expire,

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
    const { gymRif, idNumber } = req.body;

    let idParsed = parseInt(idNumber)
    let rifUpper = gymRif?.toUpperCase()

    // Encuentra un usuario 
    Costumer.findOne({
        where: {
            idNumber: idParsed
        },
        include: {
            model: Gym,
            where: {
                rif: rifUpper
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