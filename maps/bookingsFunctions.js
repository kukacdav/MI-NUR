loadBookings();


function loadBookings() {
    
    var HTML = [];
    for (i = 0; i < bookings.length; i++) {
        var style = "";
        if (bookings[i].novy == 1) {
            style = "style =\"background-color: rgb(255,192,151)\"";
            bookings[i].novy = 0;
        }
        HTML.push("<div class=\"calendarEntry\" " + style + "><div class=\"block-a\"><p><strong>" + bookings[i].date + "</strong></p></div><div class=\"block-b\"><p><a href=# onclick=\"showLocationDialog('st-effect-3'," + bookings[i].id + ")\">" + bookings[i].name + "</a></p></div><div class=\"block-c\"><p><strong>" + bookings[i].person + "</strong></p></div><div style=\"float: left; width:100%\"><p><b>Stav:</b> " + bookings[i].state + "</p></div><div style=\"float: left; width:100%\"><p><b>Poznámka:</b> " + (bookings[i].note != "" ? bookings[i].note : "-")  + "</p></div></div>");
        $(HTML[i]).appendTo("#calendar");
    }
}