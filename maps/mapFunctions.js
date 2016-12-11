function initMap() {

    var id = getUrlParameter('id');
    
    if (id != undefined) {
        selectedLocation = id;
    }
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(50.076531, 14.44976);
    var mapOptions = {
        center: myCenter,
        zoom: 12,
        styles: myStyles,
        disableDefaultUI: true
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
    createDefaultLocations(map, id != undefined);
    google.maps.event.addListener(map, 'click', function (event) {
        createLocation(map, event);
    });

}
var selectedLocation;
var infoWindowsReference = [];
var infoWindows = [];
var markers = [];

function toggleBounce(marker) {
    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        clearInfoWindows();
        marker.setAnimation(google.maps.Animation.BOUNCE);

        createInfoWindowForMarker(marker);
        map.setCenter(marker.getPosition());
    }
}

function clearInfoWindows()
{
    $.each(infoWindows, function (index, value) {
        value.close();
    });
    $.each(markers, function (index, value) {
        value.setAnimation(null);
    });
    infoWindowsReference = [];
    infoWindows = [];
}

function createDefaultLocations(map, defaults) {
    var bounds = new google.maps.LatLngBounds();
    $.each(defaultLocations, function (index, value) {
        var location = new google.maps.LatLng(value.lat, value.long);
        var marker = createMarker(map, location, true);
        bounds.extend(marker.position);
    });
    if (!defaults)
        map.fitBounds(bounds);
}

function createInfoWindowForMarker(marker) {
    var id = marker.metadata.id;
    var html = $("#showInfoDialog").clone();
    $(html).find(".autor").html(defaultLocations[id].autor);
    $(html).find(".nazev").html(defaultLocations[id].name);
    $(html).find(".target").attr("onclick", "showLocationDialog('locationDiv'," + id + ");");
    $(html).find(".image").find("img").attr("src", defaultLocations[id].img);
    $.each(defaultLocations, function (index, value) {
        if (value.id == id) {
            var infowindow = new google.maps.InfoWindow({
                content: $(html).html() + "Souřadnice: <q>" + marker.getPosition() + "</q>", metadata: {
                    id: markerCounter
                }
            });
            if (jQuery.inArray(id, infoWindowsReference) == -1) {
                infowindow.open(map, marker);
                //setTimeout(function () { infowindow.close(); }, 3000);
                infoWindowsReference.push(id);
                infoWindows.push(infowindow);
                google.maps.event.addListener(infowindow, "closeclick", function () {
                    $.each(infoWindowsReference, function (index, value) {
                        if (value === id) {
                            tmpIndex = index;
                        }
                    });
                    infoWindowsReference.splice(tmpIndex, 1);
                    marker.setAnimation(null);
                });
            }
        }
    });
}

function createLocation(map, event) {
    var html = $("#createDialog").clone();
    var marker = createMarker(map, event.latLng, false);
    var infowindow = new google.maps.InfoWindow({
        content: html.html()
    });
    infowindow.open(map, marker);
    google.maps.event.addListener(infowindow, "closeclick", function () {

        defaultLocations.pop();
        markerCounter--;
        marker.setMap(null);
    });
}


function createMarker(map, location, fromDefault) {
    var marker = placeMarker(map, location);
    markerCounter++;
    if (!fromDefault) {
        defaultLocations.push({
            "name": "Podsvětí",
            "autor": "pan",
            "lat": location.lat(),
            "long": location.lng(),
            "id": markerCounter,
        });
    }
    markers.push(marker);
    if (selectedLocation != null && selectedLocation != 'undefined' && selectedLocation == marker.metadata.id) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        createInfoWindowForMarker(marker);
        map.setCenter(marker.getPosition());
    }
    return marker;
}

var markerCounter = 0;

function placeMarker(map, location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        metadata: {
            id: markerCounter
        }
    });
    marker.addListener("click", function () {
        toggleBounce(this);
    });
    return marker;
}
