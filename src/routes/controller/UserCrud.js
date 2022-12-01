const { User, Gym } = require("../../db.js");
const { toCapitalize } = require("../../utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { encryptKey,
    encryptRounds,
    encryptExpiration} = process.env;

let createUser = (req, res) => {
    const { name, email, password, birthDate, cellphone, address } = req.body;
    // Encriptamos la contraseña
    let passwordEncrypt = bcrypt.hashSync(password, Number.parseInt(encryptRounds));
    let nameCapitalized = toCapitalize(name)
    let emailLower = email.toLowerCase()

    // Crear un usuario
    User.create({

        fullname:nameCapitalized ,
        email: emailLower,
        password: passwordEncrypt,
        birthDate,
        cellphone,
        address,
        
    }).then((user)=>{

        let token = jwt.sign({ user: user }, encryptKey, {
            expiresIn: encryptExpiration
        });

        res.status(201).json({user, token,})
    }).catch(err => {
        res.status(200).json({msg: err});
    });

}
let findUserByEmail = (req, res) => {
    const {email} = req.params;

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
let singIn = (req, res) => {
    let { email, password } = req.body;
    let emailLower = email.toLowerCase()

    // Buscar usuario
    User.findOne({
        where: {
            email: emailLower
        },include: Gym
    }).then(user => {

    
            if (!user) {
                res.status(200).json({ msg: "Email no existe" });
            } else {
                // Verificar contraseña
                if (bcrypt.compareSync(password, user.password)) {
    
                    // Creamos el token
                    let token = jwt.sign({ user: user }, encryptKey, {
                        expiresIn: encryptExpiration
                    });
    
                    res.json({
                        user: user,
                        token: token
                    })
    
                } else {
                    // Unauthorized Access
                    res.status(200).json({ msg: "Contraseña incorrecta" })
                }
        }
     
    }).catch(err => {
        res.status(500).json(err);
    })
}



module.exports = {
    createUser,
    findUserByEmail,
    userActiveUpdater,
    singIn
}