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


function locationFunction(div, id) {
    var tmpIndex = -1;
    $.each(defaultLocations, function (index, value) {
        if (id === value.id) {
            tmpIndex = index;
        }
    });
    if (tmpIndex !== -1) {
        $(div).find("#locationName").text(defaultLocations[tmpIndex].name);
        var authorlink = $("<a href='#user' onclick=\"showDialog('user" + (id % 3 + 1) + "Div')\">" + defaultLocations[tmpIndex].autor + "<a>");
        var autor = $(div).find("#autor");
        authorlink.appendTo(autor);
        $(div).find("#showOnMap").attr("href", "map.html?id=" + defaultLocations[tmpIndex].id);
        $(div).find("#location").text("(" + defaultLocations[tmpIndex].lat + ";" + defaultLocations[tmpIndex].long + ")");
        $(div).find("#image").find("img").attr("src", defaultLocations[tmpIndex].img);
    }
}

function openSidebar(fileName, path, id) {
    var delay = $("#st-container").hasClass("st-menu-open") ? 475 : 0;
    setTimeout(function () {
        var content = $(".st-menu");
        content.load((path == null ? 'dialogFiles/' : (path + '/')) + fileName + '.html', function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success")
            {
                if (id != null)
                {                    
                    locationFunction(content, id);
                }
            }
            //if (statusTxt == "error")
            //    alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    }, delay);
}