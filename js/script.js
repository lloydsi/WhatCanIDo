document.addEventListener('DOMContentLoaded', function(){
	console.log("Dom loaded")
	
	 function listen() {
	    var go = document.getElementById("go").addEventListener("click", enter, true);
        console.log("listening");
	}
		
	function setDefaultDate() {
	    var todaysDate = new Date()
	    var day =todaysDate.getDate();
	    var month= todaysDate.getMonth();
	    var month=Number(month)+1;
	    var year=todaysDate.getFullYear();
	    var today=(year+"-"+month+"-"+day);
	    document.getElementById("date_input").value=today
	}
		
	var enter=function enter(){
		checking();
	    var date_input =document.getElementById("date_input").value;
		document.cookie = "date_input ="+date_input+'"';   /* cookie array positions 1*/
		var location_input =document.getElementById("location_input").value;
		document.cookie = "place = " + location_input +'"'; /* cookie array positions 3*/
		console.log(date_input);
		console.log(location_input);
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
		
		document.cookie = "activity = "+activity+'"'; /*cookie array position  5*/
		
	}  
	
	listen();
	setDefaultDate();

})