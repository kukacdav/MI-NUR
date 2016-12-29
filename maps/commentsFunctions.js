$(document).ready(function () {
    $("#newMessage").keyup(function (event) {
        if (event.which == 13) {
            insertComment($('#newMessage').val(), $('#header').val(), $('#ratingCount option:selected').val());
        }
    });
});

loadComments();


function loadComments() {
    
    var HTML = [];
    for (i = 0; i < 3; i++) {
        var imageStr = "";
        var stars = comments[i].stars;
        for (k = 0; k < stars; k++) {
            imageStr = imageStr + "<img src='img/star.png' />";
        }
        if (imageStr == "") {
            imageStr = "0";
        }

        HTML.push("<div class=" + comments[i].type + "><p class=messageInfo><span class=sender>" + comments[i].sender + "</span></span><span class=rating><br/>" + imageStr + "</span><span class=messageDate>" + comments[i].date + "</p><p><strong>" + comments[i].header + "</strong>" + comments[i].content + "</p></div>");
        $(HTML[i]).appendTo("#messageBox");
    }
}


function insertComment(newMessage, header, stars) {
    var HTML = [];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var HH = today.getHours();
    var MM = today.getMinutes();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (HH < 10) {
        HH = '0' + HH
    }
    if (MM < 10) {
        MM = '0' + MM
    }

    today = HH + ':' + MM + ', ' + dd + '. ' + mm + '. ' + yyyy;

    var imageStr = "";
    for (k = 0; k < stars; k++) {
        imageStr = imageStr + "<img src='img/star.png' />";
    }
    if (imageStr == "") {
        imageStr = "0";
    }

    HTML.push("<div class='comment'><p class=messageInfo><span class=sender>David Hasselhof</span></span><span class=rating><br/>" + imageStr + "</span><span class=messageDate>" + today + "</p><p><strong>" + header + "</strong>" + newMessage + "</p></div>");
    $(HTML[0]).appendTo("#messageBox");
    $("#newComment").html("");
    $("#newComment").html("<p>Již jste jednou hodnotili</p>");
}