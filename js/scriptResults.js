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
	
	var cookie = document.cookie;
	//var place = "cardiff";
	// var place;
	var input_date;
	var activity;
	console.log(document.cookie);
	
	var place = function getPlace(){
		if (document.cookie.length != 0){
			for (i=0; i<document.cookie.length; i++){
			    var cookieArray = document.cookie.split("=")
			    var place = cookieArray[3];
				return place;
		}
		}
	}
	
	//console.log(getPlace());
	
	function getInputDate(){
		if (document.cookie.length != 0){
			for (i=0; i<document.cookie.length; i++){
			    var cookieArray = document.cookie.split("=")
			input_date = cookieArray[1];
			}
		}
	}
	
	function getActivity(){
		if (document.cookie.length != 0){
			for (i=0; i<document.cookie.length; i++){
			    var cookieArray = document.cookie.split("=")
				activity = cookieArray [5];
		}
		}
	}
	
	console.log(place,input_date,activity);
	
	function mapLoc(){
		/*find the longtitude and latitude of input place*/
        var mapKey = "AIzaSyAweZVmZtaw8bYWarIUvRM5WT4NDgD9BP8"		
        var xhttpMapLoc = new XMLHttpRequest();    /*Attempting to geolocate input*/
        xhttpMapLoc.addEventListener('load', processResponseMapLoc);
		/*var add = place; /*document.getElementById("location_input").value;  /*address location from input box from cookie*/
        xhttpMapLoc.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+place+"&key="+mapKey+"&region=uk");           
	    xhttpMapLoc.send();
	}
    
	var processResponseMapLoc = function() {
		/*process the responses for lat and long positions on click of go button*/
		console.log("processing")
        var dataLoc = JSON.parse(this.response);
	    console.log(dataLoc.results[0].geometry.location.lat + "," + dataLoc.results[0].geometry.location.lng);   /*get the lat and long of the place*/
		var ll = document.getElementById("ll")
		var ll = (ll.value=dataLoc.results[0].geometry.location.lat + "," + dataLoc.results[0].geometry.location.lng);
		
		console.log("ll is "+ll);
			
		function fsPlaces(){
		/*request info from foursquare using lat long obtained*/
            var xhttp = new XMLHttpRequest();
            xhttp.addEventListener('load', processResponse); 
			var lim = 30;    /*limit of results*/
		    var radius = 1500; /*search radius*/
		    var clientId = "PRS3ZGZSJIAI0A12KIP15VIY12ITIGFRBFVCRKRGF02AUVYW"
			var clientSecret = "GL4DEJONWD12BTHKHJAJNOY5L3SYZD3MLWHIUYXMNGOHFCTT";
			var categoryID = String(activity);/*String(document.getElementById("activity").innerHTML);   /*string containing venue category id's from buttons*/
            xhttp.open("GET", "https://api.foursquare.com/v2/venues/search?ll="+ll+"&intent=browse&client_id="+clientId+"&client_secret="+clientSecret+"&v=20170101&categoryId="+categoryID+"&limit="+lim+"&radius="+radius);            
			xhttp.send();
			}
			
		function processResponse() { 
        /*add search findings to a list in div called 'placestogo' and add markers on google maps for places found in Foursquare*/		
            var data = JSON.parse(this.response);
            console.log(data.response);  /*TESTING*/
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
		
	mapLoc();
})