const { Gym, Costumer, Sale, Op, Payment, Paidamount } = require("../../db.js");
const { dateFormated, monthAdder, datewithHour, yearAdder, dayAdder, weekAdder } = require("../../utils/utils");

let inscription = async (req, res) => {
    // const { idNumber, gymId, description, mustAmount, monthsPaid, arrPayment } = req.body;

    const { description, gymId, plan, arrPayment, customer } = req.body
    console.log(req.body)
    console.log(customer)

    const { fullname, idNumber, idType, birthdate, cellphone, preNumber } = customer

    let fnameCapitalized = toCapitalize(fullname)
    let idParsed = parseInt(idNumber)
    let idTypeUpper = idType.toUpperCase()
    // arrPayment= [{id:1, ammount: 20}]
    // plan {yyy}
    // arrPayment debe ser un array de objetos con el monto y payment id 
    let ammountParsed = parseInt(plan.price);
    //  let rateParsed = parseInt(rate);
    let durationQty = parseInt(plan.durationQty);
    let dateGetter = datewithHour()
    let expireToUpdate;

    if (plan.durationUnit === "Month") expireToUpdate = monthAdder(dateFormated(), durationQty)
    else if (plan.durationUnit === "Year") expireToUpdate = yearAdder(dateFormated(), durationQty)
    else if (plan.durationUnit === "Day") expireToUpdate = dayAdder(dateFormated(), durationQty)
    else if (plan.durationUnit === "Week") expireToUpdate = weekAdder(dateFormated(), durationQty)

    let dateArr = dateGetter.split("-")
    // let date = new Date();
    // let hour = `${date.getHours()}:${date.getMinutes()}`


    try {
        let gym = await Gym.findOne({
            where: {
                id: gymId,
            },
        });

        let costumer = await Costumer.create({
            fullname: fnameCapitalized,
            idNumber: idParsed,
            idType: idTypeUpper,
            birthdate,
            expire: expireToUpdate,
            cellphone: preNumber + "-" + cellphone

        })

        await costumer.setGym(gym)
        /*  await costumer.update(
              {
                  expire: expireToUpdate
              },
              {
                  where: {
                      idNumber: idParsed,
                      gymId,
                  }
              });*/

        let sale = await Sale.create({
            //       isPaid: true,
            description,
            mustAmount: ammountParsed,
            //    rate: rateParsed,
            monthsPaid: durationQty,
            year: dateArr[0],
            month: dateArr[1],
            day: dateArr[2],
            //      hour: hour,
            hour: dateArr[3],

        });

        await sale.setGym(gym);
        await sale.setCostumer(costumer);

        arrPayment.forEach(async (element) => {

            let payment = await Payment.findOne({
                where: {
                    id: element.id,
                },
            });

            let paycheck = await Paidamount.create({
                amount: element.amount
            });

            await paycheck.setPayment(payment);
            await paycheck.setSale(sale);

        });



        res.status(201).json({ sale: sale, costumer });
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err });
    }
};


let renovation = async (req, res) => {
    // const { idNumber, gymId, description, mustAmount, monthsPaid, arrPayment } = req.body;
    let expireToUpdate
    const { idNumber, gymId, plan, arrPayment } = req.body
    // arrPayment= [{id:1, ammount: 20}]
    // plan {yyy}
    // arrPayment debe ser un array de objetos con el monto y payment id 

    let idParsed = parseInt(idNumber);
    let ammountParsed = parseInt(plan.price);
    //  let rateParsed = parseInt(rate);
    let durationQty = parseInt(plan.durationQty);
    let dateGetter = datewithHour()
    let dateArr = dateGetter.split("-")
    let date = new Date();
    let hour = `${date.getHours()}:${date.getMinutes()}`



    try {
        let gym = await Gym.findOne({
            where: {
                id: gymId,
            },
        });

        let costumer = await Costumer.findOne({
            where: {
                idNumber: idParsed,
                gymId,
            },
        });
        if (plan.durationUnit === "Month") expireToUpdate = monthAdder(dateFormated(), durationQty)
        else if (plan.durationUnit === "Year") expireToUpdate = yearAdder(dateFormated(), durationQty)
        else if (plan.durationUnit === "Day") expireToUpdate = dayAdder(dateFormated(), durationQty)
        else if (plan.durationUnit === "Week") expireToUpdate = weekAdder(dateFormated(), durationQty)

        await costumer.update(
            {
                expire: expireToUpdate
            },
            {
                where: {
                    idNumber: idParsed,
                    gymId,
                }
            });

        let sale = await Sale.create({
            //       isPaid: true,
            //            description,
            mustAmount: ammountParsed,
            //       rate: rateParsed,
            monthsPaid: monthsPaidParsed,
            year: dateArr[0],
            month: dateArr[1],
            day: dateArr[2],
            hour: dateArr[3],
        });

        await sale.setGym(gym);
        await sale.setCostumer(costumer);

        arrPayment.forEach(async (element) => {

            let payment = await Payment.findOne({
                where: {
                    id: element.id,
                },
            });

            let paycheck = await Paidamount.create({
                amount: element.amount
            });

            await paycheck.setPayment(payment);
            await paycheck.setSale(sale);

        });



        res.status(201).json({ sale: sale });
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err });
    }
};


let saleReport = async (req, res) => {
    const { gymId, year, month, day } = req.body;
    const { detailed, range, hour } = req.query
    let rangeArr = range?.split(",")
    // Detailed true return all the sales of a determined period, false return the amount of sale
    //Hour must be string example "18:20 or 18 allway 24hs format"
    // Range must be sent by query example range=month,1,3 is for a range from month january to March could be days or years

    let searchParameters = { ...req.body }

    if (rangeArr) {
        searchParameters[rangeArr[0]] = {
            [Op.gte]: rangeArr[1],
            [Op.lte]: rangeArr[2]
        }
    }

    if (hour) {
        searchParameters.hour = {
            [Op.iLike]: `${hour}%`
        }
    }



    try {

        let report = await Sale.findAll({
            where: searchParameters,
            include: {
                model: Costumer,
                attributes: ["idNumber", "fullname",]
            }
        })

        if (!detailed || detailed === "false") {
            let total = {
                usd: 0,
                bs: 0
            }

            report.forEach(element => {
                total.usd = total.usd + element.amountUSD
                total.bs = total.bs + element.amountBs

            });

            res.status(201).json({ msg: total });


        } else {
            res.status(201).json({ msg: report });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ err: e });
    }
};




module.exports = {
    inscription,
    renovation,
    saleReport
};
