
var geocoder = new google.maps.Geocoder();
var map;
var markers = [];

function geocodeString(callback) {
	geocoder.geocode( { 'address': 'london, uk'}, function(pos, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        	console.log("success");
        	callback(pos);
        } else {
        	console.log("failed");
        	callback(status);
        }

     });
}

function addMarker(lat, lng) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map
  });
  markers.push(marker);
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setAllMap(null);
}

function showMarkers() {
  setAllMap(map);
}

function getHotels(){

	fetchHotelsList(function(hotels){

		$.each(hotels, function(i, hotel) {

			addMarker(hotel.latitude, hotel.longitude);
		
		});

	});

}

function fetchHotelsList(callback) {
	var lon;
    var lat;
    var hotels;
    //var geo = geocodeString();
    geocodeString(function(pos){
    	console.log(pos);
    	lon = pos[0].geometry.location.A;
        lat = pos[0].geometry.location.k;
    	$.ajax({

			crossDomain: true,
        	url: "https://api.eancdn.com/ean-services/rs/hotel/v3/list",
			data: {
            	cid: 55505,
            	minorRev: 99,
            	apiKey: "xgdsee58vcvfhpr4hhvvhych",
            	locale: "en_US",
            	currencyCode: "GBP",
            	arrivalDate: "09/30/2014",
            	departureDate: "10/01/2014",
            	longitude: lon, //result[0].lon,
            	latitude: lat, //result[0].lat,
            	searchRadius: 2,
            	searchRadiusUnit: "MI",
            	numberOfResults: 50
        	},

        	// whether this is a POST or GET request
        	type: "GET",

        	// the type of data we expect back
        	dataType : "jsonp",
        	timeout:3000,
 
        	// code to run if the request succeeds;
        	// the response is passed to the function
        	success: function( json ) {
        		console.log (json);

        		var hotels = json.HotelListResponse.HotelList.HotelSummary;
        		callback(hotels);
        	
        	}, 

        	error: function( xhr, status, errorThrown ) {
            	 //alert( "Sorry, there was a problem!" );
            	console.log( "Error: " + errorThrown );
            	console.log( "Status: " + status );
            	console.dir( xhr );
        	},
 
        	// code to run regardless of success or failure
        	complete: function( xhr, status ) {
            
        	}

		});

  	});
}

function fetchHotels() {
	var lon;
    var lat;

    geocoder.geocode( { 'address': 'london, uk'}, function(pos, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(pos);
            lon = pos[0].geometry.location.A;
            lat = pos[0].geometry.location.k;
        


     console.log(lon);

	$.ajax({

		crossDomain: true,
        url: "https://api.eancdn.com/ean-services/rs/hotel/v3/list",
		data: {
            cid: 55505,
            minorRev: 99,
            apiKey: "xgdsee58vcvfhpr4hhvvhych",
            locale: "en_US",
            currencyCode: "GBP",
            arrivalDate: "09/30/2014",
            departureDate: "10/01/2014",
            longitude: lon, //result[0].lon,
            latitude: lat, //result[0].lat,
            searchRadius: 2,
            searchRadiusUnit: "MI",
            numberOfResults: 15
        },

        // whether this is a POST or GET request
        type: "GET",

        // the type of data we expect back
        dataType : "jsonp",
        timeout:3000,
 
        // code to run if the request succeeds;
        // the response is passed to the function
        success: function( json ) {
        	console.log (json);

        	var hotels = json.HotelListResponse.HotelList.HotelSummary;

        	$.each(hotels, function(i, hotel) {

        		var starRating = "";

        		for (i = 1; i <= Math.floor(hotel.hotelRating) ; i++) { 
            		starRating += "<span class='star' style='color:#900'>&#9733;</span>";
        		}
        		
        		if (Math.round(hotel.highRate) != Math.round(hotel.lowRate)){
            		//total = "<span class='highprice'>&pound;" + Math.round(hotel.highRate) + "</span> <span class='total' style='color:#D41200'>&pound;" + Math.round(hotel.lowRate) + "</span>"
        			total = "<span class='total'>&pound;" + Math.round(hotel.lowRate) + "</span>";
        		} else {
            		total = "<span class='total'>&pound;" + Math.round(hotel.lowRate) + "</span>";
        		}

        		$("#hotel-list").append(
        			"<div class='hotel-block hotel' id='"+ hotel.hotelId + "'>" 
        			+ "<div class='details'>" 
        			+ "<div class='name'>" + hotel.name + "</div>" 
        			+ "<div class='star'>" + starRating + "</div>"
        			+ "<div class='price'>" + total + "</div>"
        			+ "</div>"
        			+ "<div class='image'></div>"
        			+ "</div>"
        		);
    		});
        }, 

        error: function( xhr, status, errorThrown ) {
             //alert( "Sorry, there was a problem!" );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        },
 
        // code to run regardless of success or failure
        complete: function( xhr, status ) {
            
        }

	});

}
    });

}

function fetchHotelDetails(id){
        
                $.ajax({
        
                    crossDomain: true,
                    // the URL for the request
                    url: "https://api.eancdn.com/ean-services/rs/hotel/v3/info",
 
                    // the data to send (will be converted to a query string)
                    data: {
                        cid: 55505,
                        minorRev: 99,
                        apiKey: "xgdsee58vcvfhpr4hhvvhych",
                        locale: "en_US",
                        currencyCode: "GBP",
                        hotelId: id
                    },

                    // whether this is a POST or GET request
                    type: "GET",

                    // the type of data we expect back
                    dataType : "jsonp",
                    timeout:3000,
 
                    // code to run if the request succeeds;
                    // the response is passed to the function
                    success: function( json ) {
                        //console.log(json.HotelInformationResponse);
                        //var summary = json.
                        //buildHotelDetails(json.HotelInformationResponse)
                        //console.log(json);
                        buildHotelDetails(json.HotelInformationResponse)
                    },
 
                    // code to run if the request fails; the raw request and
                    // status codes are passed to the function
                    error: function( xhr, status, errorThrown ) {
                        //alert( "Sorry, there was a problem!" );
                        console.log( "Error: " + errorThrown );
                        console.log( "Status: " + status );
                        console.dir( xhr );
                    },
 
                    // code to run regardless of success or failure
                    complete: function( xhr, status ) {}
                });
            };

function initializeMap() {
      //console.log(result[0].city)
    

//var loc = new google.maps.LatLng(result[0].lat, result[0].lon);
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        //center: loc,
        zoom: 14,
        mapTypeId: 'roadmap',
        mapTypeId: google.maps.MapTypeId.ROADMAP, 
        panControl: false,
        mapTypeControl: false,
        streetViewControl:false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
    });


    geocoder.geocode( { 'address': 'London, UK'}, function(pos, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log (pos[0].geometry.location.k + " " + pos[0].geometry.location.B)
            map.setCenter(pos[0].geometry.location);
        } 
    });

    
}

function buildHotelDetails(hotel){
	console.log(hotel);
	$("#address").html(hotel.HotelSummary.address1);
	$(".photo h1").text(hotel.HotelSummary.name);
	$(".about p").html(hotel.HotelDetails.amenitiesDescription); 
	
	var rooms = hotel.RoomTypes.RoomType;

	$.each(rooms, function(i, room) {
      $("#rooms").append("<div class='details-block'><h2>" + room.description + "</h2></div>")
    });

	map.setZoom(15);
    addMarker(hotel.HotelSummary.latitude, hotel.HotelSummary.longitude);
    map.setCenter({lat: hotel.HotelSummary.latitude, lng: hotel.HotelSummary.longitude});
    
    map.panBy(-300, 0);

}

