const { Gym, User, Trainer } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");

let createTrainer = async (req, res) => {
    const {firstName ,lastName ,idNumber ,idType, gymRif } = req.body;
    // Encriptamos la contraseña
    let fnameCapitalized = toCapitalize(firstName)
    let lnameCapitalized = toCapitalize(lastName)
    let rifParsed= parent(idNumber)
    let rifUpper = gymRif.toUpperCase()

    try {

        let gym = await Gym.findOne({
            where: {
                rif: rifUpper
            }
        })

        let trainer = await Trainer.create({
            firstName: nameCapitalized,
            rif: rifUpper,
            cellphone
        })

        await gym.setUser(user)

        res.status(201).json({ msg: gym })

    } catch (err) {
        res.status(500).json(err);

    }

}
let findGymByRif = (req, res) => {
    const { rif } = req.body;
    let rifUpper = rif.toUpperCase()
    // Encuentra un usuario 
    Gym.findOne({
        where: {
            rif: rifUpper
        },
        include: User

    }).then((gym) => {
        res.status(201).json({ gym: gym })
    }).catch(err => {
        res.status(500).json(err);
    });
}

let findGymByName = (req, res) => {
    const { name } = req.body;
    let nameCapitalized = toCapitalize(name)

    // Encuentra un usuario 
    Gym.findAll({
        where: {
            name: nameCapitalized
        },
        include: User

    }).then((gym) => {
        res.status(201).json({ gym: gym })
    }).catch(err => {
        res.status(500).json(err);
    });
}
module.exports = {
    createGym,
    findGymByName,
    findGymByRif
}