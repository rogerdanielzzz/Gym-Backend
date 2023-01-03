const { Gym, Costumer } = require("../../db.js");
const { toCapitalize, dateFormated } = require("../../utils/utils");

let createCostumer = async (req, res) => {
    const { fullname, idNumber, idType, gymId, birthdate, cellphone, preNumber } = req.body;
    let fnameCapitalized = toCapitalize(fullname)
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
            cellphone: preNumber + "-" + cellphone

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
    const { gymId, idNumber, idType } = req.body;

    let idParsed = parseInt(idNumber)

    // Encuentra un usuario 
    Costumer.findOne({
        where: {
            idNumber: idParsed,
            idType,
            gymId,
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


let customerUpdater = async (req, res) => {
    const { id, customer } = req.body;
    let newCustomer = { ...customer }


    if (id && customer && customer.tipo && customer.idNumber && customer.fullname) {
        newCustomer.idNumber = parseInt(customer.idNumber)
        newCustomer.idType = customer.tipo?.toUpperCase()
        newCustomer.fullname = toCapitalize(customer.fullname)
        //  newCustomer.email = customer.email?.toLowerCase()
        let idChecker = await Costumer.findOne({ where: { idNumber: newCustomer.idNumber } })
        if (!idChecker || idChecker.id == id) {
            try {
                await Costumer.update(newCustomer, { where: { id: id } })
                res.status(201).json({ success: "Customer Modified" });
            } catch (e) {
                res.status(404).json({ error: e.message });
            }
        } else res.status(203).json({ error: "IdNumber already exist" });

    } else res.status(404).json({ error: "Must be send Id and Customer" });


}



module.exports = {
    createCostumer,
    getAllCostumers,
    findCostumerbyId,
    customerUpdater
}