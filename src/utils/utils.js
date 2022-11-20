
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

module.exports = {
    toCapitalize,
    dateFormated
}