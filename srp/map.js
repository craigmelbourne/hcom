
	var pinColor = "1BD308";
	    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
	        new google.maps.Size(25, 39),
	        new google.maps.Point(0,0),
	        new google.maps.Point(10, 34));
	    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
	        new google.maps.Size(40, 37),
	        new google.maps.Point(0, 0),
	        new google.maps.Point(12, 35));


	var newYork = new google.maps.LatLng(40.730098, -73.997861);
	var image = 'images/gren-pin-5sec.gif';
	var icon ="map-pin-red.png";
	var LatLng1 = new google.maps.LatLng(40.72756, -74.00548);
	var LatLng2 = new google.maps.LatLng(40.72718, -74.00601);
	var LatLng3 = new google.maps.LatLng(40.72564, -74.00533);
	var LatLng4 = new google.maps.LatLng(40.72369, -74.00542);
	var LatLng5 = new google.maps.LatLng(40.722835, -74.004712);
	var i;
	var hotels = [
			[40.721021, -74.004179],
			[40.72108, -74.00534],
			[40.71905, -74.00519],
			[40.72808, -73.99097],
			[40.72334, -73.99028],
			[40.72304, -73.98941],
			[40.72194, -73.9934],
			[40.72137, -73.99266],
			[40.72, -73.98807],
			[40.71873, -73.99269],
			[40.71856, -73.99508],
			[40.717291, -73.995431],
			[40.713724, -73.993646],
			[40.715425, -73.999515],
			[40.71994, -73.99873],
			[40.719762, -74.000411],
			[40.71919, -73.9999],
			[40.71847, -74.00052],
			[40.715425, -73.999515],
			[40.71617, -74.00726],
			[40.71534, -74.00874],
			[40.73476, -73.98467],
			[40.73653, -73.98899],
			[40.73813, -74.00845],
			[40.73827, -73.98566],
			[40.73954, -73.98274],
			[40.742032, -74.00373],
			[40.716685, -73.994646]
		]

        function initializeMap() {
	
		map = new google.maps.Map(document.getElementById('map_canvas'), {
	      center: newYork,
	      zoom: 14,
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
	

		var infowindow = new google.maps.InfoWindow();
		for (i = 0; i < hotels.length; i++) {  
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(hotels[i][0], hotels[i][1]),
				map: map,
				icon: icon
			});

			var content = '<div>Some hotel details</div>'

			google.maps.event.addListener(marker, 'click', (function(marker, content) {
            	return function() {
               	 	//infowindow.setContent(content);
                	//infowindow.open(map, marker);
                	$("#map .hotel-details").show();
            	}
        	})(marker, content));

		}
}
	
	 $(document).ready(function () {
		initializeMap();

		$(".filter-link").on("click", function(e){
					e.preventDefault();
					console.log("filters selected");
					$("#overlay").show();
					$("#filters-modal").show();
					//$("#filters-modal").show("slide", { direction: "left" }, 400); 
					$("body").addClass("modal-open");
				}); 

		$("#filters-modal button").on("click", function(e){
					e.preventDefault();
					$("#overlay").hide();
					$("#filters-modal").hide();
					$("body").removeClass("modal-open");
				}); 

		$(".close").on("click", function(e){
			e.preventDefault();
			$(".hotel-details").hide();
		})

	
	 });