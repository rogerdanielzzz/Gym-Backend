const { Gym, Costumer, Checkin, Sale, Paidamount } = require("../../db.js");
const { dateFormated, datewithHour, dayAdder } = require("../../utils/utils");

let resumeStat = async (req, res) => {
    const { gymId,dateStr } = req.body;

    //let dateG = dateFormated()
    let dateArr = dateStr.split("-")

    let newExpire = dayAdder(dateStr, 3)


    // let date = new Date();
    // let hour = `${date.getHours()}:${date.getMinutes()}`


    if (gymId) {

        try {

            let saleArray = await Sale.findAll({
                where: {
                    gymId,
                    year: dateArr[0],
                    month: dateArr[1],
                    day: dateArr[2],
                }
            })
            

            let costumerArray = await Costumer.findAll({
                where: {
                    gymId,
                    show:true
                }
            })
     /*       await Costumer.update({

                isActive: false,
            },
                {
                    where: {

                        expire: 
                    }
                })
*/
            let checkinArray = await Checkin.findAll({
                where: {
                    gymId,
                    acepted:true,
                    year: dateArr[0],
                    month: dateArr[1],
                    day: dateArr[2],
                }
            })

            let total = 0


            saleArray.forEach(element => {
                total = total + element.mustAmount
            });

            let filtered = costumerArray.filter((el) => (dateStr<= el.expire) && (el.expire <= newExpire) )



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
                    dateArr,
                 //   costumerArray,
                    customers: costumerArray.length,
                    toExpires: filtered.length,
                    prueba: filtered,
                    corte:newExpire,
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