var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function showDialog(divId)
{
    clearInfoWindows();
    var inners = $(".dialogInner");
    $.each(inners, function (index, value) {
        if (! $(value).parent().hasClass("wrapDiv")) {
            $(value).remove();
        }
    });
    var width = $(document).width();
    var height = $(document).height();
    var dialog = $("#" + divId).clone();
    var inner = $(dialog).find("#" + divId + "Inner");
    $(inner).css("top", "15%");
    $(inner).css("left", "10%");
    $(inner).css("display", "unset");
    $(inner).appendTo("body");
    inner.animate({ opacity: '1' }, "slow");
    return inner;
}

function showLocationDialog(divId, id)
{
    var inner = showDialog(divId);
    locationFunction(inner, id);
}

function remove(link)
{
    $(link).parent().parent().remove();
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

$(function () {
    //var id = getUrlParameter('id');
    //var tmpIndex = -1;
    //$.each(defaultLocations, function (index, value) {
    //    if (id == value.id)
    //    {
    //        tmpIndex = index;
    //    }
    //});
    //if (tmpIndex != -1) {
    //    $("#locationName").text(defaultLocations[tmpIndex].name);
    //    $("#autor").text(defaultLocations[tmpIndex].autor);
    //    $("#showOnMap").attr("href", "map.html?id=" + defaultLocations[tmpIndex].id);
    //    $("#location").text("(" + defaultLocations[tmpIndex].lat + "," + defaultLocations[tmpIndex].long + ")");
    //    $("#image").find("img").attr("src", defaultLocations[tmpIndex].img);
    //}
})

function showMessageDialog(div)
{
    var inner = showDialog(div);
    $(inner).load("file:///yC:/Users/mroubicek/Downloads/maps/html/maps(1)/maps/maps/messageBox/messagingList.html", function (response, status, xhr) {
        if (status == "error") {
            var msg = "Sorry but there was an error: ";
            $(inner).html(msg + xhr.status + " " + xhr.statusText);
        }
    });
}

function locationFunction(div, id)
{
    var tmpIndex = -1;
    $.each(defaultLocations, function (index, value) {
        if (id == value.id) {
            tmpIndex = index;
        }
    });
    if (tmpIndex != -1) {
        $(div).find("#locationName").text(defaultLocations[tmpIndex].name);
        var authorlink = $("<a href='#user' onclick=\"showDialog('user" + (id % 3 + 1 ) + "Div')\">" + defaultLocations[tmpIndex].autor + "<a>");
        var autor = $(div).find("#autor");
        authorlink.appendTo(autor);
        $(div).find("#showOnMap").attr("href", "map.html?id=" + defaultLocations[tmpIndex].id);
        $(div).find("#location").text("(" + defaultLocations[tmpIndex].lat + "," + defaultLocations[tmpIndex].long + ")");
        $(div).find("#image").find("img").attr("src", defaultLocations[tmpIndex].img);
    }
}

function createLocationList()
{
    var table = $("t01");
    $.each(defaultLocations, function (index, value) {
        var tr = $('<tr></tr>');
        if (id == value.id) {
            tmpIndex = index;
        }
    });
}