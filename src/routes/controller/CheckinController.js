const { Gym, Costumer, Checkin } = require("../../db.js");
const { dateFormated, datewithHour } = require("../../utils/utils");

let checkInRegister = async (req, res) => {
    const { idType, idNumber, gymId, dateFormated, datewithHour } = req.body;

    let dateGetter = datewithHour
    let dateOnly= dateFormated
    let dateArr = dateGetter.split("-")
    if ((idNumber) || (idType) || (gymId)) {

        try {

            let gym = await Gym.findOne({
                where: {
                    id: gymId
                }
            })

            let costumer = await Costumer.findOne({
                where: {
                    idType,
                    idNumber,
                    gymId,
                    show:true
                }
            })

            if (costumer && gym) {
                let acepted = costumer.expire >= dateOnly
                let checkin = await Checkin.create({
                    acepted,
                    year: dateArr[0],
                    month: dateArr[1],
                    day: dateArr[2],
                    hour: dateArr[3]
                })

                await checkin.setGym(gym)
                await checkin.setCostumer(costumer)

                res.status(201).json(
                    {
                        success: checkin,
                        costumer,
                        gym,
                    })

            } else {
                res.status(201).json({ msg: "Cliente no Existe" })

            }




        } catch (err) {
            console.log(err)
            res.status(203).json({ error: err });

        }


    } else {

        res.status(201).json({ msg: "Currency Must be provide gymId and Idnumber of costumer" })



    }


}

let getCheckins = async (req, res) => {
    const { gymId, dateFormated } = req.body;
    let dateArr = dateFormated.split("-")
    if (gymId) {

        try {

            let gym = await Gym.findOne({
                where: {
                    id: gymId
                }
            })

            if (gym) {
                let checkin = await Checkin.findAll({
                    where: {
                        gymId,
                        day: dateArr[2],
                        month: dateArr[1],
                        year: dateArr[0]

                    },
                    include: {
                        model: Costumer
                    }
                })


                res.status(201).json({ success: checkin })

            } else {
                res.status(201).json({ error: "Gimnasio no Existe" })

            }




        } catch (err) {
            console.log(err)
            res.status(203).json({ error: err });

        }


    } else {

        res.status(201).json({ error: "Currency Must be provide gymId and Idnumber of costumer" })



    }


}




module.exports = {
    checkInRegister,
    getCheckins
}