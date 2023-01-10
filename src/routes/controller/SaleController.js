const { Gym, Costumer, Sale, Op, Payment, Paidamount } = require("../../db.js");
const { dateFormated, monthAdder, datewithHour, yearAdder, dayAdder, weekAdder, toCapitalize } = require("../../utils/utils");

let inscription = async (req, res) => {

    const { description, gymId, plan, arrPayment, customer, dateFormated, datewithHour, rate } = req.body
    const { fullname, idNumber, idType, birthdate, cellphone, preNumber } = customer
    if (description && gymId && plan && arrPayment && customer) {
        let rateParsed= parseFloat(rate)
        let fnameCapitalized = toCapitalize(fullname)
        let idParsed = parseInt(idNumber)
        let idTypeUpper = idType.toUpperCase()
        let ammountParsed = parseFloat(plan.price);
        let durationQty = parseInt(plan.durationQty);
        let dateGetter = datewithHour
        let expireToUpdate;

        if (plan.durationUnit === "Month") expireToUpdate = monthAdder(dateFormated, durationQty)
        else if (plan.durationUnit === "Year") expireToUpdate = yearAdder(dateFormated, durationQty)
        else if (plan.durationUnit === "Day") expireToUpdate = dayAdder(dateFormated, durationQty)
        else if (plan.durationUnit === "Week") expireToUpdate = weekAdder(dateFormated, durationQty)

        let dateArr = dateGetter.split("-")


        if (durationQty < 1) res.status(201).json({ msg: "la duracion no puede ser menos de 1" });

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


            let sale = await Sale.create({
                description,
                mustAmount: ammountParsed,
                rate: rateParsed,
                saleDetail: plan.planName,
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
                    amount: element.ammount
                });

                await paycheck.setPayment(payment);
                await paycheck.setSale(sale);

            });



            res.status(201).json({ sale: sale, costumer });
        } catch (err) {
            console.log(err)
            res.status(500).json({ err: err });
        }
    } else res.status(201).json({ msg: "Faltan enviar datos" });

};


let renovation = async (req, res) => {
    // const { idNumber, gymId, description, mustAmount, monthsPaid, arrPayment } = req.body;
    let expireToUpdate
    const { gymId, plan, arrPayment, customer, description, datewithHour, dateFormated, rate } = req.body
    const { idNumber, idType } = customer
    if (gymId && plan && arrPayment && customer && description) {
        // arrPayment= [{id:1, ammount: 20}]
        // plan {yyy}
        // arrPayment debe ser un array de objetos con el monto y payment id 
        let rateParsed= parseFloat(rate)
        let idParsed = parseInt(idNumber);
        let ammountParsed = parseFloat(plan.price);
        let durationQty = parseInt(plan.durationQty);
        let dateGetter = datewithHour
        let dateArr = dateGetter.split("-")


        if (durationQty < 1) res.status(201).json({ msg: "la duracion no puede ser menos de 1" });

        try {
            let gym = await Gym.findOne({
                where: {
                    id: gymId,
                },
            });

            let costumer = await Costumer.findOne({
                where: {
                    idNumber: idParsed,
                    idType,
                    gymId,
                },
            });

            let baseExpire
            if (costumer.expire < dateFormated) {
                baseExpire = dateFormated
            } else baseExpire = costumer.expire

            if (plan.durationUnit === "Month") expireToUpdate = monthAdder(baseExpire, durationQty)
            else if (plan.durationUnit === "Year") expireToUpdate = yearAdder(baseExpire, durationQty)
            else if (plan.durationUnit === "Day") expireToUpdate = dayAdder(baseExpire, durationQty)
            else if (plan.durationUnit === "Week") expireToUpdate = weekAdder(baseExpire, durationQty)

            await costumer.update(
                {
                    expire: expireToUpdate
                },
                {
                    where: {
                        idNumber: idParsed,
                        gymId,
                        idType
                    }
                });

            let sale = await Sale.create({
                //       isPaid: true,
                description,
                mustAmount: ammountParsed,
                rate: rateParsed,
                saleDetail: plan.planName,
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
                    amount: element.ammount
                });

                await paycheck.setPayment(payment);
                await paycheck.setSale(sale);

            });



            res.status(201).json({ sale: sale, costumer });
        } catch (err) {
            console.log(err)
            res.status(500).json({ err: err });
        }
    } else res.status(201).json({ msg: "Faltan enviar datos" });
};

let getSales = async (req, res) => {
    let searchParameters = { ...req.body }
    try {
        let report = await Sale.findAll({
            where: searchParameters,
            include: [
                {
                    model: Costumer,
                    attributes: ["idType", "idNumber", "fullname",]
                },
                {
                    model: Paidamount,
                    include: Payment
                },
            ]
        })


        res.status(201).json({ msg: report });

    } catch (e) {
        console.log(e)
        res.status(500).json({ err: e?.msg });
    }
}

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


let getPaymentTotal = async (req, res) => {
    let { gymId, dateStr } = req.body
    let dateArr = dateStr.split("-")


    let searchParameters = { ...req.body }

    try {
        let report = await Payment.findAll({
            where: {
                gymId,


            },
            include: {
                model: Paidamount,
                required: true,
                include: {
                    model: Sale,
                    where: {
                        gymId,
                        year: dateArr[0],
                        month: dateArr[1],
                        day: dateArr[2],

                    }
                }
            },

        })

        let totales = []

        for (let i = 0; i < report.length; i++) {
            let total = 0
            for (let y = 0; y < report[i].paidamounts.length; y++) {

                total = total + report[i].paidamounts[y].amount
                console.log(total)
            }
            let pay = {
                id: report[i].id,
                name: report[i].name,
                currency: report[i].currency,
                totalAmount: total,
            }
            if (report[i].banco) pay.banco = report[i].banco;
            if (report[i].correo) pay.correo = report[i].correo;
            if (report[i].cuenta) pay.cuenta = report[i].cuenta;
            if (report[i].telefono) pay.telefono = report[i].telefono;
            if (report[i].cedula) pay.cedula = report[i].cedula;
            totales.push(pay)

        }


        res.status(201).json({ resume: totales, detailed: report });

    } catch (e) {
        console.log(e)
        res.status(500).json({ err: e?.msg });
    }
}




let outCome = async (req, res) => {

    const { detail, gymId, amount, idPaymentToDebt, datewithHour } = req.body
    if (detail && gymId && amount && idPaymentToDebt && datewithHour) {
        let ammountParsed = parseInt(amount)
        let dateGetter = datewithHour
        let dateArr = dateGetter.split("-")


        try {
            let gym = await Gym.findOne({
                where: {
                    id: gymId,
                },
            });


            let sale = await Sale.create({
                description: "Egreso",
                mustAmount: ammountParsed,
                //    rate: rateParsed,
                saleDetail: detail,
                year: dateArr[0],
                month: dateArr[1],
                day: dateArr[2],
                hour: dateArr[3],

            });

            await sale.setGym(gym);


            let payment = await Payment.findOne({
                where: {
                    id: idPaymentToDebt,
                },
            });

            let paycheck = await Paidamount.create({
                amount: ammountParsed
            });

            await paycheck.setPayment(payment);
            await paycheck.setSale(sale);




            res.status(201).json({ sale: sale });
        } catch (err) {
            console.log(err)
            res.status(500).json({ err: err });
        }
    } else res.status(201).json({ msg: "Faltan enviar datos" });

};



module.exports = {
    inscription,
    renovation,
    saleReport,
    getSales,
    getPaymentTotal,
    outCome
};
