var result;
var gmarkers = [];
var matches;
var currentdestination;
var geocoder = new google.maps.Geocoder();


var destinations = [];

var cities = [
    {"city": "Amsterdam", "ranking": 0},
    {"city": "Aberdeen", "ranking": 1},
    {"city": "Barcelona", "ranking": 0},
    {"city": "Berlin", "ranking": 0},
    {"city": "Belfast", "ranking": 0},
    {"city": "Birmingham", "ranking": 0},
    {"city": "Blackpool", "ranking": 0},
    {"city": "Bournemouth", "ranking": 0},
    {"city": "Brighton", "ranking": 0},
    {"city": "Bristol", "ranking": 0},
    {"city": "Brussels", "ranking": 0},
    {"city": "Cambridge", "ranking": 0},
    {"city": "Cardiff", "ranking": 0},
    {"city": "Cheltenham", "ranking": 0},
    {"city": "Chester", "ranking": 0},
    {"city": "Copenhagen", "ranking": 0},
    {"city": "Chester", "ranking": 0},
    {"city": "Copenhagen", "ranking": 0},
    {"city": "Cork", "ranking": 0},
    {"city": "Dubai", "ranking": 0},
    {"city": "Dublin", "ranking": 0},
    {"city": "Durham", "ranking": 0},
    {"city": "Edinburgh", "ranking": 0},
    {"city": "Florence", "ranking": 0},
    {"city": "Glasgow", "ranking": 0},
    {"city": "Inverness", "ranking": 0},
    {"city": "London", "ranking": 0},
    {"city": "Las Vegas", "ranking": 1},
    {"city": "Leeds", "ranking": 0},
    {"city": "Liverpool", "ranking": 0},
    {"city": "Leicester", "ranking": 0},
    {"city": "Manchester", "ranking": 0},
    {"city": "Milan", "ranking": 0},
    {"city": "Munich", "ranking": 0},
    {"city": "New York", "ranking": 0},
    {"city": "Newcastle", "ranking": 0},
    {"city": "Nice", "ranking": 0},
    {"city": "Norwich", "ranking": 0},
    {"city": "Oxford", "ranking": 0},
    {"city": "Paris", "ranking": 0},
    {"city": "Prague", "ranking": 0},
    {"city": "Rome", "ranking": 0},
    {"city": "Reading", "ranking": 0},
    {"city": "Scarborough", "ranking": 0},
    {"city": "Shefford", "ranking": 0},
    {"city": "Southampton", "ranking": 0},
    {"city": "Venice", "ranking": 0},
    {"city": "Windsor", "ranking": 0},
    {"city": "York", "ranking": 0}
]

function buildDestinationList() {
    $.each(cities, function(i, city) {
      destinations.push(city.city);
    });
}

buildDestinationList();

function buildDestinationSelctBox(){

    $.each(cities, function(i, city) {
      $("select").append("<option>" + city.city + "</option>")
    });
} 

function buildHotelist(hotels){
    $(".fetching").hide()
            //$("#list ul").show();
            $("#list ul li").remove();
            console.log(hotels); 

    var total = "";
    


    $.each(hotels, function(i, hotel) {
        var starRating = "";
        for (i = 1; i <= Math.floor(hotel.hotelRating) ; i++) { 
            starRating += "<span class='star'>&#9733;</span>";
        }

        for (i = 1; i <= (5 - Math.floor(hotel.hotelRating)) ; i++) { 
            starRating += "<span class='star' style='color:#ccc'>&#9733;</span>";
        }

        if (Math.round(hotel.highRate) != Math.round(hotel.lowRate)){
            total = "<span class='highprice'>&pound;" + Math.round(hotel.highRate) + "</span> <span class='total' style='color:#D41200'>&pound;" + Math.round(hotel.lowRate) + "</span>"
        } else {
            total = "<span class='total'>&pound;" + Math.round(hotel.lowRate) + "</span>";
        }

        

       // total =  ;


        $("#list ul").append(
                    "<li id='" + hotel.hotelId + "''>"
                    + "<div class='thumb'><img  src='http://images.travelnow.com" + hotel.thumbNailUrl + "'/></div>" 
                    + "<div class='details'>"
                    + "<div class='stars'>" + starRating + "</div>"
                    + "<div class='name'>" + hotel.name + "</div>" 
                    + "<img class='ta' src='" + hotel.tripAdvisorRatingUrl + "' />"
                    + "</div>"
                    + "<div class='price-wrapper'><div class='price'>" + total + "</div></div></div>"
                    
                    + "</li>");
                            
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(hotel.latitude, hotel.longitude),
                    map: map
                    //icon: icon
                }); 

                var infoWindowContent = "<div class='name'>" + hotel.name + "</div>" + "<img class='ta' src='" + hotel.tripAdvisorRatingUrl + "' />" + "<div class='price'>&pound;" + Math.round(hotel.lowRate) + "</div>" ;

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(infoWindowContent);
                    infowindow.open(map,marker);
                });

                gmarkers[hotel.hotelId] = marker;
    });
    
}

