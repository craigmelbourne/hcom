
var fetchHotelList = function (destination, cb){
	var url = buildSearchUrl(destination);

	console.log("fetch list")

	$.ajax({
  		dataType: "json",
  		url: url,
  		success: cb
	});

}

var fetchHotelDetails = function (id, cb){
	var url = buildHotelDetailsUrl(id);
  //var url = "http://localhost:8899/device/hotelDetails.html?hotelId=" + id + "&na=os%3DFacebook%7Ccv%3D1171%7Csv%3D2%7Cid%3DCFUUID9BC82AC4A123485586F5F6AFEF2084E0"
	console.log("fetch hotel details");

	$.ajax({
  		dataType: "json",
  		url: url,
  		success: cb
	});
}



function buildSearchUrl(destination) {
  	var url = '', 
     //search_destination = (destination) ? destination : SearchForm.destination,
     hostname = window.location.hostname;

	if (hostname == 'localhost') {    
    	url = 'http://localhost:8899/device/search.html?destination='+destination+'&cur=GBP&monthCheckIn=8&dayInMonthCheckIn=31&monthCheckOut=9&dayInMonthCheckOut=1&r=1&na=os%3DFacebook%7Ccv%3D1171%7Csv%3D2%7Cid%3DCFUUID9BC82AC4A123485586F5F6AFEF2084E0';
    } else {
    	url = '/api/search.html?destination='+destination+'&cur=GBP&monthCheckIn=8&dayInMonthCheckIn=31&monthCheckOut=9&dayInMonthCheckOut=1&r=1&na=os%3DFacebook%7Ccv%3D1171%7Csv%3D2%7Cid%3DCFUUID9BC82AC4A123485586F5F6AFEF2084E0';
  	}

  	return url;
}

function buildHotelDetailsUrl(id) {
    var url = '', 
     //search_destination = (destination) ? destination : SearchForm.destination,
     hostname = window.location.hostname;

  if (hostname == 'localhost') {    
      url = "http://localhost:8899/device/hotelDetails.html?hotelId=" + id + "&na=os%3DFacebook%7Ccv%3D1171%7Csv%3D2%7Cid%3DCFUUID9BC82AC4A123485586F5F6AFEF2084E0";
    } else {
      url = "/api/hotelDetails.html?hotelId=" + id + "&na=os%3DFacebook%7Ccv%3D1171%7Csv%3D2%7Cid%3DCFUUID9BC82AC4A123485586F5F6AFEF2084E0";
    }

    return url;
}

//var map;
function initializeMap(destination) {

	console.log("initilaise map")
      
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        //center: loc,
        zoom: 16,
        mapTypeId: 'roadmap',
        mapTypeId: google.maps.MapTypeId.ROADMAP, 
        panControl: false,
        mapTypeControl: false,
        streetViewControl:false,
        zoomControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
    });

}

