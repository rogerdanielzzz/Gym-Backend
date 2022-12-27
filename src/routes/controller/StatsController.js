const { Gym, Costumer, Checkin, Sale, Paidamount } = require("../../db.js");
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
            let checkinArray = await Checkin.findAll({
                where: {
                    gymId,
                }
            })

            let total = 0
            let totalCheckins = 0


            saleArray.forEach(element => {
               total= total+ element.mustAmount
            });
        


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
                    saleArray, 
                    costumerArray,
                    customers: costumerArray.length,
                    total,
                    totalCheckins: checkinArray.length,
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