const { Gym, Costumer, Sale, Op } = require("../../db.js");
const { dateFormated, monthAdder } = require("../../utils/utils");
const { Sequelize } = require("sequelize");

let inscription = async (req, res) => {
    const { idNumber, gymRif, description, amountUSD, amountBs, rate, monthsPaid } = req.body;
    // Encriptamos la contraseña
    let rifUpper = gymRif.toUpperCase();
    let idParsed = parseInt(idNumber);
    let usdParsed = parseInt(amountUSD);
    let bsParsed = parseInt(amountBs);
    let rateParsed = parseInt(rate);
    let monthsPaidParsed = parseInt(monthsPaid);
    let dateGetter = dateFormated()
    let expireToUpdate = monthAdder(dateGetter, monthsPaidParsed)
    let dateArr = dateGetter.split("-")
    let date = new Date();
    let hour = `${date.getHours()}:${date.getMinutes()}`


    try {
        let gym = await Gym.findOne({
            where: {
                rif: rifUpper,
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
            isPaid: true,
            description,
            amountUSD: usdParsed,
            amountBs: bsParsed,
            rate: rateParsed,
            monthsPaid: monthsPaidParsed,
            year: dateArr[0],
            month: dateArr[1],
            day: dateArr[2],
            hour: hour



        });

        await sale.setGym(gym);
        await sale.setCostumer(costumer);



        res.status(201).json({ sale: sale });
    } catch (err) {
        res.status(500).json({ err: err });
    }
};


let renovation = async (req, res) => {
    const { idNumber, gymRif, description, amountUSD, amountBs, rate, monthsPaid } = req.body;
    // Encriptamos la contraseña
    let rifUpper = gymRif.toUpperCase();
    let idParsed = parseInt(idNumber);
    let usdParsed = parseInt(amountUSD);
    let bsParsed = parseInt(amountBs);
    let rateParsed = parseInt(rate);
    let monthsPaidParsed = parseInt(monthsPaid);
    let dateGetter = dateFormated()
    let dateArr = dateGetter.split("-")
    let date = new Date();
    let hour = `${date.getHours()}:${date.getMinutes()}`

    try {
        let gym = await Gym.findOne({
            where: {
                rif: rifUpper,
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
            isPaid: true,
            description,
            amountUSD: usdParsed,
            amountBs: bsParsed,
            rate: rateParsed,
            monthsPaid: monthsPaidParsed,
            year: dateArr[0],
            month: dateArr[1],
            day: dateArr[2],
            hour: hour
        });

        await sale.setGym(gym);
        await sale.setCostumer(costumer);



        res.status(201).json({ sale: sale });
    } catch (err) {
        res.status(500).json({ err: err });
    }
};


let saleReport = async (req, res) => {
    const { gymId, } = req.body;
    let  searchParameters= {
        gymId: gymId,
        year: 2022,
 //       month: 11,
//        day: 30,
        hour:{
            [Op.iLike]: "18%"
        }

    }


    try {

        let report = await Sale.findAll({
          where: searchParameters
        })
        let total={
            usd:0,
            bs:0
        }
        
        report.forEach(element => {
            total.usd= total.usd+element.amountUSD
            total.bs= total.bs+element.amountBs

        });

        res.status(201).json({ msg: total });
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
