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

function showDialog(divId) {
    clearInfoWindows();
    var inners = $(".dialogInner");
    $.each(inners, function (index, value) {
        if (!$(value).parent().hasClass("wrapDiv")) {
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

function resetMenu() {
    $('#st-container').removeClass("st-menu-open");
}

function bodyClickFn(evt) {
    resetMenu();
    $(".st-menu").off(eventtype, bodyClickFn);
};

function showLocationDialog(effect, id) {
    var container = $("#st-container");
    var delay = container.hasClass("st-menu-open") ? 450 : 0;
    container.removeClass('st-menu-open');
    container.addClass(effect);
    setTimeout(function () { container.addClass('st-menu-open'); }, delay);
    openSidebar('locationDetail', null, id);
    $(".st-menu").on('dblclick', bodyClickFn);

}

function remove(link) {
    $(link).parent().parent().remove();
}

function toggleBookWindow()
{
    var content =$(".bookLocation-content");
    var display = ($(content).css("display") == "none") ? "initial" : "none";
    content.css("display", display)
}

function insertBooking(date, name, id, person, note) {
    bookings.push(
        {
            "id": id,
            "date": date,
            "name": name,
            "person": person,
            "note": note,
            "novy": 1
        });
    $("#calendar-menu-item").attr("src", "./img/calendar-big-new.png");
}

function removeNew()
{
    $("#calendar-menu-item").attr("src", "./img/calendar-big.png");
}

function bookLocation(id, name)
{
    toggleBookWindow();
    var content = $(".bookLocation-content");
    var date = content.find("#booking-date").val();
    var person = content.find("#booking-person option:selected").val();
    var note = content.find("#booking-note").val();
    insertBooking(date, name, id, person, note);
}

function locationFunction(div, id) {
    var tmpIndex = -1;
    $.each(defaultLocations, function (index, value) {
        if (id === value.id) {
            tmpIndex = index;
        }
    });
    if (tmpIndex !== -1) {
        var data = defaultLocations[tmpIndex];
        var container = $(div);
        container.find("#locationName").text(data.name);
        var authorlink = $("<a class='guides' href='#user' onclick=\"openSidebar('user" + (id % 3 + 1) + "Div')\">" + data.autor + "<a>");
        var autor = container.find("#autor");
        authorlink.appendTo(autor);
        container.find("#showOnMap").attr("href", "map.html?id=" + data.id);
        container.find("#location").text("(" + $.number(data.lat, 3) + ";" + $.number(data.long, 3) + ")");
        container.find("#description").html("<p>" + data.description + "</p>")
        container.find(".displayOnMap").attr("onclick", " displayOnMap(" + data.id + ")");

        container.find(".bookLocation").attr("onclick", "toggleBookWindow()");
        container.find("#bookLocationSend").attr("onclick", "bookLocation(" + data.id + ",'" + data.name +"')");
        var gallery = data.gallery;
        var galleryStr = "";

        for (i = 0; i < gallery.length; i++) {
            galleryStr = "<a href=\"" + gallery[i] + "\" target=\"_blank\"><img src=\"" + gallery[i] + "\" class=\"thumbnail-mini\" /></a>" + galleryStr;
        }

        container.find(".images").html(galleryStr);



        
        var tags = data.tags;
        var tagsStr = "";
        for (i = 0; i < tags.length; i++) {
            tagsStr = "<a href='#' class='category' style='margin-left: 8px' onclick=\"openSidebar('locations', null, null, getByTag, '" + tags[i].tag + "')\">" + tags[i].tag + "</a>" + tagsStr;
        }
        container.find(".tags").html(tagsStr);

        var guideIds = $.map(data.guides, function (n, i) { return n.id; });
        
        var guideList = $.grep(defaultGuides, function (value, index) {
            return guideIds.some(a => a == value.id);
        });
        
        var guideStr = "";
        for (i = 0; i < guideList.length; i++) {
            guideStr = "<a href='#' class='guides' style='margin-right: 8px;' onclick=\"openSidebar('" + guideList[i].url + "')\">" + guideList[i].name + "</a>" + guideStr;
        }

        container.find(".guidesList").html(guideStr);

        var stars = data.stars;
        var imageStr = "";
        for (i = 0; i < stars; i++) {
            imageStr = imageStr + "<img src='img/star.png' />";
        }
        if (imageStr == "") {
            imageStr = "0";
        }
        container.find("#ratingContent").html("Hodnocení: " + imageStr);
    }
}

function openSidebar(fileName, path, id, afterCall, parameter) {
    var delay = $("#st-container").hasClass("st-menu-open") ? 475 : 0;
    setTimeout(function () {
        var content = $(".st-menu");
        content.load((path == null ? 'dialogFiles/' : (path + '/')) + fileName + '.html', function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success") {
                if (id != null) {
                    locationFunction(content, id);
                }
                if (afterCall != undefined) {
                    afterCall(parameter);
                }
            }
            //if (statusTxt == "error")
            //    alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    }, delay);
}