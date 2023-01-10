const { Gym, Costumer, Checkin, Sale, Paidamount, Payment } = require("../../db.js");
const { dateFormated, datewithHour, dayAdder } = require("../../utils/utils");

let resumeStat = async (req, res) => {
    const { gymId, dateStr } = req.body;

    let dateArr = dateStr.split("-")

    let newExpire = dayAdder(dateStr, 3)




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


            saleArray.forEach(element => {
                if (element.mustAmount < 0 && element.description == "Egreso") {
                    if (element.paidamounts[0].payment.currency == "USD") {
                        totalOutcome.usd = totalOutcome.usd + element.paidamounts[0].amount
                    } else {
                        totalOutcome.bs = totalOutcome.bs + element.paidamounts[0].amount
                    }


                } else {
                    totalIncome.refUSD = totalIncome.refUSD + element.mustAmount

                    element.paidamounts?.forEach(inner => {
                        if (inner.payment.currency == "USD") {
                            totalIncome.usd = totalIncome.usd + inner.amount
                        } else {
                            totalIncome.bs = totalIncome.bs + inner.amount
                        }
                    })


                }
            })

            let filtered = costumerArray.filter((el) => (dateStr <= el.expire) && (el.expire <= newExpire))



            res.status(201).json(
                {
                    //                 saleArray,
                    customers: costumerArray.length,
                    toExpires: filtered.length,
                    income: totalIncome,
                    outcome: totalOutcome,
                    totalCheckins: checkinArray.length,
                })


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