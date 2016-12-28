$(function () {
    //getLocationList("autor", filterByGuide, 1);
    //getLocationList(undefined, undefined, undefined, undefined, 0,3);
    getVisibleMarkers();
});

$(function () {
    $("#autorSearch").change(function () {
        getByAuthor($(this).val());
    })

    $("#locationSearch").change(function () {
        getByLocation($(this).val());
    })

    $("#citySearch").change(function () {
        getByCity($(this).val());
    })
})

function getByGuide(id)
{
    getLocationList(undefined, true, filterByGuide, id);
}

function getByAuthor(string) {
    getLocationList(undefined, true, filterByAuthor, string);
}

function getByCity(string) {
    getLocationList(undefined, true, filterByCity, string);
}

function getByLocation(string) {
    getLocationList(undefined, true, filterByLocation, string);
}

function getByTag(tag) {
    getLocationList(undefined, true, filterByTag, tag);
}

function getBySorted(sort, asc)
{
    getLocationList(sort, asc);
}

function getByVisible(ids) {
    getLocationList(undefined, true, filterByVisible, ids);
}

function filterByVisible(locationList, idsArray)
{
    var array = [];

    $.each(locationList, function (index, value) {
        if (idsArray.some(a => a === value.id)) {
            array.push(value);
        }
    });
    return array;
}

function filterByAuthor(locationList, string) {
    var array = [];

    $.each(locationList, function (index, value) {
        var pos = value.autor.search(string);
        if (pos != -1) {
            array.push(value);
        }
    });
    return array;
}

function filterByCity(locationList, string) {
    var array = [];

    $.each(locationList, function (index, value) {
        var pos = value.city.search(string);
        if (pos != -1) {
            array.push(value);
        }
    });
    return array;
}

function filterByLocation(locationList, string) {
    var array = [];

    $.each(locationList, function (index, value) {
        var pos = value.name.search(string);
        if (pos != -1) {
            array.push(value);
        }
    });
    return array;
}

function filterByGuide(locationList, id) {
    var array = [];
    $.each(locationList, function (index, value) {
        var ids = $.map(value.guides, function (a) { return a.id; });
        if (ids.some(arrVal => id === arrVal)) {
            array.push(value);
        }
    });
    return array;
}

function filterByTag(locationList, tag) {
    var array = [];
    $.each(locationList, function (index, value) {
        var tags = $.map(value.tags, function (a) { return a.tag; });
        if (tags.some(arrVal => tag === arrVal)) {
            array.push(value);
        }
    });
    return array;
}

function selectRange(locationList, bottom, top)
{
    var array = [];
    $.each(locationList, function (index, value) {
        if (top-- > 0 && index >= bottom ) {
                array.push(value);
        }
    });
    return array;
}

function getLocationList(sort, asc, filterFunction, parameter, bottom, top) {
    var locationList;
    if (sort) {
        locationList = sortResults(sort, asc);
    }
    else
        locationList = sortResults("id", true);

    if (filterFunction) {
        locationList = filterFunction(locationList, parameter);
    }

    if (top != undefined && bottom != undefined)
    {
        locationList = selectRange(locationList, bottom, top);
    }
    else if (top)
    {
        locationList = selectRange(locationList, 0, top);
    }
    else if (bottom)
    {
        locationList = selectRange(locationList, bottom, 100);
    }

    var locations = $("ul#locations");
    locations.html("");
    var box = $("<li></li>");
    box.load("dialogFiles/locationBox.html", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success") {
            $.each(locationList, function (index, value) {
                var clone = box.clone();
                clone.html(box.html());
                fillLocation(clone, value);
                locations.append(clone);
            });
        }
    });    
}

function fillLocation(container, data) {
    container.find(".auth").text(data.autor);
    container.find(".name").text(data.name);
    container.find(".name").attr('onclick',"showLocationDialog('st-effect-3',"+ data.id+");");
    container.find(".img").attr("src", data.img);

    container.find(".city").text(data.city);
    container.find(".pos").text("(" + $.number(data.lat, 3) + ";" + $.number(data.long, 3) + ")");
    var stars = data.stars;
    var tags = data.tags;
    var tagsStr = "";
    for (i = 0; i < tags.length; i++) {
        tagsStr = "<a href='#' class='category' onclick=\"getByTag('" + tags[i].tag + "')\"' >" + tags[i].tag + "</a>" + tagsStr;
    }
    container.find(".tags").html(tagsStr);

    var imageStr = "";
    for (i = 0; i < stars; i++) {
        imageStr = imageStr + "<img src='img/star.png' />";
    }
    container.find(".rat").html(imageStr);

}

function sortResults(prop, asc) {
    var locationsList = defaultLocations.sort(function (a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    return locationsList;
}