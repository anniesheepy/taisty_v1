// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
//var mainView = myApp.addView('.view-main', {
//    // Because we want to use dynamic navbar, we need to enable it for this view:
//    dynamicNavbar: true
//});

// Handle Cordova Device Ready Event
//$$(document).on('deviceready', function() {
//    console.log("Device is ready!");
//
//});

//var permissions = cordova.plugins.permissions;
//
//permissions.requestPermission(permissions.ACCESS_COARSE_LOCATION, success, error);
//
//function error() {
//  console.warn('Camera permission is not turned on');
//}
//
//    document.addEventListener("deviceready", onDeviceReady, false);
//    function onDeviceReady() {
//        console.log("navigator.geolocation works well");
//    }
//
//
//function success( status ) {
//  if( !status.hasPermission ) error();
//}

function getLocation() {
            navigator.geolocation.getCurrentPosition
        (onSuccess, onError, { enableHighAccuracy: false });
}

   

    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

var Latitude = undefined;
var Longitude = undefined;

// Get geo coordinates

function getMapLocation() {

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { 
//        maximumAge: 300000, 
//        timeout: 5000, 
        enableHighAccuracy: false });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}


// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}



function showMap(){
       location.href = "about.html";
   };

function showshowMap(){
//        getLocation();
        getMapLocation();
        getMap(Latitude, Longitude);   
   };
function showResto(){
    getMapLocation();
    var onMapSuccess = function (position) {
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
//    getMap(Latitude, Longitude);

    }
    var latLong = new google.maps.LatLng(Latitude, Longitude);
//    var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

    map = new google.maps.Map(document.getElementById('map'), {
      center: latLong,
      zoom: 10
    });

    var request = {
        location: latLong,
        radius: '5000',
//        type: ['restaurant']
        query: 'taiwanese'
    };

    var service;
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);


    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
            }
        }
    }
    console.log("not working?");
};

function createMarker(place) {
        var infowindow;
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
         console.log("marker functioning");
      }

function backtoindex(){
        location.href = "index.html";
};


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
//myApp.onPageInit('about', function (page) {
//    console.log("show map");
//
//})

// Option 2. Using one 'pageInit' event handler for all pages:
//$$(document).on('pageInit', function (e) {
//    // Get page data from event data
//    var page = e.detail.page;

//    if (page.name === 'about') {
//        // Following code will be executed for page with data-page attribute equal to "about"
//        myApp.alert('Here comes About page');
//    }
//})

// Option 2. Using live 'pageInit' event handlers for each page
//$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//    // Following code will be executed for page with data-page attribute equal to "about"
//    myApp.alert('Here comes About page');
//})