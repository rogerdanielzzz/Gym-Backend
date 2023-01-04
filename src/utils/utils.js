
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
    let hour = date.toLocaleString(('en-GB'), { hour: '2-digit', minute: '2-digit' });


    // genera un string año-mes-dia
    let formattedDate = year + "-" + month + "-" + day + "-" + hour;

    return formattedDate
}

let yearAdder = (string, qty) => {

    let dateArr = string.split("-");
    dateArr[0] = ((dateArr[0] * 1) + qty);
    dateArr[0] = dateArr[0].toString()
    let formattedDate = dateArr.join("-")
    return formattedDate
}
let monthAdder = (string, monthqty) => {

    let dateArr = string.split("-");
    dateArr[1] = ((dateArr[1] * 1) + monthqty);
    while (dateArr[1] > 12) {
        dateArr[1] = dateArr[1] - 12
        dateArr[0] = (dateArr[0] * 1) + 1
    }
    dateArr[1] = dateArr[1].toString()
    dateArr[0] = dateArr[0].toString()

    if (dateArr[1].length < 2) dateArr[1] = "0" + dateArr[1]

    let formattedDate = dateArr.join("-")
    return formattedDate
}


let dayAdder = (string, qty) => {

    let monthDayQty=(month, year)=> {
        return new Date(year, month, 0).getDate();
    }
    let dateArr = string.split("-");
   for (let index = 0; index < dateArr.length; index++) {
    dateArr[index]=dateArr[index]*1;
    
   }
    dateArr[2] = dateArr[2] + qty; //33
    let dayPerMonth=monthDayQty(dateArr[1],dateArr[0])
    while (dateArr[2]> dayPerMonth ) {
        dateArr[2]= dateArr[2]-dayPerMonth
        dateArr[1]= dateArr[1]+1
        if (dateArr[1]==13){
            dateArr[1]=1
            dateArr[0]= dateArr[0]+1

        } 
        dayPerMonth=monthDayQty(dateArr[1],dateArr[0]) 
    }

    for (let i= 0 ; i< dateArr.length; i++){
        dateArr[i]=dateArr[i].toString()
        
            if (dateArr[i].length==1) {
              dateArr[i]= "0"+dateArr[i]   
            }
    }

    let formattedDate = dateArr.join("-")
    console.log(formattedDate +"  esta")
    return formattedDate
}


let weekAdder = (string, qty) => {

    let weeks= qty*7

    let formattedDate = dayAdder(string,weeks)
    return formattedDate
}



module.exports = {
    toCapitalize,
    dateFormated,
    yearAdder,
    monthAdder,
    weekAdder,
    dayAdder,
    datewithHour
}