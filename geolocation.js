$("#error").hide();
$("#hud").show();

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(gotLocation, gotError);
} else {
  displayError("Your browser doesn't support geolocation.");
}


function gotLocation(currentPosition) {
  $("#hud").hide();

  var $restaurants = $("span");

  $restaurants.each(function(){
    var restaurantLatitude = $(this).data("lat");
    var restaurantLongitude = $(this).data("lon");

    var distanceInMiles = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, restaurantLatitude, restaurantLongitude);

    $(this).text(distanceInMiles + " miles");
  });
}

function gotError (error) {
  var message;

  switch (error.code) {

    case error.PERMISSION_DENIED:
      message = "You need to give permission for us to have your location to calculate distances.";
      break;
  }
  displayError(message);
}

function displayError(message) {
  $("#hud").hide();
  $("#error").text(message).slideDown("slow");
}
