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
	
	document.getElementById("second").style.display="none";
	
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
		var add = document.getElementById("location_input").value;  /*address location from input box*/
        xhttpMapLoc.addEventListener('load', processResponseMapLoc);
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
		    var your_date =document.getElementById("date_input").value;
            var xhttp = new XMLHttpRequest();
            xhttp.addEventListener('load', processResponse); 
			var lim = 30;    /*limit of results*/
		    var radius = (document.getElementById("radius").value)*1000; /*search radius*/
			if (radius > 100000){
				radius = 100000;
				}
			var clientId = "PRS3ZGZSJIAI0A12KIP15VIY12ITIGFRBFVCRKRGF02AUVYW"
			var clientSecret = "GL4DEJONWD12BTHKHJAJNOY5L3SYZD3MLWHIUYXMNGOHFCTT";
			var categoryID = String(document.getElementById("activity").innerHTML);   /*string containing venue category id's from buttons*/
            xhttp.open("GET", "https://api.foursquare.com/v2/venues/search?ll="+ll+"&intent=browse&client_id="+clientId+"&client_secret="+clientSecret+"&v=20170101&categoryId="+categoryID+"&limit="+lim+"&radius="+radius+"&venuePhotos=1");            
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
					
				    var li = ulist.appendChild(document.createElement("li"));
					var a = li.appendChild(document.createElement("a"));
				    var names = (i+1) + ".  " + data.response.venues[i].name +". ";
				    var places = document.createTextNode(names);
				    var lats = Number(data.response.venues[i].location.lat);/*Get the latitude and lng for Google Map*/
				    var lngs = Number(data.response.venues[i].location.lng);
			        var where = {lat: lats, lng: lngs};   
				    var labels = (i+1) + ".";
		            var venueName = data.response.venues[i].name
				    var venueId= data.response.venues[i].id
				    var venueLink = 'http://foursquare.com/v/' + venueId +'?ref=PRS3ZGZSJIAI0A12KIP15VIY12ITIGFRBFVCRKRGF02AUVYW'
				    var linkText = document.createTextNode(names);
					var contentString = (i+1)+".  "+venueName;
				    var iconBase = "star.png";
				    if (data.response.venues[i].categories[0].id === "4c38df4de52ce0d596b336e1"){
					    var specialIcon = "images/carparking.png";
					    }
				    else{
					    var specialIcon = "images/playground.png";
					    }		
				    var marker = new google.maps.Marker({position: where, map: map, icon: specialIcon});
				    marker.content = contentString;
				    var infoWindow = new google.maps.InfoWindow();
				    google.maps.event.addListener(marker, 'click', function() {infoWindow.setContent(this.content);infoWindow.open(this.map,this)});
         	        /*items.appendChild(places)*/
					li.appendChild(a);
					a.appendChild(linkText);
					a.title = names;
					a.href = venueLink
					
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
		document.getElementById("pa").addEventListener("click",changeStyleParks);
		document.getElementById("pc").addEventListener("click", changeStylePlaycentres);
		document.getElementById("cin").addEventListener("click", changeStyleCinema);
		document.getElementById("fd").addEventListener("click", changeStyleFood);
		document.getElementById("out").addEventListener("click", changeStyleOutdoor);
		document.getElementById("spo").addEventListener("click", changeStyleSports);
		document.getElementById("bks").addEventListener("click", changeStyleBooks);
		document.getElementById("mus").addEventListener("click", changeStyleMuseum);
		document.getElementById("shw").addEventListener("click", changeStyleShows);
		document.getElementById("wor").addEventListener("click", changeStyleWorship);
		document.getElementById("musi").addEventListener("click", changeStyleMusic);
		document.getElementById("prk").addEventListener("click", changeStyleParking);
	}
	
	var refresh = function refresh(){
			location.reload();
			document.getElementById("second").style.display="none";
	}
	var changeStyleParks = function(){
		if (document.getElementById("parks").checked){
			document.getElementById("pa").style.backgroundColor ="#FB9905";
		}
		else{
			document.getElementById("pa").style.backgroundColor="rgb(167, 244, 66)";
		}
	}
	var changeStylePlaycentres = function(){
		if (document.getElementById("playcentres").checked){
			document.getElementById("pc").style.backgroundColor="#FB9905";
		}
		else{
		    document.getElementById("pc").style.backgroundColor="rgb(167, 244, 66)";
		}
	}
	var changeStyleCinema = function(){
		if(document.getElementById("cinema").checked){
			document.getElementById("cin").style.backgroundColor="#FB9905";
		}
		else{
		    document.getElementById("cin").style.backgroundColor="rgb(167, 244, 66)";
		}
	}
	var changeStyleFood = function(){
		if(document.getElementById("food").checked){
			document.getElementById("fd").style.backgroundColor="#FB9905";
		}
		else{
		    document.getElementById("fd").style.backgroundColor="rgb(167, 244, 66)";
		}
	}
	var changeStyleOutdoor = function(){
		if (document.getElementById("outdoor").checked){
		document.getElementById("out").style.backgroundColor="#FB9905";
	}
	    else{
		document.getElementById("out").style.backgroundColor="rgb(167, 244, 66)";
	    }
	}
	var changeStyleSports = function(){
		if(document.getElementById("sports").checked){
			document.getElementById("spo").style.backgroundColor="#FB9905";
		}
		else{
		document.getElementById("spo").style.backgroundColor="rgb(167, 244, 66)";
		}
	}
	var changeStyleBooks = function(){
		if(document.getElementById("books").checked){
			document.getElementById("bks").style.backgroundColor="#FB9905";
		}
		else{
		    document.getElementById("bks").style.backgroundColor="rgb(167, 244, 66)";
		}
	}
	var changeStyleMuseum = function(){
		if(document.getElementById("museum").checked){
			document.getElementById("mus").style.backgroundColor="#FB9905";
		}
		else{
		    document.getElementById("mus").style.backgroundColor="rgb(167, 244, 66)";
		}
	}
	var changeStyleShows = function(){
		if(document.getElementById("shows").checked){
			document.getElementById("shw").style.backgroundColor="#FB9905";
		}
		else{
		    document.getElementById("shw").style.backgroundColor="rgb(167, 244, 66)";
		}
	}
	var changeStyleWorship = function(){
		if(document.getElementById("worship").checked){
			document.getElementById("wor").style.backgroundColor="#FB9905";
		}
		else{
		    document.getElementById("wor").style.backgroundColor="rgb(167, 244, 66)";
		}
	}
	var changeStyleMusic = function(){
		if(document.getElementById("music").checked){
			document.getElementById("musi").style.backgroundColor="#FB9905";
		}
		else{
		    document.getElementById("musi").style.backgroundColor="rgb(167, 244, 66)";
		}
	}	
	var changeStyleParking = function(){
		if(document.getElementById("parking").checked){
			document.getElementById("prk").style.backgroundColor="#FB9905";
		}
		else{
		    document.getElementById("prk").style.backgroundColor="rgb(167, 244, 66)";
		}
	}	
	
	
	function checking(){
		/* if checkboxes are checked then their values are used to search Foursquare category ids*/
		document.getElementById("activity").innerHTML="";
				
		if (document.getElementById("parks").checked){
			    var parksId = document.getElementById("parks").value;
				var activity = document.getElementById("activity").innerHTML+","+parksId;
				document.getElementById("activity").innerHTML=activity;	
		}
		if (document.getElementById("playcentres").checked){
			    var playcentresId = document.getElementById("playcentres").value;
				var activity = document.getElementById("activity").innerHTML+","+playcentresId;
				document.getElementById("activity").innerHTML=activity;	
		}
		if (document.getElementById("cinema").checked){
			    var cinemaId=document.getElementById("cinema").value;
				var activity = document.getElementById("activity").innerHTML+","+cinemaId;	
				document.getElementById("activity").innerHTML=activity;
		}
		if (document.getElementById("food").checked){
			    var foodId=document.getElementById("food").value;
				var activity = document.getElementById("activity").innerHTML+","+foodId;
				document.getElementById("activity").innerHTML=activity;
		}
		if (document.getElementById("outdoor").checked){
			    var outdoorId=document.getElementById("outdoor").value;
				var activity = document.getElementById("activity").innerHTML+","+outdoorId;
				document.getElementById("activity").innerHTML=activity;
		}
		if (document.getElementById("sports").checked){
			    var sportsId = document.getElementById("sports").value
				var activity = document.getElementById("activity").innerHTML+","+sportsId;
				document.getElementById("activity").innerHTML=activity;
		}
		if (document.getElementById("books").checked){
			    var booksId=document.getElementById("books").value;
				var activity = document.getElementById("activity").innerHTML+","+booksId;
				document.getElementById("activity").innerHTML=activity;
		}
		if (document.getElementById("museum").checked){
			    var museumId=document.getElementById("museum").value;
				var activity = document.getElementById("activity").innerHTML+","+museumId;	
                document.getElementById("activity").innerHTML=activity;				
		}
		if (worship = document.getElementById("worship").checked){
			    var worshipId=document.getElementById("worship").value;
				var activity = document.getElementById("activity").innerHTML+","+worshipId;	
                document.getElementById("activity").innerHTML=activity;				
		}
		if (document.getElementById("music").checked){
			    var musicId=document.getElementById("music").value;
				var activity = document.getElementById("activity").innerHTML+","+musicId;	
                document.getElementById("activity").innerHTML=activity;				
		}
		if (document.getElementById("shows").checked){
			    var showsId=document.getElementById("shows").value;
				var activity = document.getElementById("activity").innerHTML+","+showsId;	
                document.getElementById("activity").innerHTML=activity;				
		}
		if (document.getElementById("parking").checked){
			    var parkingId=document.getElementById("parking").value;
				var activity = document.getElementById("activity").innerHTML+","+parkingId;
                document.getElementById("activity").innerHTML=activity;				
		}
		
	}  
	
	var Eventbright= function Eventbright(){
		var date = document.getElementById("date_input").value;
		var xhttp = new XMLHttpRequest();
		xhttp.addEventListener('load',processResponseEventbright);
		var appKey = "U7NLRIHY7OYIIES2ST";
		var personalOAuth="VLRGG4IXRONOS32YGOF3";
		var anonOAuth ="SAZQIHQ4D7FGR4HK7MVO";
		var place = document.getElementById("location_input").value;
		var keywords = document.getElementById("query").value;
		xhttp.open("GET", "https://www.eventbriteapi.com/v3/events/?token="+personalOAuth+"&q="+keywords+"&venue="+place);
		xhttp.send();
		}
		
	    var processResponseEventbright = function(){
		    var dataEventful = JSON.parse(this.response);
			console.log(dataEventful)
			for(i=0;i<10;i++){
		    console.log(dataEventful.events[0].name);}
		}

    var enter=function enter(){
		if (document.getElementById("location_input").value=== ""){
			alert("Please enter a location to search")
			
		}
		else{
		document.getElementById("top").style.display="none";
		document.getElementById("second").style.display="initial";
		checking();
		MapLoc();
		Eventbright();
		}
	}	

	
	listen();
	setDefaultDate();
	

})