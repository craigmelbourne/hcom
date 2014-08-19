
var city = "London, UK"
var cityLatLng;
var center;
var geocoder = new google.maps.Geocoder();
var map;
var markers = [];
var list;
var hotel;

function geocodeString(callback) {
	geocoder.geocode( { 'address': city}, function(pos, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        	console.log("success");
        	callback(pos);
        	cityLatLng = pos[0].geometry.location;
        } else {
        	console.log("failed");
        	callback(status);
        }

     });
}

function addMarker(lat, lng) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    icon: '../pin.png'
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

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function getHotels(){

	fetchHotelsList(function(hotels){

		$.each(hotels, function(i, hotel) {

			addMarker(hotel.latitude, hotel.longitude);
		
		});
		showChips();
	});

}

function showChips() {
	$('.chip').each(function(i) {
		$(this).delay((i++) * 100).fadeIn(200); 
	})
}

function fetchHotelsList(callback) {

    var hotels;
    //var geo = geocodeString();
    geocodeString(function(pos){

		var loc = pos[0].geometry.location
    	

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
            	longitude: loc.lng(), //result[0].lon,
            	latitude: loc.lat(), //result[0].lat,
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
            var loc = pos[0].geometry.location
            
        


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
            longitude: loc.lng(), //result[0].lon,
            latitude: loc.lat(), //result[0].lat,
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
                        hotel = json.HotelInformationResponse
                        buildHotelDetails(hotel);
                        //mapPDP(json.HotelInformationResponse);

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

function initializeMap(pan) {
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
            
            if (pan != 0) {
            	console.log("pan = " + pan)
            	map.panBy(pan, 0);

            }
            
            if (list != null) {
				
				getHotels();
			}
        } 
    });



    
}

function buildHotelDetails(hotel){
	console.log(hotel);

	var hotelId = hotel.HotelSummary.hotelId

	$("#address").html(hotel.HotelSummary.address1 + ", " + hotel.HotelSummary.city + ", " + hotel.HotelSummary.postalCode);
	$(".photo h1").text(hotel.HotelSummary.name);
	$(".photo div").html($("#" + hotelId).find(".stars").html());
	$(".about p").html(hotel.HotelDetails.amenitiesDescription);
	$("#trip-score").html(
		"<img src='" + hotel.HotelSummary.tripAdvisorRatingUrl + "' /><br /><span style='font-size:12px'>" + hotel.HotelSummary.tripAdvisorReviewCount + " Trip Advisor reviews</span>"
	);

	$("#review-score .score").text($("#" + hotelId).find(".review").text());

	
	
	var rooms = hotel.RoomTypes.RoomType;

	$.each(rooms, function(i, room) {
      $("#rooms-wrapper .rooms").append("<div style='padding:12px; margin:12px; background-color:#fff;'><h2>" + room.description + "</h2></div>")
    });

	if (map != null){
		mapPDP(hotel);
	}
	 

}

function mapPDP(hotel){

		map.setZoom(15);
    	addMarker(hotel.HotelSummary.latitude, hotel.HotelSummary.longitude);
    	map.setCenter({lat: hotel.HotelSummary.latitude, lng: hotel.HotelSummary.longitude});
    	map.panBy(-300, 0);
	
}

function mapPDPList(hotel){
	deleteMarkers();
	map.setZoom(15);
    addMarker(hotel.HotelSummary.latitude, hotel.HotelSummary.longitude);
    map.setCenter({lat: hotel.HotelSummary.latitude, lng: hotel.HotelSummary.longitude});
}


function returnSRPView(){
	map.setZoom(14);
	map.setCenter(center);
    showMarkers();
}

var hotelImages = [
	"http://exp.cdn-hotels.com/hotels/4000000/3120000/3113100/3113039/3113039_116_z.jpg", 
	"http://exp.cdn-hotels.com/hotels/2000000/1120000/1112700/1112611/1112611_56_z.jpg",
	"http://exp.cdn-hotels.com/hotels/1000000/30000/21600/21514/21514_77_z.jpg",
	"http://exp.cdn-hotels.com/hotels/1000000/30000/27200/27158/27158_94_z.jpg",
	"http://exp.cdn-hotels.com/hotels/1000000/30000/28200/28146/28146_103_z.jpg",
	"http://exp.cdn-hotels.com/hotels/1000000/470000/470000/469914/469914_26_z.jpg",
	"http://exp.cdn-hotels.com/hotels/2000000/1590000/1584700/1584661/1584661_105_z.jpg",
	"http://exp.cdn-hotels.com/hotels/1000000/120000/116100/116041/116041_52_z.jpg",
	"http://exp.cdn-hotels.com/hotels/1000000/570000/565700/565604/565604_71_z.jpg",
	"http://exp.cdn-hotels.com/hotels/1000000/530000/525900/525818/525818_194_y.jpg"
]

function displayHotelList(){

	fetchHotelsList(function(hotels){

		console.log (hotels.length)

		for (i = 0; i < hotelImages.length; i++) {
    		console.log(hotels[i].name + " - " + hotelImages[i] + " - $" + Math.floor(hotels[i].lowRate));
		}

		$.each(hotels, function(i, hotel) {

			//addMarker(hotel.latitude, hotel.longitude);
		
		});
		showChips();
	});

}

