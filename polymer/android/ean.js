
var geocoder = new google.maps.Geocoder();

function fetchHotels () {
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
        			"<div class='hotel-block hotel'>" 
        			+ "<div class='details'>" 
        			+ "<div class='name'>" + hotel.name + "</div>" 
        			+ "<div>" + starRating + "</div>"
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
            position: google.maps.ControlPosition.LEFT_TOP
        }
    });


    geocoder.geocode( { 'address': 'London, UK'}, function(pos, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log (pos[0].geometry.location.k + " " + pos[0].geometry.location.B)
            map.setCenter(pos[0].geometry.location);
            var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos[0].geometry.location.k, pos[0].geometry.location.A),
                    map: map
                });
        } 
    });

    



    
}