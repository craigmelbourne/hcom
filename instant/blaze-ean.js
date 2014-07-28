var result;
var gmarkers = [];
var matches;
var currentdestination;
var geocoder = new google.maps.Geocoder();
var prices = [];
var highPrice;
var lowPrice;

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}


var destinations = [];

var cities = [
    {"city": "Amsterdam", "ranking": 0},
    {"city": "Aberdeen", "ranking": 0},
    {"city": "Athens", "ranking": 0},
    {"city": "Agadir", "ranking": 0},
    {"city": "Aarhus", "ranking": 0},
    {"city": "Abu Dhabi", "ranking": 0},
    {"city": "Acapulco", "ranking": 0},
    {"city": "Adelaide", "ranking": 0},
    {"city": "Anchorage", "ranking": 0},
    {"city": "Anaheim", "ranking": 0},
    {"city": "Antalya", "ranking": 0},
    {"city": "Antwerp", "ranking": 0},
    {"city": "Atlanta", "ranking": 0},
    {"city": "Auckland", "ranking": 0},
    {"city": "Austin", "ranking": 0},
    {"city": "Berlin", "ranking": 0},
    {"city": "Bath", "ranking": 0},
    {"city": "Barcelona", "ranking": 0},
    {"city": "Belfast", "ranking": 0},
    {"city": "Birmingham, UK", "ranking": 0},
    {"city": "Bangalore", "ranking": 0},
    {"city": "Bangkok", "ranking": 0},
    {"city": "Baghdad", "ranking": 0},
    {"city": "Bari", "ranking": 0},
    {"city": "Belgrade", "ranking": 0},
    {"city": "Bern", "ranking": 0},
    {"city": "Bergen", "ranking": 0},
    {"city": "Baltimore", "ranking": 0},
    {"city": "Blackpool", "ranking": 0},
    {"city": "Bournemouth", "ranking": 0},
    {"city": "Bradford", "ranking": 0},
    {"city": "Brighton", "ranking": 0},
    {"city": "Bristol", "ranking": 0},
    {"city": "Brussels", "ranking": 0},
    {"city": "Budapest", "ranking": 0},
    {"city": "Cambridge, UK", "ranking": 0},
    {"city": "Cardiff", "ranking": 0},
    {"city": "Cheltenham", "ranking": 0},
    {"city": "Chester", "ranking": 0},
    {"city": "Copenhagen", "ranking": 0},
    {"city": "Chester", "ranking": 0},
    {"city": "Copenhagen", "ranking": 0},
    {"city": "Cork", "ranking": 0},
    {"city": "Cologne", "ranking": 0},
    {"city": "Dublin", "ranking": 0},
    {"city": "Dubai", "ranking": 0},
    {"city": "Derby", "ranking": 0},
    {"city": "Dubrovnik", "ranking": 0},
    {"city": "Durham, UK", "ranking": 0},
    {"city": "Edinburgh", "ranking": 0},
    {"city": "Exeter", "ranking": 0},
    {"city": "Eastbourne", "ranking": 0},
    {"city": "Florence", "ranking": 0},
    {"city": "Funchal", "ranking": 0},
    {"city": "Frankfurt", "ranking": 0},
    {"city": "Faro, Portugal", "ranking": 0},
    {"city": "Fethiye", "ranking": 0},
    {"city": "Folkstone", "ranking": 0},
    {"city": "Fresno", "ranking": 0},
    {"city": "Fukuoka", "ranking": 0},
    {"city": "Glasgow", "ranking": 0},
    {"city": "Gothenburg", "ranking": 0},
    {"city": "Galway", "ranking": 0},
    {"city": "Gateshead", "ranking": 0},
    {"city": "Gloucester", "ranking": 0},
    {"city": "Gatwick", "ranking": 0},
    {"city": "Hamburg", "ranking": 0},
    {"city": "Helsinki", "ranking": 0},
    {"city": "Hong Kong Island", "ranking": 0},
    {"city": "Hounslow", "ranking": 0},
    {"city": "Harrogate", "ranking": 0},
    {"city": "Hammamet", "ranking": 0},
    {"city": "Istanbul", "ranking": 0},
    {"city": "Inverness", "ranking": 0},
    {"city": "Ibiza", "ranking": 0},
    {"city": "Jaipur", "ranking": 0},
    {"city": "Jakarta", "ranking": 0},
    {"city": "Jacksonville", "ranking": 0},
    {"city": "Krakow", "ranking": 0},
    {"city": "Kiev", "ranking": 0},
    {"city": "Kidderminster", "ranking": 0},
    {"city": "Kazan", "ranking": 0},
    {"city": "Keswick", "ranking": 0},
    {"city": "Koh Samui", "ranking": 0},
    {"city": "Kos", "ranking": 0},
    {"city": "Kuala Lumpur", "ranking": 0},
    {"city": "London", "ranking": 0},
    {"city": "Las Vegas", "ranking": 0},
    {"city": "Llandudno", "ranking": 0},
    {"city": "Leeds", "ranking": 0},
    {"city": "Lisbon", "ranking": 0},
    {"city": "Liverpool", "ranking": 0},
    {"city": "Leicester", "ranking": 0},
    {"city": "Los Angeles", "ranking": 0},
    {"city": "Manchester", "ranking": 0},
    {"city": "Maidstone", "ranking": 0},
    {"city": "Malaga", "ranking": 0},
    {"city": "Marbella", "ranking": 0},
    {"city": "Marrakech", "ranking": 0},
    {"city": "Malmo", "ranking": 0},
    {"city": "Miami", "ranking": 0},
    {"city": "Milan", "ranking": 0},
    {"city": "Munich", "ranking": 0},
    {"city": "Mumbai", "ranking": 0},
    {"city": "Mykonos", "ranking": 0},
    {"city": "Minsk", "ranking": 0},
    {"city": "Mykonos", "ranking": 0},
    {"city": "New York", "ranking": 0},
    {"city": "Newcastle", "ranking": 0},
    {"city": "Newquay", "ranking": 0},
    {"city": "Newport, UK", "ranking": 0},
    {"city": "New Dehli", "ranking": 0},
    {"city": "Naples, Italy", "ranking": 0},
    {"city": "Nice", "ranking": 0},
    {"city": "Nottingham", "ranking": 0},
    {"city": "Northampton", "ranking": 0},
    {"city": "Norwich", "ranking": 0},
    {"city": "Oxford", "ranking": 0},
    {"city": "Oslo", "ranking": 0},
    {"city": "Orlando", "ranking": 0},
    {"city": "Paris", "ranking": 0},
    {"city": "Palma De Mallorca", "ranking": 0},
    {"city": "Phuket", "ranking": 0},
    {"city": "Poole", "ranking": 0},
    {"city": "Portsmouth", "ranking": 0},
    {"city": "Plymouth", "ranking": 0},
    {"city": "Prague", "ranking": 0},
    {"city": "Preston", "ranking": 0},
    {"city": "Rome", "ranking": 0},
    {"city": "Reading, UK", "ranking": 0},
    {"city": "Rhodes", "ranking": 0},
    {"city": "Reykjavik", "ranking": 0},
    {"city": "Rio De Janeiro", "ranking": 0},
    {"city": "Scarborough", "ranking": 0},
    {"city": "Shanghai", "ranking": 0},
    {"city": "Sheffield", "ranking": 0},
    {"city": "Singapore", "ranking": 0},
    {"city": "Slough", "ranking": 0},
    {"city": "Sofia", "ranking": 0},
    {"city": "Southampton", "ranking": 0},
    {"city": "Southend-on-sea", "ranking": 0},
    {"city": "Stratford-upon-avon", "ranking": 0},
    {"city": "Stockholm", "ranking": 0},
    {"city": "Swindon", "ranking": 0},
    {"city": "Swansea", "ranking": 0},
    {"city": "Tel Aviv", "ranking": 0},
    {"city": "Tokyo", "ranking": 0},
    {"city": "Torquay", "ranking": 0},
    {"city": "Toronto", "ranking": 0},
    {"city": "Valencia", "ranking": 0},
    {"city": "Venice", "ranking": 0},
    {"city": "Vienna", "ranking": 0},
    {"city": "Vancouver", "ranking": 0},
    {"city": "Warsaw", "ranking": 0},
    {"city": "Windsor", "ranking": 0},
    {"city": "Whitby", "ranking": 0},
    {"city": "Whitstable", "ranking": 0},
    {"city": "Wolverhampton", "ranking": 0},
    {"city": "Winchester", "ranking": 0},
    {"city": "Windermere", "ranking": 0},
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

function handleZeroResults(dest){
    $("#list").show();
    $(".fetching").hide();
    $(".filters").hide();
    $(".noresults").show().html("We couldn't find any hotels for <span style='font-weight:bold;'>" + dest + "</span>");
}

function handleOneResult(hotel){
    $("#list ul li").remove();
    $("#list").show();
    $(".price-match").show();
    buildHotelListing(hotel);
}

function buildHotelListing(hotel){
        //console.log(hotel.name);
        $(".fetching").hide();
        $(".noresults").hide();
        //$("#list ul").show();



        var isBrand =  checkForBrand(hotel.name);
        var thumb;   
        if ( isBrand != false){
            console.log (isBrand + " " + hotel.name); 
            thumb = "<div class='thumb'><img  src='i/brands/" + isBrand + ".png'/></div>"
        } else {
            thumb = "<div class='thumb'><img  src='http://images.travelnow.com" + hotel.thumbNailUrl + "'/><img src='i/image_mask.png' class='mask'/></div>"
        }

        var total = "";

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

        prices.push(Math.round(hotel.lowRate));

        $("#list ul").append(
                    "<li id='" + hotel.hotelId + "''>"
                    + thumb 
                    + "<div class='details'>"
                    + "<div class='stars'>" + starRating + "</div>"
                    + "<div class='name'>" + hotel.name + "</div>" 
                    + "<div><img class='ta' src='" + hotel.tripAdvisorRatingUrl + "' style=''/></div>"
                    + "</div>"
                    + "<div class='price-wrapper'><div class='price'><div style='font-size:11px;'>prices from</div>" + total + "</div></div>"
                    + "</li>");

        var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(hotel.latitude, hotel.longitude),
                    map: map,
                    icon: 'i/hotel_pin.png'
                }); 

                var infoWindowContent = "<div class='name'>" + hotel.name + "</div>" + "<img class='ta' src='" + hotel.tripAdvisorRatingUrl + "' />" + "<div class='price'>&pound;" + Math.round(hotel.lowRate) + "</div>" ;

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(infoWindowContent);
                    infowindow.open(map,marker);
                });

                gmarkers[hotel.hotelId] = marker;


        $(".filters").show();






}

