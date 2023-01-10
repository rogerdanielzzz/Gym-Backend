const { Gym, Costumer, Checkin, Sale, Paidamount, Payment } = require("../../db.js");
const { dateFormated, datewithHour, dayAdder } = require("../../utils/utils");

let resumeStat = async (req, res) => {
    const { gymId, dateStr } = req.body;

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
                },
                include: [
                    {
                        model: Paidamount,
                        include: Payment
                    },
                ]
            })


            let costumerArray = await Costumer.findAll({
                where: {
                    gymId,
                    show: true
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
                    acepted: true,
                    year: dateArr[0],
                    month: dateArr[1],
                    day: dateArr[2],
                }
            })

            let totalIncome = {
                refUSD: 0,
                usd: 0,
                bs: 0,
            }
            let totalOutcome = {
                bs: 0,
                usd: 0
            }


        /*    saleArray.forEach(element => {
                if (element.mustAmount < 0 && element.description == "Egreso") {
                    if (element.paidamount[0].payment.currency == "USD") {
                        totalOutcome.usd = totalOutcome.usd + element.paidamount[0].amount
                    } else {
                        totalOutcome.bs = totalOutcome.bs + element.paidamount[0].amount
                    }


                } else {
                    totalIncome.refUSD = totalIncome.refUSD + element.mustAmount

                    element.paidamount?.forEach(inner=>{
                        if (inner.payment.currency == "USD") {
                            totalIncome.usd = totalIncome.usd + inner.amount
                        } else {
                            totalIncome.bs = totalIncome.bs + inner.amount
                        }
                    })


                }
            });*/

            let filtered = costumerArray.filter((el) => (dateStr <= el.expire) && (el.expire <= newExpire))



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
                    corte: newExpire,
                    total: totalIncome,
                    outcome: totalOutcome,
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