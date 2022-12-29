const { Gym, User, Plan, Payment } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");

let createGym = async (req, res) => {
    const { name, rif, userEmail } = req.body;
    // Encriptamos la contraseña
    let nameCapitalized = toCapitalize(name)
    let emailLower = userEmail.toLowerCase()
    let rifUpper = rif.toUpperCase()

    try {

        let user = await User.findOne({
            where: {
                email: emailLower
            }
        })

        let gym = await Gym.create({
            name: nameCapitalized,
            rif: rifUpper,

        })

        await gym.setUser(user)



        let userGym = await User.findOne({
            where: {
                email: emailLower
            },
            include: [
                {
                    model: Payment
                },
                {
                    model: Plan
                },
                {
                    model: User
                },
            ]
        })


        res.status(201).json({ user: userGym })



    } catch (err) {
        res.status(203).json(err);

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
        include: [
            {
                model: Payment
            },
            {
                model: Plan
            },
            {
                model: User
            },
        ]

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
        include: [
            {
                model: Payment
            },
            {
                model: Plan
            },
            {
                model: User
            },
        ]

    }).then((gym) => {
        res.status(201).json({ gym: gym })
    }).catch(err => {
        res.status(500).json(err);
    });
}


const softDeleteGym = async(req,res)=>{
    const {gymId}= req.body
    try {
        await Gym.update({ active:false }, { where: { id: gymId} })
        res.status(201).json({ success: "Gym Disabled" });
    } catch (e) {
        res.status(404).json({ error: e.message });
    }

}

module.exports = {
    createGym,
    findGymByName,
    findGymByRif,
    softDeleteGym
}