function buildHotelist(hotels){
    $(".fetching").hide();
    $(".noresults").hide();
    $("#list").show();
    $(".price-match").show();
    $("#list ul li").remove();
    
    $.each(hotels, function(i, hotel) {
        buildHotelListing(hotel);
    });

    highPrice = getMaxOfArray(prices);
    lowPrice = getMinOfArray(prices)
    //console.log(prices);
    //console.log( + " - " + );

    $( "#slider-range" ).slider({
      range: true,
      min: lowPrice,
      max: highPrice,
      values: [ lowPrice, highPrice],
      slide: function( event, ui ) {
        $("#min").val(ui.values[ 0 ]);
        $("#max").val(ui.values[ 1 ]);
      }
    });
    $("#min").val($( "#slider-range" ).slider( "values", 0 ));
    $("#max").val($( "#slider-range" ).slider( "values", 1 ));
    
}

function checkForBrand(str){
    if (str.toLowerCase().indexOf("radisson") >= 0) {
        return "radisson";
    } else if (str.toLowerCase().indexOf("ramada") >= 0) {
        return "ramada";
    } else if (str.toLowerCase().indexOf("hilton") >= 0) {
        return "hilton";
    } else if (str.toLowerCase().indexOf("holiday inn") >= 0) {
        return "holidayinn";
    } else if (str.toLowerCase().indexOf("ibis") >= 0) {
        return "ibis";
    } else if (str.toLowerCase().indexOf("jurys inn") >= 0) {
        return "jurysinn";
    } else if (str.toLowerCase().indexOf("best western") >= 0) {
        return "bestwestern";
    } else if (str.toLowerCase().indexOf("park inn") >= 0) {
        return "parkinn";
    } else if (str.toLowerCase().indexOf("marriott") >= 0) {
        return "marriott";
    } else {
        return false;
    }
        
}