function initializeMap(result) {
    
    console.log(result[0].city)
    

//var loc = new google.maps.LatLng(result[0].lat, result[0].lon);
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        //center: loc,
        zoom: 13,
        mapTypeId: 'roadmap',
        mapTypeId: google.maps.MapTypeId.ROADMAP, 
        panControl: false,
        mapTypeControl: false,
        streetViewControl:false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.MEDIUM,
            position: google.maps.ControlPosition.RIGHT_TOP
        }
    });


    geocoder.geocode( { 'address': result[0].city}, function(pos, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log (pos[0].geometry.location.k + " " + pos[0].geometry.location.B)
            map.setCenter(pos[0].geometry.location);
        } 
    });


    
}

function openInfoBox(id) {
        //currentMarker = i;
        google.maps.event.trigger(gmarkers[id], 'click');
        
    };

var infowindow = new google.maps.InfoWindow;

function fetchResults(result){

    var lon;
    var lat;

    geocoder.geocode( { 'address': result}, function(pos, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(pos);
            lon = pos[0].geometry.location.B;
            lat = pos[0].geometry.location.k;

           
        
    $.ajax({
        
        crossDomain: true,
        // the URL for the request
        url: "https://api.eancdn.com/ean-services/rs/hotel/v3/list",
 
        // the data to send (will be converted to a query string)
        data: {
            cid: 55505,
            minorRev: 99,
            apiKey: "xgdsee58vcvfhpr4hhvvhych",
            locale: "en_US",
            currencyCode: "GBP",
            arrivalDate: "07/31/2014",
            departureDate: "08/01/2014",
            longitude: lon, //result[0].lon,
            latitude: lat, //result[0].lat,
            searchRadius: 2,
            searchRadiusUnit: "MI",
            numberOfResults: 20
        },

        // whether this is a POST or GET request
        type: "GET",

        // the type of data we expect back
        dataType : "jsonp",
 
        // code to run if the request succeeds;
        // the response is passed to the function
        success: function( json ) {
            //console.log("got results")
            var hotels = json.HotelListResponse.HotelList.HotelSummary;
            //console.log(hotels);

            if (currentdestination != result){
                console.log("Last searched for" + currentdestination + " + results for " + result + " don't build");
            }  else {
                console.log("Last searched for" + currentdestination + " + results for " + result + " go build list");
                buildHotelist(hotels);
            }

        },
 
        // code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: function( xhr, status, errorThrown ) {
             alert( "Sorry, there was a problem!" );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        },
 
        // code to run regardless of success or failure
        complete: function( xhr, status ) {
            
        }
    });

    } else {
        console.log("hasn't worked");
    }
    });


}


var substringMatcher = function(strs) {
          return function findMatches(q, cb) {
            var substringRegex;
 
            // an array that will be populated with substring matches
            matches = [];
 
            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp( "^" + q, "i" );
 
            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                //console.log(str);
                if (substrRegex.test(str)) {
                  // the typeahead jQuery plugin expects suggestions to a
                  // JavaScript object, refer to typeahead docs for more info
                  matches.push({ value: str });
                }
            });
          //console.log(matches)
          cb(matches);
          };
      };

