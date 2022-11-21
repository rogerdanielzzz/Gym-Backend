
let toCapitalize = (str) => {
    let strCheck = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return strCheck

}

let dateFormated = () => {

    let date = new Date();

    // Formatea fecha por separado
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });

    // genera un string año-mes-dia
    let formattedDate = year + "-" + month + "-" + day;

    return formattedDate
}

let datewithHour = () => {

    let date = new Date();

    // Formatea fecha por separado
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    let hour = date.toLocaleString("default", { hour: '2-digit', minute: '2-digit' });


    // genera un string año-mes-dia
    let formattedDate = year + "-" + month + "-" + day+"-" + hour;;

    return formattedDate
}

let monthAdder = (string, monthqty) => {

    let dateArr = string.split("-");
    dateArr[1] = ((dateArr[1] * 1) + monthqty);
    while (dateArr[1] > 12) {
        dateArr[1] = dateArr[1] - 12
        dateArr[0] = (dateArr[0]*1) + 1
    }
    dateArr[1]=dateArr[1].toString()
    dateArr[0]=dateArr[0].toString()

    if (dateArr[1].length < 2) dateArr[1] = "0" + dateArr[1]

    let formattedDate = dateArr.join("-")
    return formattedDate
}

module.exports = {
    toCapitalize,
    dateFormated,
    monthAdder,
    datewithHour
}