function initializeMap(result) {
    
    //console.log(result[0].city)
    

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
            //console.log(pos);
            lon = pos[0].geometry.location.B;
            lat = pos[0].geometry.location.k;

            //console.log("pos");
            //console.log(pos);
            $("#dest_label").text(pos[0].formatted_address);
        
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
        timeout:3000,
 
        // code to run if the request succeeds;
        // the response is passed to the function
        success: function( json ) {
            prices = [];
           console.log("success");
            //console.log(json.HotelListResponse.HotelList['@size']);
            //console.log(json.HotelListResponse.HotelList);
            if (json.HotelListResponse.HotelList == undefined){
                //console.log("no results");
                handleZeroResults(pos[0].formatted_address)
            } else if (json.HotelListResponse.HotelList['@size'] == "1"){
                //var hotels = json.HotelListResponse.HotelList.HotelSummary;
                //console.log("only 1 result returned");
                //console.log(json.HotelListResponse.HotelList);
                var hotel = json.HotelListResponse.HotelList.HotelSummary;
                handleOneResult(hotel)
            } else {
                var hotels = json.HotelListResponse.HotelList.HotelSummary;
                if (currentdestination == result){
                    //console.log("Last searched for" + currentdestination + " + results for " + result + " go build list");
                    buildHotelist(hotels);
                }
            }

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
            
        }
    });

    } else {
        console.log("can't find destination");
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

