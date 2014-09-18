
var fetchHotelList = function (destination, cb){
	var url = buildSearchUrl(destination);

	console.log("fetch list")

	$.ajax({
  		dataType: "json",
  		url: url,
  		success: cb
	});

}




function fetchSearchResults(destination) {

	var url = buildSearchUrl(destination);
	var hotels;

	$.getJSON(url).done(function(json){
		hotels = json.result.hotels;
		//console.log (json.result.hotels[0])
		//$.each( hotels, function( i, hotel ) {
  			//console.log( i + ": " + hotel.hotelName );

			//$("#hotelList").append("<li id=" + hotel.hotelId + ">" + hotel.hotelName + "</li>")
					//});

		return hotels;
	});

	

};

function fetchHotelDetails(hotelId) {

	var url = "http://localhost:8899/device/hotelDetails.html?hotelId=" + hotelId + "&na=os%3DFacebook%7Ccv%3D1171%7Csv%3D2%7Cid%3DCFUUID9BC82AC4A123485586F5F6AFEF2084E0"
	var hotel;

	$.getJSON(url).done(function(json){

		hotel = json;
		//console.log(json.result);
		//$("#details h1").text(json.result.roomRates.hotelSummary.hotelName);
	});

	return hotel;

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

