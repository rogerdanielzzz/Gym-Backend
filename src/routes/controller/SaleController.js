const { Gym, Costumer, Sale, Op, Payment, Paidamount } = require("../../db.js");
const { dateFormated, monthAdder, datewithHour } = require("../../utils/utils");

let inscription = async (req, res) => {
    const { idNumber, gymId, description, mustAmount, monthsPaid, arrPayment } = req.body;
    // Encriptamos la contraseña [{id:1, ammount: 20}]
    // arrPayment debe ser un array de objetos con el monto y payment id 

    let idParsed = parseInt(idNumber);
    let ammountParsed = parseInt(mustAmount);
    //  let rateParsed = parseInt(rate);
    let monthsPaidParsed = parseInt(monthsPaid);
    let dateGetter = dateFormated()
    let expireToUpdate = monthAdder(dateGetter, monthsPaidParsed)
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
            },
        });
        await costumer.update(
            {
                expire: expireToUpdate
            },
            {
                where: { idNumber: idParsed }
            });

        let sale = await Sale.create({
            //       isPaid: true,
            description,
            mustAmount: ammountParsed,
            //    rate: rateParsed,
            monthsPaid: monthsPaidParsed,
            year: dateArr[0],
            month: dateArr[1],
            day: dateArr[2],
            hour: hour
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
        res.status(500).json({ err: err });
    }
};


let renovation = async (req, res) => {
    const { idNumber, gymId, description, mustAmount, monthsPaid, arrPayment } = req.body;

    // Encriptamos la contraseña
    let idParsed = parseInt(idNumber);
    let ammountParsed = parseInt(mustAmount);

    // let rateParsed = parseInt(rate);
    let monthsPaidParsed = parseInt(monthsPaid);
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
            },
        });
        let expireToUpdate = monthAdder(costumer.expire, monthsPaidParsed)
        await costumer.update(
            {
                expire: expireToUpdate
            },
            {
                where: { idNumber: idParsed }
            });

        let sale = await Sale.create({
            //       isPaid: true,
            description,
            mustAmount: ammountParsed,
            //       rate: rateParsed,
            monthsPaid: monthsPaidParsed,
            year: dateArr[0],
            month: dateArr[1],
            day: dateArr[2],
            hour: hour
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
