class Utils {

    static dateFormat(date){

        let day = date.getDate();
        let month = date.getMonth() + 1;

        if(day < 10){

            day = '0'+day;
        }

        if(month < 10){

            month = '0'+month;
        }

        return day+'/'+month+'/'+date.getFullYear()+' '+ date.getHours()+':'+date.getMinutes();
    }
}