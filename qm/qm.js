$(function() {

			var calselected;
			var checkindate = 0;
			var checkoutdate = 0;
			var numnights = 0;
			$('#destination input').keyup(function(){
    			console.log("pressed");
    			if ($(this).val().length >= 3){
    					
    				$("#autosuggest").show();

    			}
			});

			$('#destination input').on("click", function(e){
				var jumpvalue = $("#destination input").offset().top - 6;
				$(document).scrollTop( jumpvalue);
				console.log("dest slected");
			})

			$("#autosuggest ul li").on("click", function(e){
				e.preventDefault();
				$("#destination input").val($(this).text());
				$("#autosuggest").hide();
			});

			$(".date").on("click", function(e){
				e.preventDefault();
				calselected = $(this).attr("id");

				if (calselected == "checkin") {
					$("#checkout").addClass("selectedcal");
					$("#checkin").removeClass("selectedcal");
					
				} else {
					$("#checkin").addClass("selectedcal");
					$("#checkout").removeClass("selectedcal");
				}
				
				if ($(".calendar").is(":hidden")){
					$(".calendar").slideDown("fast");
				} else {
					$(".calendar").slideUp("medium").slideDown("fast");
				}


				var jumpvalue = $("#destination input").offset().top - 6;
				$(document).scrollTop( jumpvalue);
				console.log("dest slected");

					
				
			}); 

			$(".numbers a").on("click", function(e){
				var num = $(this).text();
				if (calselected == "checkin"){
					checkindate = $(this).text();
				} else {
					checkoutdate = $(this).text();
				}
				
				$("#dates div#" + calselected + " input").val(num + "/08/2014");
				$("#dates div#" + calselected + " .day").text($(this).attr("rel"));
				$(".calendar").slideDown("fast");

				
				if (checkindate != 0 && checkoutdate != 0) {
					var numnights = checkoutdate - checkindate;
					console.log("nights - " + numnights);
					$("#dates div#checkout .nights").text(numnights + " nights");

				}

				$(this).addClass("selected");
				$(".date").removeClass("selectedcal");

			})

			$(".numchildren").change(function(){
				var kids = $( ".numchildren option:selected" ).val();
				var roomnum = $(this).attr("rel");
				
				//$("#room1 .children").show();
				switch(kids) {
					case "1":
  						$("#" + roomnum + " .children").show();
  						//console.log(roomnum + " + " + kids);
  						//$("#room1 .children").show();

  						$("#" + roomnum + " .children").find("div[rel=1]").show();
  						$("#" + roomnum + " .children").find("div[rel=2]").hide();
  						$("#" + roomnum + " .children").find("div[rel=3]").hide();
  						break;
					case "2":
  						$("#"+roomnum + " .children").show();
  						$("#" + roomnum + " .children").find("div[rel=1]").show();
  						$("#" + roomnum + " .children").find("div[rel=2]").show();
  						$("#" + roomnum + " .children").find("div[rel=3]").hide();
  						break;
  					case "3":
  						$("#"+roomnum + " .children").show();
  						$("#" + roomnum + " .children").find("div[rel=1]").show();
  						$("#" + roomnum + " .children").find("div[rel=2]").show();
  						$("#" + roomnum + " .children").find("div[rel=3]").show();
  						break;
				}
			})

			$("#basic select").change(function(){
				if ($( "#basic select option:selected" ).val() == "more options"){
					$("#basic").hide();
					$("#detailed").show();
				}
			})

   		});