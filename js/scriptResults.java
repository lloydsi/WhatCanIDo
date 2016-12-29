

    var myMapKey = "AIzaSyDUu4nSvWhU3FAmZSlJGLthz5hHYZ5X__o";

    function initMap() {
	    var where = {lat: 51.4816, lng: -3.1791};
	    var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 12,
		    center: where
		    });
		
    }
document.addEventListener('DOMContentLoaded', function(){
	console.log("Dom loaded")
	
	function MapLoc(){
        var mapKey = "AIzaSyAweZVmZtaw8bYWarIUvRM5WT4NDgD9BP8"		
        var xhttpMapLoc = new XMLHttpRequest();    /*Attempting to geolocate input*/
        xhttpMapLoc.addEventListener('load', processResponseMapLoc);
		var add = document.getElementById("location_input").value;  /*address location from input box*/
        xhttpMapLoc.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+add+"&key="+mapKey+"&region=uk");           
	    xhttpMapLoc.send();
		
}
/*process the responses on click of go button*/
	var processResponseMapLoc = function() {
		console.log("processing")
        var dataLoc = JSON.parse(this.response);
	    console.log(dataLoc.results[0].geometry.location.lat + "," + dataLoc.results[0].geometry.location.lng);   /*get the lat and long of the place*/
		var ll = document.getElementById("ll")
		var ll = (ll.value=dataLoc.results[0].geometry.location.lat + "," + dataLoc.results[0].geometry.location.lng);
		
		console.log("ll is "+ll);
			
		function FsPlaces(){
            var xhttp = new XMLHttpRequest();
            xhttp.addEventListener('load', processResponse); /*use the lat and lng to search foursquare*/
			var lim = 30;    /*limit of results*/
		    var radius = 1500; /*search radius*/
		    var clientId = "PRS3ZGZSJIAI0A12KIP15VIY12ITIGFRBFVCRKRGF02AUVYW"
			var clientSecret = "GL4DEJONWD12BTHKHJAJNOY5L3SYZD3MLWHIUYXMNGOHFCTT";
			var categoryID = String(document.getElementById("activity").innerHTML);   /*string containing venue category id's from buttons*/
            xhttp.open("GET", "https://api.foursquare.com/v2/venues/search?ll="+ll+"&intent=browse&client_id="+clientId+"&client_secret="+clientSecret+"&v=20170101&categoryId="+categoryID+"&limit="+lim+"&radius="+radius);            
			xhttp.send();
			}
		FsPlaces();
			
		function processResponse() {     /*search google maps api and add markers for places found in Foursquare*/
            var data = JSON.parse(this.response);
            console.log(data.response);
			
			document.onload = function(){
			var para=document.getElementById("placestogo");
			var ulist=para.appendChild(document.createElement("ol"));
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
				var iconBase = "star.png";
				if (data.response.venues[i].categories[0].id === "4c38df4de52ce0d596b336e1"){
					var specialIcon = "images/parking.png";
					 }
				else{
					var specialIcon = "images/star.png";
					}
				
				
				var marker = new google.maps.Marker({position: where, map: map, icon: specialIcon, label: labels});
				marker.content = contentString;
				var infoWindow = new google.maps.InfoWindow();
				google.maps.event.addListener(marker, 'click', function() {infoWindow.setContent(this.content);infoWindow.open(this.map,this)});
         	    items.appendChild(places)
			}
			}
		}
    }
	
	/* Places API from FourSquare */

	/*var activity = document.getElementById("activity");
	function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        activity.innerHTML = "Geolocation is not supported by this browser.";
    }
	}
	function showPosition(position) {
        activity.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude; 
}
*/
	var todaysDate = new Date()
	var day =todaysDate.getDate();
	var month= todaysDate.getMonth();
	var month=Number(month)+1;
	var year=todaysDate.getFullYear();
	
	var today=(year+"-"+month+"-"+day);
	document.getElementById("date_input").value=today
	
	
	var enter=function enter(){
		checking();
	    var your_date =document.getElementById("date_input").value;
		document.cookie = your_date;
		var place =document.getElementById("location_input").value;
		document.cookie= place;
		console.log(your_date);
		console.log(place);
		console.log(activity);
		MapLoc();
	}	

		
    function listen() {
	    var go = document.getElementById("go").addEventListener("click", enter, true);
        console.log("listening");
	}
	
	function checking(){
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
		var craft = document.getElementById("craft").checked;
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
		if (craft === true){
			    var craftId=document.getElementById("craft").value;
				var activity = document.getElementById("activity").innerHTML+","+craftId;	
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

    
	
	listen();

})