const { Gym, Costumer, Checkin } = require("../../db.js");
const { dateFormated } = require("../../utils/utils");

let checkInRegister = async (req, res) => {
    const { idType, idNumber, gymId } = req.body;

    let dateGetter = dateFormated()
    let dateArr = dateGetter.split("-")

    let date = new Date();
    let hour = `${date.getHours()}:${date.getMinutes()}`


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
                }
            })

            if (costumer && gym) {
                let acepted = costumer.expire > dateGetter
                let checkin = await Checkin.create({
                    acepted,
                    year: dateArr[0],
                    month: dateArr[1],
                    day: dateArr[2],
                    hour: hour
                })

                await checkin.setGym(gym)
                await checkin.setCostumer(costumer)

                res.status(201).json({ success: checkin })

            } else {
                res.status(201).json({ error: "Cliente no Existe" })

            }




        } catch (err) {
            console.log(err)
            res.status(203).json({ error: err });

        }


    } else {

        res.status(201).json({ msg: "Currency Must be provide gymId and Idnumber of costumer" })



    }


}


module.exports = {
    checkInRegister,

}