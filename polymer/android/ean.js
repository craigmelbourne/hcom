
var city = "London, United Kingdom"
var cityLatLng;
var center;
var geocoder = new google.maps.Geocoder();
var map;
var markers = [];
var list;
var hotel;
var rooms;

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

	
	
	//var rooms = hotel.RoomTypes.RoomType;

	

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

var hotelList = [
	{"image": "http://exp.cdn-hotels.com/hotels/4000000/3120000/3113100/3113039/3113039_116_z.jpg", "rating": "4.5/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/2000000/1120000/1112700/1112611/1112611_56_z.jpg", "rating": "4.9/5 Outstanding"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/30000/21600/21514/21514_77_z.jpg", "rating": "3.9/5 Good"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/30000/27200/27158/27158_94_z.jpg", "rating": "4.8/5 Outstanding"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/30000/28200/28146/28146_103_z.jpg", "rating": "4.7/5 Outstanding"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/470000/470000/469914/469914_26_z.jpg", "rating": "4.5/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/2000000/1590000/1584700/1584661/1584661_105_z.jpg", "rating": "4.3/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/120000/116100/116041/116041_52_z.jpg", "rating": "4.3/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/570000/565700/565604/565604_71_z.jpg", "rating": "4.5 / 5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/530000/525900/525818/525818_194_y.jpg", "rating": "4.2/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/30000/22500/22478/22478_77_z.jpg", "rating": "4.1/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/4000000/3300000/3296200/3296165/3296165_136_z.jpg", "rating": "4.4/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/560000/559700/559689/559689_81_z.jpg", "rating": "4.1/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/4000000/3980000/3978000/3977996/3977996_77_z.jpg", "rating": "4.5/5 Outstanding"},
	{"image": "http://exp.cdn-hotels.com/hotels/3000000/2540000/2531100/2531003/2531003_57_z.jpg", "rating": "2.5/5 Fair"},
	{"image": "http://exp.cdn-hotels.com/hotels/4000000/3910000/3907800/3907784/3907784_147_z.jpg", "rating": "4.4/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/3000000/2150000/2143100/2143095/2143095_57_z.jpg", "rating": "3.9/5 Good"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/30000/26100/26035/26035_89_z.jpg", "rating": "4.5/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/5000000/4220000/4212200/4212191/4212191_71_z.jpg", "rating": "4.3/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/440000/436300/436225/436225_93_z.jpg", "rating": "4.3/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/440000/431700/431650/431650_147_z.jpg", "rating": "4.5 / 5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/2000000/1190000/1183300/1183289/1183289_131_y.jpg", "rating": "4.2/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/810000/805000/804955/804955_114_z.jpg", "rating": "4.1/5 Excellent"},
	{"image": "http://exp.cdn-hotels.com/hotels/1000000/10000/2700/2651/2651_67_z.jpg", "rating": "4.4/5 Excellent"}
]

function displayHotelList(){

	fetchHotelsList(function(hotels){

		console.log (hotels.length)

		for (i = 0; i < hotelList.length; i++) {
    		console.log(hotels[i].name + " - " + hotelList[i].image + " - $" + Math.floor(hotels[i].lowRate));
    		$("#chip-wrapper").append(
    			"<div class='chip' id='" + hotels[i].hotelId + "'>"
    			+ "<div class='details'>"
    			+ "<div class='name'>" + hotels[i].name + "</div>"
    			+ "<div class='stars'>&#9733;&#9733;&#9733;&#9733;</div>"
    			+ "<div class='price'>$" + Math.floor(hotels[i].lowRate) + " <span style='font-size:13px; color:#999; text-decoration:line-through;'>$" + Math.floor(hotels[i].lowRate * 1.2)  + "</span></div>"
    			+ "<div class='review'>" + hotelList[i].rating + "</div>"
    			+ "</div>"
    			+ "<div class='photo' style='background-image: url(" + hotelList[i].image + ")'></div>"
    			+ "</div>"
    		)
		}


		//
	//<div class="details">
		//<div class="name">Park Plaza Westminster Bridge London</div>
		//<div class="stars">&#9733;&#9733;&#9733;&#9733;</div>
		//<div class="price">$212</div>
    //<div class="review">4.5/5 Excellent</div>
	//</div>
	//<div class="photo" style="background-image: url('http://exp.cdn-hotels.com/hotels/4000000/3120000/3113100/3113039/3113039_116_z.jpg')"></div>
//


		$.each(hotels, function(i, hotel) {

			//addMarker(hotel.latitude, hotel.longitude);
		
		});
		//showChips();
	});

}


function getRooms(hotelId){


			$.ajax({

			crossDomain: true,
        	url: "https://api.eancdn.com/ean-services/rs/hotel/v3/avail",

			data: {
            	cid: 55505,
            	minorRev: 99,
            	apiKey: "xgdsee58vcvfhpr4hhvvhych",
            	locale: "en_US",
            	currencyCode: "GBP",
            	arrivalDate: "09/30/2014",
            	departureDate: "10/01/2014",
            	hotelId: hotelId,
            	room1: 2
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
        		rooms = json.HotelRoomAvailabilityResponse.HotelRoomResponse

        		roomLayout(rooms[0]);





        		var roomdescription = "<div style='margin-bottom:12px;'>Complimentary wireless Internet access keeps you connected, and the 40-inch flat-screen TV offers satellite channels. A refrigerator is supplied. The private bathroom has a shower with a rainfall showerhead, as well as bathrobes and complimentary toiletries. Air conditioning, complimentary bottled water, and a safe are among the conveniences offered. This room is Non-Smoking.</div>"
        		var roomamenities = "<div style='display:none;'><ul class='amenities-room'><li>Air conditioning</li><li>Bathrobes</li><li>Complimentary bottled water</li><li>Complimentary newspaper</li><li>Complimentary toiletries</li><li>Connecting/adjoining rooms available</li><li>Daily housekeeping</li><li>Egyptian-cotton sheets</li><li>First-run movies</li><li>Flat-panel TV</li><li>Free Wi-Fi</li><li>Hair dryer</li><li>Individually decorated</li><li>Individually furnished</li><li>In-room safe</li><li>Iron/ironing board (on request)</li><li>Phone</li><li>Private bathroom</li><li>Rainfall showerhead</li><li>Refrigerator</li><li>Satellite TV service</li><li>Shower only</li><li>Soundproofed rooms</li><li>Turndown service</li></ul></div>";



        		$("#room #rate .total").text(
        			"$" + Math.floor(rooms[0].RateInfos.RateInfo.ChargeableRateInfo["@total"])
        		);

        		$("#room #rate .fullprice").text(
        			"$" + Math.floor(rooms[0].RateInfos.RateInfo.ChargeableRateInfo["@total"] * 1.2)
        		);

        		

        		$("#allrooms").text("SEE ALL ROOMS (" + json.HotelRoomAvailabilityResponse["@size"] + ")");


        		$.each(rooms, function(i, room) {

        			var cancellation;
        			var extras = ""; 
        			var beds = "";

        			if (room.RateInfos.RateInfo.nonRefundable == true){
        				cancellation = "<div style='font-size:13px; margin: 12px 0 5px'>Non refundable</div>";
        			} else {
        				cancellation = "<div style='font-size:13px; margin: 12px 0 5px; color:#090;'>Free cancellation</div>";
        			}

        			if (typeof (room.ValueAdds) === "undefined") {
        				console.log("type" + typeof (room.ValueAdds))
        			} else if (room.ValueAdds["@size"] == 1) {
        
    					extras = "<div class='extra'>" + room.ValueAdds.ValueAdd.description + "</div>";
        			} else {
        				for (i = 0; i < room.ValueAdds["@size"]; i++) { 
    						extras += "<div class='extra'>" + room.ValueAdds.ValueAdd[i].description + "</div>";
						}
        			}

        			if (room.BedTypes["@size"] == "1"){
        				beds = room.BedTypes.BedType.description;
        			} else {
        				//beds = "more than 1 bed";
        				for (i = 0; i < room.BedTypes["@size"]; i++) { 
    						beds += "<div>" + room.BedTypes.BedType[i].description + "</div>";
						}
        			}

      				$("#rooms-wrapper .rooms").append(
      					"<div class='room' id='" + i + "' style='padding:12px; margin:12px auto; background-color:#fff;'>" 
      					+ "<div style='border-bottom:solid 1px #eee; padding-bottom:12px; overflow:hidden;'>" 
      					+ "<div class='image' style='float:left; margin-right:12px;'></div>"
      					+ "<div class='details' style='float:left; width:250px;'><div>" + room.roomTypeDescription + "</div><div style='margin:5px 0; font-size:13px;'>" + beds + "</div><div><a href='#' class='rooms-more' rel='"+ i +"'>More information</a></div>" + "<div class='more-info'>" + roomdescription + roomamenities +"</div></div>"
      					
      					+ "</div>"
      					
      					+ "<div style='overflow:hidden'>"
      					+ "<div style='float:left; width:50%'>" + cancellation + extras + "<div style='font-size:13px; color:purple'>Welcome Rewards</div></div>"
      					+ "<div style='float:50%; text-align:right; padding-top:12px;'>" 
      					+ "<div style='color:#999; font-size:14px; text-decoration:line-through'>$" + (Math.floor(room.RateInfos.RateInfo.ChargeableRateInfo["@total"] * 1.2)) + "</div>"
      					+ "<div style='color:#d41200; font-size:28px;'>$" + Math.floor(room.RateInfos.RateInfo.ChargeableRateInfo["@total"]) + "</div>"
      					+ "<div style='color:#999; margin:5px 0; font-size:13px;'>1 room for 1 night</div><div style='color:#999; margin:5px 0; font-size:12px;'>includes taxes and fees</div>"
      					+ "<button class='book'>BOOK</button>"	
      					+ "</div>" 
      					+ "</div>"
      					+ "</div>"
      					);
					


    			});

				$(".room ul.amenities-room li").append(",");
        	
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

function roomLayout(room){
 	console.log(room);

 	var cancellation;
        			var extras = ""; 
        			var beds = "";

        			if (room.RateInfos.RateInfo.nonRefundable == true){
        				cancellation = "<div style='font-size:13px; margin: 12px 0 5px'>Non refundable</div>";
        			} else {
        				cancellation = "<div style='font-size:13px; margin: 12px 0 5px; color:#090;'>Free cancellation</div>";
        			}

        			if (typeof (room.ValueAdds) === "undefined") {
        				console.log("type" + typeof (room.ValueAdds))
        			} else if (room.ValueAdds["@size"] == 1) {
        
    					extras = "<div class='extra'>" + room.ValueAdds.ValueAdd.description + "</div>";
        			} else {
        				for (i = 0; i < room.ValueAdds["@size"]; i++) { 
    						extras += "<div class='extra'>" + room.ValueAdds.ValueAdd[i].description + "</div>";
						}
        			}

        			if (room.BedTypes["@size"] == "1"){
        				beds = room.BedTypes.BedType.description;
        			} else {
        				//beds = "more than 1 bed";
        				for (i = 0; i < room.BedTypes["@size"]; i++) { 
    						beds += "<div>" + room.BedTypes.BedType[i].description + "</div>";
						}
        			}

      				$("#room #rate").html(
      					"<div>" 
      					+ "<div style='border-bottom:solid 1px #eee; padding-bottom:12px; overflow:hidden;'>" 
      					+ "<div class='image' style='float:left; margin-right:12px; width:60px; height:60px; background-color:#eee;'></div>"
      					+ "<div class='details' style='float:left; width:300px;'><div>" + room.roomTypeDescription + "</div><div style='margin:5px 0; font-size:13px;'>" + beds + "</div></div>"
      					+ "</div>"
      					+ "<div style='overflow:hidden'>"
      					+ "<div style='float:left; width:50%'>" + cancellation + extras + "<div style='font-size:13px; color:purple'>Welcome Rewards</div></div>"
      					+ "<div style='float:50%; text-align:right; padding-top:12px;'>" 
      					+ "<div style='color:#999; font-size:14px; text-decoration:line-through'>$" + (Math.floor(room.RateInfos.RateInfo.ChargeableRateInfo["@total"] * 1.2)) + "</div>"
      					+ "<div style='color:#d41200; font-size:28px;'>$" + Math.floor(room.RateInfos.RateInfo.ChargeableRateInfo["@total"]) + "</div>"
      					+ "<div style='color:#999; margin:5px 0; font-size:13px;'>1 room for 1 night</div><div style='color:#999; margin:5px 0; font-size:12px;'>includes taxes and fees</div>"
      					+ "<button class='book'>BOOK</button>"	
      					+ "</div>" 
      					+ "</div>"
      					+ "</div>"
      					)


}

