var myMapKey = "AIzaSyDUu4nSvWhU3FAmZSlJGLthz5hHYZ5X__o";

    function initMap() {
	/*initialise the map*/
	    var where = {lat: 51.4816, lng: -3.1791};
	    var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 12,
		    center: where
		    });	
    }
document.addEventListener('DOMContentLoaded', function(){
	console.log("Dom loaded")
	
	function setDefaultDate(){
	/*set today's date as initial input in date box*/
		var todaysDate = new Date()
		var day =todaysDate.getDate();
		var month= todaysDate.getMonth();
		month=Number(month)+1;
		var year=todaysDate.getFullYear();
		today=(year+"-"+month+"-"+day);
		document.getElementById("date_input").value=today
	}
	
	function MapLoc(){
	/*find the lat and long of a placename from google maps*/
        var mapKey = "AIzaSyAweZVmZtaw8bYWarIUvRM5WT4NDgD9BP8"		
        var xhttpMapLoc = new XMLHttpRequest();   
        xhttpMapLoc.addEventListener('load', processResponseMapLoc);
		var add = document.getElementById("location_input").value;  /*address location from input box*/
        xhttpMapLoc.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+add+"&key="+mapKey+"&region=uk");           
	    xhttpMapLoc.send();
    }

	var processResponseMapLoc = function() {
	/*process the responses of latitude and lontitude search*/
		console.log("processing")
        var dataLoc = JSON.parse(this.response);
	    console.log(dataLoc.results[0].geometry.location.lat + "," + dataLoc.results[0].geometry.location.lng);   /*get the lat and long of the place*/
		var ll = document.getElementById("ll")
		var ll = (ll.value=dataLoc.results[0].geometry.location.lat + "," + dataLoc.results[0].geometry.location.lng);
		FsPlaces();
		
		console.log("ll is "+ll);
			
		function FsPlaces(){
		/*use the lat and lng to search foursquare*/
            var xhttp = new XMLHttpRequest();
            xhttp.addEventListener('load', processResponse); 
			var lim = 30;    /*limit of results*/
		    /*var radius = document.getElementById("radius").value;/* /*search radius
			if (radius !=""){
			     radius = Number(document.getElementById("radius").value);}
			else{
				radius = 1500;
			}*/
			var radius = 2000;
		    var clientId = "PRS3ZGZSJIAI0A12KIP15VIY12ITIGFRBFVCRKRGF02AUVYW"
			var clientSecret = "GL4DEJONWD12BTHKHJAJNOY5L3SYZD3MLWHIUYXMNGOHFCTT";
			var categoryID = String(document.getElementById("activity").innerHTML);   /*string containing venue category id's from buttons*/
            xhttp.open("GET", "https://api.foursquare.com/v2/venues/search?ll="+ll+"&intent=browse&client_id="+clientId+"&client_secret="+clientSecret+"&v=20170101&categoryId="+categoryID+"&limit="+lim+"&radius="+radius);            
			xhttp.send();
			}
					
		function processResponse() {     
		/*search google maps api and add markers for places found in Foursquare*/
            var data = JSON.parse(this.response);
            console.log(data.response);
			var para=document.getElementById("placestogo");
			var ulist=para.appendChild(document.createElement("ol"));
			if (data.response.venues.length!=0){
				var startCenter={lat:Number(dataLoc.results[0].geometry.location.lat), lng:Number(dataLoc.results[0].geometry.location.lng)}
				var map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center:startCenter});
			    for(i=0;i < data.response.venues.length;i++ ){
				    var items = ulist.appendChild(document.createElement("li")); 
				    var names = (i+1) + ".  " + data.response.venues[i].name +". ";
				    var places = document.createTextNode(names);
				    var lats = Number(data.response.venues[i].location.lat);/*Get the latitude and lng for Google Map*/
				    var lngs = Number(data.response.venues[i].location.lng);
			        var where = {lat: lats, lng: lngs};   
				    var labels = (i+1) + ".";
		            var venueName = data.response.venues[i].name
				    var venueId= data.response.venues[i].id
				    var venueLink = 'http://foursquare.com/v/' + venueId +'?ref=PRS3ZGZSJIAI0A12KIP15VIY12ITIGFRBFVCRKRGF02AUVYW'
				    var contentString = venueName+'<div id="markerwindow"><p> <a href='+venueLink+' target="_blank">More Info...</a></p></div>' 
				    if (data.response.venues[i].categories[0].id  === "4c38df4de52ce0d596b336e1"){
					    var specialIcon = "images/parking.png";
					    }
				    else{
					    var specialIcon = "images/mapicon.png";
					    }		
				    var marker = new google.maps.Marker({position: where, map: map, icon: specialIcon, label: labels});
				    marker.content = contentString;
				    var infoWindow = new google.maps.InfoWindow();
				    google.maps.event.addListener(marker, 'click', function() {infoWindow.setContent(this.content);infoWindow.open(this.map,this)});
         	        items.appendChild(places)
				}
			}
			else{
				var items = ulist.appendChild(document.createElement("li"))
				var warning = "Sorry we cannot find any places for your selection.  Please try again and perhaps widen your search area."
				var warning1 = document.createTextNode(warning);
				items.appendChild(warning1)
			    }
			
		}
    }
	
    function listen() {
	    var go = document.getElementById("go").addEventListener("click", enter, true);
        console.log("listening");
		var refreshdoc = document.getElementById("searchAgain").addEventListener("click", refresh);
		var sports = document.getElementById("pa").addEventListener("click", changeStyle1);
		var sports = document.getElementById("pc").addEventListener("click", changeStyle2);
		var sports = document.getElementById("cin").addEventListener("click", changeStyle3);
		var sports = document.getElementById("fd").addEventListener("click", changeStyle4);
		var sports = document.getElementById("out").addEventListener("click", changeStyle5);
		var sports = document.getElementById("spo").addEventListener("click", changeStyle6);
		var sports = document.getElementById("bks").addEventListener("click", changeStyle7);
		var sports = document.getElementById("mus").addEventListener("click", changeStyle8);
		var sports = document.getElementById("shw").addEventListener("click", changeStyle9);
		var sports = document.getElementById("wor").addEventListener("click", changeStyle10);
		var sports = document.getElementById("musi").addEventListener("click", changeStyle11);
		var sports = document.getElementById("prk").addEventListener("click", changeStyle12);
	}
	
	var refresh = function refresh(){
			location.reload();
		}
	var changeStyle1 = function(){
		document.getElementById("pa").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle2 = function(){
		document.getElementById("pc").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle3 = function(){
		document.getElementById("cin").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle4 = function(){
		document.getElementById("fd").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle5 = function(){
		document.getElementById("out").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle6 = function(){
		document.getElementById("spo").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle7 = function(){
		document.getElementById("bks").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle8 = function(){
		document.getElementById("mus").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle9 = function(){
		document.getElementById("shw").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle10 = function(){
		document.getElementById("wor").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle11 = function(){
		document.getElementById("musi").style.backgroundColor="rgb(167, 244, 66)";
	}
	var changeStyle12 = function(){
		document.getElementById("prk").style.backgroundColor="rgb(167, 244, 66)";
	}
	
	
	function checking(){
		/* if checkboxes are checked then their values are used to search Foursquare category ids*/
		document.getElementById("activity").innerHTML="";
		var parks = document.getElementById("parks").checked;
		var playcentres = document.getElementById("playcentres").checked;
		var cinema = document.getElementById("cinema").checked;
		var food = document.getElementById("food").checked;
		var outdoor = document.getElementById("outdoor").checked;
		var sports = document.getElementById("sports").checked;
		var books = document.getElementById("books").checked;
		var museum = document.getElementById("museum").checked;
		var shows = document.getElementById("shows").checked;
		var worship = document.getElementById("worship").checked;
		var music = document.getElementById("music").checked;
		var parking = document.getElementById("parking").checked;
		
		if (sports === true){
			    var sportsId = document.getElementById("sports").value
				var activity = document.getElementById("activity").innerHTML+sportsId;
				document.getElementById("activity").innerHTML=activity;
		}
		
		if (parks === true){
			    var parksId = document.getElementById("parks").value;
				var activity = document.getElementById("activity").innerHTML+","+parksId;
				document.getElementById("activity").innerHTML=activity;
				
		}
		if (cinema === true){
			    var cinemaId=document.getElementById("cinema").value;
				var activity = document.getElementById("activity").innerHTML+","+cinemaId;	
				document.getElementById("activity").innerHTML=activity;
		}
		if (food=== true){
			    var foodId=document.getElementById("food").value;
				var activity = document.getElementById("activity").innerHTML+","+foodId;
				document.getElementById("activity").innerHTML=activity;
		}
		if (outdoor === true){
			    var outdoorId=document.getElementById("outdoor").value;
				var activity = document.getElementById("activity").innerHTML+","+outdoorId;
				document.getElementById("activity").innerHTML=activity;
		}
		if (sports === true){
			    var sportsId=document.getElementById("sports").value;
				var activity = document.getElementById("activity").innerHTML+","+sportsId;
				document.getElementById("activity").innerHTML=activity;
		}
		if (museum === true){
			    var museumId=document.getElementById("museum").value;
				var activity = document.getElementById("activity").innerHTML+","+museumId;	
                document.getElementById("activity").innerHTML=activity;				
		}
		if (worship === true){
			    var worshipId=document.getElementById("worship").value;
				var activity = document.getElementById("activity").innerHTML+","+worshipId;	
                document.getElementById("activity").innerHTML=activity;				
		}
		if (music === true){
			    var musicId=document.getElementById("music").value;
				var activity = document.getElementById("activity").innerHTML+","+musicId;	
                document.getElementById("activity").innerHTML=activity;				
		}
		if (parking === true){
			    var parkingId=document.getElementById("parking").value;
				var activity = document.getElementById("activity").innerHTML+","+document.getElementById("parking").value;	
                document.getElementById("activity").innerHTML=activity;				
		}
		
	}  

    var enter=function enter(){
		/*var radius = document.getElementbyId("radius").value;*/
		checking();
	    var your_date =document.getElementById("date_input").value;
		var place =document.getElementById("location_input").value
		console.log(your_date);
		console.log(place);
		console.log(activity);
		MapLoc();
	}	

	
	listen();
	setDefaultDate();
	

})