const { Gym, Costumer, Checkin, Sale } = require("../../db.js");
const { dateFormated, datewithHour } = require("../../utils/utils");

let resumeStat = async (req, res) => {
    const { gymId } = req.body;

    let dateGetter = datewithHour()
    let dateArr = dateGetter.split("-")

    // let date = new Date();
    // let hour = `${date.getHours()}:${date.getMinutes()}`


    if (gymId) {

        try {

            let saleArray = await Sale.findAll({
                where: {
                    gymId,
                }
            })

            let costumerArray = await Costumer.findAll({
                where: {
                    gymId,
                }
            })

            /* if (costumer && gym) {
                 let acepted = costumer.expire >= dateGetter
                 let checkin = await Checkin.create({
                     acepted,
                     year: dateArr[0],
                     month: dateArr[1],
                     day: dateArr[2],
                     hour: dateArr[3]
                 })*/



            res.status(201).json(
                {
                    saleArray, costumerArray
                })

            /* } else {
                 res.status(201).json({ msg: "Cliente no Existe" })
 
             }*/




        } catch (err) {
            console.log(err)
            res.status(203).json({ error: err });

        }


    } else {

        res.status(201).json({ msg: "Currency Must be provide gymId and Idnumber of costumer" })



    }


}





module.exports = {
    resumeStat
}