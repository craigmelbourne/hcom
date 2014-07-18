var result;
var gmarkers = [];
var matches;
var currentdestination;

var destinations = [  
      'Atlantic City', 'Austin', 'Baltimore', 'Boston', 'Chicago', 'Dallas', 
      'Denver', 'Honolulu', 'Las Vegas', 'Los Angeles', 'Miami', 'Minneapolis', 
      'Montreal', 'New York', 'Nashville', 'New Orleans',  'Orlando', 'Philadelphia', 
      'Portland', 'San Francisco', 'Seattle', 'San Antonio', 'Vancouver', 'Washington'
];

var cities = [
    {"city": "Atlantic City", "lon":-74.422928, "lat": 39.364285, "ranking": 1},
    {"city": "Austin", "lon":-97.743057, "lat":30.267153, "ranking": 1},
    {"city": "Baltimore", "lon":-76.612190, "lat":39.290386, "ranking": 1},
    {"city": "Boston", "lon":-71.059776, "lat":42.358433, "ranking": 0},
    {"city": "Chicago", "lon":-87.629799,"lat":41.878113, "ranking": 0},
    {"city": "Dallas", "lon":-96.769920,"lat":32.802956, "ranking": 0},
    {"city": "Denver", "lon":-104.984718, "lat": 39.737568, "ranking": 0},
    {"city": "Honolulu", "lon":-157.858337,"lat":21.306944, "ranking": 0},
    {"city": "Las Vegas", "lon":-115.172813,"lat":36.114647, "ranking": 0},
    {"city": "Los Angeles", "lon":-118.243683,"lat":34.052235, "ranking": 0},
    {"city": "Miami", "lon":-80.226440,"lat":25.788969, "ranking": 0},
    {"city": "Minneapolis", "lon":-93.266670,"lat":44.983334, "ranking": 1},
    {"city": "Montreal", "lon":-73.553993, "lat":45.508671, "ranking": 1},
    {"city": "New York", "lon":-74.005974, "lat":40.714352, "ranking": 0},
    {"city": "Nashville", "lon":-86.783333, "lat":36.166668, "ranking": 1},
    {"city": "New Orleans", "lon":-90.071532, "lat":29.951066, "ranking": 0},
    {"city": "Orlando", "lon":-81.379234, "lat":28.538336, "ranking": 0},
    {"city": "Portland", "lon":-122.676208, "lat": 45.523453, "ranking": 0},
    {"city": "Philadelphia", "lon":-75.163788, "lat":39.952335, "ranking": 1},
    {"city": "San Francisco", "lon":-122.419418, "lat": 37.774929, "ranking": 0},
    {"city": "Seattle", "lon":-122.332069, "lat":47.606209, "ranking": 0},
    {"city": "San Antonio", "lon":-98.493629, "lat":29.424122, "ranking": 1},
    {"city": "Vancouver", "lon":-123.113930, "lat":49.261227, "ranking": 0},
    {"city": "Washington", "lon":-77.036369,"lat":38.895111, "ranking": 0}
]


function buildDestinationSelctBox(){
    $.each(cities, function(i, city) {
      $("select").append("<option>" + city.city + "</option>")
    });
} 

function initializeMap(result) {
    var loc = new google.maps.LatLng(result[0].lat, result[0].lon);
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: loc,
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
}

function openInfoBox(id) {
        //currentMarker = i;
        google.maps.event.trigger(gmarkers[id], 'click');
        
    };

var infowindow = new google.maps.InfoWindow;

function fetchResults(result){
    $(".fetching").show();
    $("#list ul li").remove();
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
            currencyCode: "USD",
            arrivalDate: "07/31/2014",
            departureDate: "08/01/2014",
            longitude: result[0].lon,
            latitude: result[0].lat,
            numberOfResults: 20
        },

        // whether this is a POST or GET request
        type: "GET",

        // the type of data we expect back
        dataType : "jsonp",
 
        // code to run if the request succeeds;
        // the response is passed to the function
        success: function( json ) {
            var hotels = json.HotelListResponse.HotelList.HotelSummary;
            console.log(hotels);
            $(".fetching").hide()
                        
            $.each(hotels, function(i, hotel) {
                $("#list ul").append(
                    "<li id='" + hotel.hotelId + "''>"
                    + "<div class='thumb'><img  src='http://images.travelnow.com" + hotel.thumbNailUrl + "'/></div>" 
                    + "<div class='details'>"
                    + "<div class='name'>" + hotel.name + "</div>" 
                    + "<img class='ta' src='" + hotel.tripAdvisorRatingUrl + "' />"
                    + "<div class='price'>$" + Math.round(hotel.lowRate) + "</div>"
                    + "</div>"
                    + "</li>");
                            
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(hotel.latitude, hotel.longitude),
                    map: map
                    //icon: icon
                }); 

                var infoWindowContent = "<div class='name'>" + hotel.name + "</div>" + "<img class='ta' src='" + hotel.tripAdvisorRatingUrl + "' />" + "<div class='price'>$" + Math.round(hotel.lowRate) + "</div>" ;

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(infoWindowContent);
                    infowindow.open(map,marker);
                });

                gmarkers[hotel.hotelId] = marker;

            });
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
        complete: function( xhr, status ) {
            //alert( "The request is complete!" );
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

