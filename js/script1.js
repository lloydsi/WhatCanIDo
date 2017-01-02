var myMapKey = "AIzaSyDUu4nSvWhU3FAmZSlJGLthz5hHYZ5X__o";

    function initMap() {
	/*initialise the map*/
	    var where = {lat: 51.4816, lng: -3.1791};
	    var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 8,
		    center: where
		    });	
    }
	

	
document.addEventListener('DOMContentLoaded', function(){
	console.log("Dom loaded")
	
	document.getElementById("second").style.display="none";
	
	function setDefaultDate(){
	/*set today's date as initial input in date box*/
		var todaysDate = new Date();
		var day =todaysDate.getDate();
		var day=Number(day);
		var month= todaysDate.getMonth();
		var month=Number(month)+1;
		if (month <10){
			var month="0"+String(month);
		}
		if (day < 10){
			var day = "0"+ String(day);
		}
		var year=todaysDate.getFullYear();
		today=(year + "-" + month + "-" + day);
		document.getElementById("date_input").value=today;
	}
	
	function MapLoc(){
	/*find the lat and long of a placename from google maps*/
        var mapKey = "AIzaSyAweZVmZtaw8bYWarIUvRM5WT4NDgD9BP8";	
        var xhttpMapLoc = new XMLHttpRequest();   
		var add =document.getElementById("location_input").value;  /*address location from input box*/
		console.log("add" +add)
        xhttpMapLoc.addEventListener('load', processResponseMapLoc);
        xhttpMapLoc.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+add+"&key="+mapKey+"&region=uk");           
	    xhttpMapLoc.send();
    }

	var processResponseMapLoc = function() {
	/*process the responses of latitude and lontitude search*/
		console.log("processing");
        var dataLoc = JSON.parse(this.response);
		try {
	        console.log(dataLoc.results[0].geometry.location.lat + "," + dataLoc.results[0].geometry.location.lng);   /*get the lat and long of the place*/
		}
	    catch(err) {
			    location.reload();
			    document.getElementById("second").style.display="none";
				document.getElementById("location_input").style.backgroundColor="red";
        }
		var ll = document.getElementById("ll");
		var ll = (ll.value=dataLoc.results[0].geometry.location.lat + "," + dataLoc.results[0].geometry.location.lng);
		sunset();
		FsPlaces();
		
		console.log("ll is "+ll); 
			
		function sunset(){
		/*finds the location and checks for sunrise and sunset times*/
            var lat =dataLoc.results[0].geometry.location.lat;
            var lng = dataLoc.results[0].geometry.location.lng;
			var date = document.getElementById("date_input").value;
            console.log("lat is"+lat);
            console.log("lng is"+lng);
			console.log("date is"+date);
            var xhttpSunset = new XMLHttpRequest();
            xhttpSunset.addEventListener('load', processResponseSunset);
			xhttpSunset.open("GET", "http://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=" + date);
            xhttpSunset.send();
			
		}
			function processResponseSunset() {
			/*sets the sunrise and sunset times for the date chosen*/
			    console.log("parsing");
                var dataSunset = JSON.parse(this.response);
				var date = document.getElementById("date_input").value;
                console.log(dataSunset);
                document.getElementById("sunrise").innerHTML="Sunrise on "+ date + " is at "+dataSunset.results.sunrise;
                document.getElementById("sunset").innerHTML="Sunset on "+ date + " is at "+dataSunset.results.sunset;
		}	
		
		function FsPlaces(){
		/*use the lat and lng to search foursquare*/
		    var your_date =document.getElementById("date_input").value;
            var xhttp = new XMLHttpRequest();
            xhttp.addEventListener('load', processResponse); 
			var lim = 30;    /*limit of results*/
		    var radius = (document.getElementById("radius").value)
		    var radius = radius*1000; /*search radius*/
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
				var startCenter={lat:Number(dataLoc.results[0].geometry.location.lat), lng:Number(dataLoc.results[0].geometry.location.lng)};
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
		            var venueName = data.response.venues[i].name;
				    var venueId= data.response.venues[i].id;
				    var venueLink = 'http://foursquare.com/v/' + venueId +'?ref=PRS3ZGZSJIAI0A12KIP15VIY12ITIGFRBFVCRKRGF02AUVYW';
				    var linkText = document.createTextNode(names);
					var contentString = "<div><h2><a href="+venueLink+">"+(i+1)+"."+ venueName+"</a></h></div";
				    var iconBase = "star.png";
				    switch (data.response.venues[i].categories[0].id){
					/*changes the map marker depening upon activity searched*/
						default:
							var specialIcon = "images/default.png"
							break;
						case "4c38df4de52ce0d596b336e1":
					        var specialIcon = "images/carparking.png";
							break;
						case "4bf58dd8d48988d163941735":
						case "4bf58dd8d48988d1e7941735":
						case "4bf58dd8d48988d15d941735":
						    var specialIcon = "images/tree.png";
							break;
						case "4bf58dd8d48988d1e4931735":
						case "52e81612bcbc57f1066b79e6":
						case "52e81612bcbc57f1066b79eb":
						    var specialIcon = "images/playcentres.png"
							break;
						case "4bf58dd8d48988d17f941735":
						    var specialIcon = "images/cinema.png";
							break;
					  	case "4bf58dd8d48988d16e941735":
						case "4bf58dd8d48988d16d941735":
						case "4bf58dd8d48988d1c7941735":
						    var specialIcon = "images/food.png";
							break;
						case "4bf58dd8d48988d182941735":
						case "4eb1baf03b7b2c5b1d4306ca":
						case "50aaa49e4b90af0d42d5de11":
						case "56aa371be4b08b9a8d57355e":
						case "4bf58dd8d48988d17b941735":
						case "4bf58dd8d48988d193941735":
						case "52741d85e4b0d5d1e3c6a6d9":
						case "4f4528bc4b90abdf24c9de85":
						    var specialIcon = "images/outdoors1.png";
							break;
						case "4bf58dd8d48988d1e3931735":
						case "52e81612bcbc57f1066b79e9":
						case "4bf58dd8d48988d184941735":
						case "4bf58dd8d48988d175941735":
						    var specialIcon = "images/outdoors.png";
							break;
						case "4bf58dd8d48988d114951735":
						    var specialIcon = "images/books.png";
							break;
						case "4bf58dd8d48988d181941735":
						    var specialIcon = "images/museum.png";
							break;
						case "4bf58dd8d48988d1f2931735":
						    var specialIcon = "images/show.png";
							break;
						case "4bf58dd8d48988d131941735":
						    var specialIcon = "images/worship.png";
							break;
						case "5267e4d9e4b0ec79466e48c7":
						    var specialIcon = "images/music.png";
							break;
					}
				    var marker = new google.maps.Marker({position: where, map: map, icon: specialIcon});
				    marker.content = contentString;
				    var infoWindow = new google.maps.InfoWindow();
				    google.maps.event.addListener(marker, 'click', function() {infoWindow.setContent(this.content);infoWindow.open(this.map,this)});
         	        /*items.appendChild(places)*/
					li.appendChild(a);
					a.appendChild(linkText);
					a.title = names;
					a.href = venueLink;
				}
			}
			else{
			/* Error - no places found message*/
				var items = ulist.appendChild(document.createElement("li"));
				var warning = "Sorry we cannot find any places for your selection.  Please try again and perhaps widen your search area.";
				var warning1 = document.createTextNode(warning);
				items.appendChild(warning1);
			    }
		}
	}
	

	
	function listen() {
	/* Listen for changes to the activity buttons etc */
	    console.log("listening");
	    var go = document.getElementById("go").addEventListener("click", enter, true);
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
	/*
	var Eventful= function Eventful(){
		var date = document.getElementById("date_input").value;
		var xhttp = new XMLHttpRequest();
		xhttp.addEventListener('load',processResponseEventful);
		var appKey = "Gg8vsHG9Skc3TC2N";
		var OAuthConsumer="643957f1b9e1d6c14069";
		var OAuthSecret="fc3d3d5322a13cdf9f9b";
		var place = document.getElementById("location_input").value;
		var keywords = document.getElementById("query").value;
		console.log(keywords);
		/*xhttp.open("GET", "https://www.eventbriteapi.com/v3/events/?token="+personalOAuth+"&q="+keywords+"&venue="+place);*//*
		xhttp.open("GET","http://api.eventful.com/rest/events/search/get?oauth_consumer_key="+OAuthConsumer+"&oauth_consumer_secret=fc3d3d5322a13cdf9f9b&app_key="+appKey+"&q="+keywords+"&l="+place+'"');
		xhttp.send();
		}
		
	    var processResponseEventful = function(){
		    var dataEventful = JSON.parse(this.response);
			console.log(dataEventful);
			for(i=0;i<10;i++){
		    console.log(dataEventful.events[0].name);}
		}*/
       
    var enter=function enter(){
		checking();
		if ((document.getElementById("location_input").value==="")||(document.getElementById("activity").innerHTML==="")){
			if (document.getElementById("activity").innerHTML===""){
				if (document.getElementById("location_input").value===""){
					alert("Please choose a location and activity");
				}
				else{
					alert("Please choose an activity");
			    }
			}
			else{
			alert("Please choose a location to search");
			}
		}
		else{
			document.getElementById("top").style.display="none";
		    document.getElementById("second").style.display="initial";
		    MapLoc();
		     /*Eventful();*/
		}
				
	}	

	
	listen();
	setDefaultDate();
	

})