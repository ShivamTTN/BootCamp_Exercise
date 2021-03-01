function main () {
    var d = new Date();
    var date = d.getDate();
    var mon = d.getUTCMonth();
    var year = d.getFullYear();

    var hour = d.getHours();

    if (hour > 12)
    {
        hour = hour - 12;
    }   
    hour = ("0" + hour).slice(-2);

    var min = d.getMinutes();
    min = ("0" + min).slice(-2);

    var sec = d.getSeconds();
    sec = ("0" + sec).slice(-2);

    var temph = d.getHours();
    var state;
    if (temph >= 12)
        state = "PM";
    else
        state = "AM";

    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    //console.log(date +" "+ month +" "+ year)
    if(temph > 0 && temph<12)
    {
        document.getElementById("wishes").innerHTML = "Good Morning";
    }
    else if(temph>=12 && temph<18)
    {
        document.getElementById("wishes").innerHTML = "Good Afternoon";
    }
    else
    {
        document.getElementById("wishes").innerHTML = "Good Evening";   
    }
    document.getElementById("clock").innerHTML = hour + ":" + min + ":" + sec + " " + state;
    document.getElementById("date").innerHTML = date + " " + month[mon] + " " + year;

    
};
setInterval(main,1000);