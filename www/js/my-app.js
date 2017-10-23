// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

function backtoindex(){
        location.href = "index.html";
}

function showMap(){
       location.href = "about.html";
};

      var map;
      function initMap(){
             navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        map = new google.maps.Map(document.getElementById('map'), {
          center: latLng,
          zoom: 15
        });
                var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: 'Hello World!'
        });
      });

      }
initMap();

function showResto(){
    
     navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
         
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//    var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

    var myOptions = {
        zoom: 12,
        center: latLng,
        mapTypeControl: false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
         
    map = new google.maps.Map(document.getElementById('map'), myOptions);

    var request = {
        location: latLng,
        radius: '5000',
        query: "taiwanese food"
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
});
                                              }
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
      }