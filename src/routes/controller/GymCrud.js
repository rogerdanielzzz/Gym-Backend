const { Gym, User } = require("../../db.js");
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


        setTimeout(async() => {
            let userGym = await User.findOne({
                where: {
                    email: emailLower
                },include: Gym
            })
    
    
            res.status(201).json({ user: userGym })
          }, "2000")

      

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