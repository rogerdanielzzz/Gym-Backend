const { User, Gym } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");
const bcrypt = require("bcrypt");
const { encryptRounds} = process.env;

let createUser = (req, res) => {
    const { name, lastname, email, password, birthDate, cellphone, address } = req.body;
    // Encriptamos la contraseña
    let passwordEncrypt = bcrypt.hashSync(password, Number.parseInt(encryptRounds));
    let nameCapitalized = toCapitalize(name)
    let lastNameCapitalized = toCapitalize(lastname)
    let emailLower = email.toLowerCase()

    // Crear un usuario
    User.create({

        name: nameCapitalized,
        lastname: lastNameCapitalized,
        email: emailLower,
        password: passwordEncrypt,
        birthDate,
        cellphone,
        address,
        
    }).then((user)=>{
        res.status(201).json({user: user})
    }).catch(err => {
        res.status(500).json(err);
    });

}
let findUserByEmail = (req, res) => {
    const {email} = req.body;

    let emailLower = email.toLowerCase()

    // Encuentra un usuario 
    User.findOne({where:{
        email: emailLower
    },
    include: Gym
        
    }).then((user)=>{
        res.status(201).json({user: user})
    }).catch(err => {
        res.status(500).json(err);
    });
}

let userActiveUpdater = async (req, res) => {
    const {isActive, email} = req.body;
    let msg= isActive?  "Usuario Activo":"Usuario Desactivado";
    let emailLower = email.toLowerCase()

    try {

      await  User.update({isActive,},{where:{email:emailLower}})
        res.status(201).json({msg,});
    } catch (e) {
        res.status(404).json({error: e.message});
    }

   

}
module.exports = {
    createUser,
    findUserByEmail,
    userActiveUpdater
}