let myLat=48.4284;
let myLong=-123.3656;
let myLocation = new google.maps.LatLng(myLat, myLong);
let map;
let service;
let infoWindowRestaurant;
let infoWindowCurrentLocation;
let rad=3000;
let markers = [];
let dest;
let posy;
let choose=10;
let besties=0;
let rusa;
 const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
let position;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
window.onload = initializeMap;
function initializeMap() { 
  
  
  
  document.getElementById("thousand").onclick = function(){radi()};
function radi(){
  rad=1000;
  if (choose==10){
    searchForRestaurants(myLocation);
  } else if (choose==100){
    searchForRestaurants(posy);
  }
}
  document.getElementById("best").onclick = function(){BBB(rusa)};
  
  
 
  
  function BBB(results){
    console.log(results);
    let max=[0, 0, 0];
    let a,b,c;
for (let i = 0; i < results.length; i++) {
     if (max[0]<results[i].rating){
      max[0]=results[i].rating;
       a=i;
     }
    
  }
    
for (let i = 0; i < results.length; i++) {
     if (max[1]<results[i].rating && i!=a){
      max[1]=results[i].rating;
       b=i;
     }
    
  }
  for (let i = 0; i < results.length; i++) {
     if (max[2]<results[i].rating && i!=b && i!=a){
      max[2]=results[i].rating;
       c=i;
     }
    
  }
    console.log(max);
    console.log(a," ",b," ",c)
    
    let out=[results[a], results[b], results[c]];
    deleteMarkers();
for(let i = 0; i <out.length; i++){
      
      console.log("jojo");
  
      createMarker(out[i]);
    }
}
    
  document.getElementById("three").onclick = function(){redi()};
function redi(){
  rad=3000;
  if (choose==10){
    searchForRestaurants(myLocation);
  } else if (choose==100){
    searchForRestaurants(posy);
  }
}
  
  document.getElementById("five").onclick = function(){rodi()};
function rodi(){
  rad=5000;
  if (choose==10){
    searchForRestaurants(myLocation);
  } else if (choose==100){
    searchForRestaurants(posy);
  }
}


  map = new google.maps.Map(document.getElementById("map"),{
    center: myLocation,
    zoom: 13
  });
  searchForRestaurants(myLocation);
    
  infoWindowCurrentLocation = new google.maps.InfoWindow();
  infoWindowRestaurant = new google.maps.InfoWindow();
  
  
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  

  
  
map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          choose=100;
          
          const sIcon = {
      url: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|ff0000|000000',
      scaledSize: new google.maps.Size(30,30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
      }
          const youAreHere = new google.maps.Marker({
          map,
          icon: sIcon,
          position: pos,
          title: "You Are Here"
        });
          
          infoWindowCurrentLocation.setPosition(pos);
          infoWindowCurrentLocation.setContent("You're here");
          
          infoWindowCurrentLocation.open(map);
          
          map.setCenter(pos);
        
          posy = pos;
          console.log(posy);
          
          searchForRestaurants(pos);
          
          // searchForParks(pos);
        },
        () => {
          handleLocationError(true, infoWindowCurrentLocation, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindowCurrentLocation, map.getCenter());
    }
  });
  
  
  
  
  
  
  
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


function searchForRestaurants(location){
  
  let request = {
    location: location,
    radius: rad,
    query:"restaurant"
  };
  
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, processRestaurants);
}

function processRestaurants(results, status){
  if (status == google.maps.places.PlacesServiceStatus.OK){
    
    deleteMarkers();
    
    for(let i = 0; i <results.length; i++){
      let place = results[i];
      createMarker(place);
      
    }

    rusa=results;
    
  }
}



function createMarker(place){
    if (!place.geometry || !place.geometry.location) return;
  
  const scaledIcon = {
    url: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|ffff00|000000',
    scaledSize: new google.maps.Size(30,30),
    origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
  }

       
         
        
          // searchForParks(pos);
        
        
  
  let marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    icon: scaledIcon,
    title:place.name
  });
  
  google.maps.event.addListener(marker, "click", () => {
   console.log(posy);
    console.log(place.name);
     dest = place.name;
    let contentString = "<h3>" + place.name + "</h3>" + "Rating: <b>"
    + place.rating + "</b> / 5 <p>" + place.formatted_address +"</p>" +
        "<button id = 'fof' onclick='directions()'>BUS</button>" +
        "<button id = 'fuf' onclick='directions2()'>CAR</button>" + 
        "<button id = 'faf' onclick='directions3()'>WALK</button>";

    infoWindowRestaurant.setContent(contentString || "");
    infoWindowRestaurant.open(map, marker);
  });
  

  markers.push(marker);
  console.log("lol");
}



function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
function setMapOnBest(map){
  for (let i = 0; i < markers.length; i++) {
    if (markers[i].rating>0){
    markers[i].setMap(map);
    }
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

  
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
  
  
  directionsRenderer.setMap(map);

  
  
}


function directions() {
  
  console.log(posy);
  console.log(dest);
let transportType='TRANSIT';
  directionsService
    .route({
      origin: posy,
      destination: dest,
      travelMode: transportType,
      transitOptions: google.maps.TravelMode["BUS"]
    })
    .then(response => {
      console.log(response);
      directionsRenderer.setDirections(response);
    })
    .catch(e => window.alert("Directions Request failed due to " + status));
  directionsRenderer.setMap(map);
}
function directions2() {
  
  console.log(posy);
  console.log(dest);
let transportType='DRIVING';
  directionsService
    .route({
      origin: posy,
      destination: dest,
      travelMode: transportType,
      transitOptions: google.maps.TravelMode["BUS"]
    })
    .then(response => {
      console.log(response);
      directionsRenderer.setDirections(response);
    })
    .catch(e => window.alert("Directions Request failed due to " + status));
  directionsRenderer.setMap(map);
}
function directions3() {
  
  console.log(posy);
  console.log(dest);
let transportType='WALKING';
  directionsService
    .route({
      origin: posy,
      destination: dest,
      travelMode: transportType,
      transitOptions: google.maps.TravelMode["BUS"]
    })
    .then(response => {
      console.log(response);
      directionsRenderer.setDirections(response);
    })
    .catch(e => window.alert("Directions Request failed due to " + status));
  directionsRenderer.setMap(map);
}


/*function calcRoute(start, end) {

  console.log("entered");
  let request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}*/
