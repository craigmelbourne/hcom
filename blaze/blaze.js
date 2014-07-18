

// global vars
var matches;
var currentdestination;
//var newYork = new google.maps.LatLng(40.730098, -73.997861);


//functions


function initializeMap(result) {

  

  var loc = new google.maps.LatLng(result[0].lon, result[0].lat);

  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: loc,
    zoom: 14,
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