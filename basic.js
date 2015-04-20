	var rendererOptions = {
		draggable: true
	  };
	  var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	  var directionsService = new google.maps.DirectionsService();
	  var map;
	  var browserSupportFlag = new Boolean();
	  var infowindow = new google.maps.InfoWindow();
	  var initialLocation;
	  var finalLocation;
	  var watchID = null;	

	function inicio(){
	
		document.getElementById('directionsPanel').style.display = 'none';
		if(navigator.geolocation) {
			browserSupportFlag = true;
			navigator.geolocation.getCurrentPosition(function(position) {
					initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					contentString = "Aquí estas";
					map.setCenter(initialLocation);
					infowindow.setContent(contentString);
					infowindow.setPosition(initialLocation);
					infowindow.open(map);
			}, function() {
				handleNoGeolocation(browserSupportFlag);
			});
		} 
  
		function handleNoGeolocation(errorFlag) {
			if (errorFlag == true) {
				alert("Geolocation service failed.");
				initialLocation = newyork;
			} else {
					alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
					initialLocation = colombia;
					}
					map.setCenter(initialLocation);
		}
	
		var myOptions = {
		  zoom: 17,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  center: initialLocation
		};

		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById("directionsPanel"));
		google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
			computeTotalDistance(directionsDisplay.directions);
			
		});
		
		calcRoute();				
	}
	
	 
	function caminando() {
			
		watchID=navigator.geolocation.watchPosition(function(position) {
			finalLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			contentString = "Aqu&iacute; vas";
			map.setCenter(finalLocation);
			infowindow.setContent(contentString);
			infowindow.setPosition(finalLocation);
		},onError,{enableHighAccuracy: true });
	}
	
	function onError(error) {
    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	}

	function calcRoute() {
		var start = initialLocation;
		var end = finalLocation;
		var request = {
		origin:start,
		destination:end,
		travelMode: google.maps.DirectionsTravelMode.WALKING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});
	}
	
	function desaparece(){
		document.getElementById('sport').style.display = 'none';
		document.getElementById('directionsPanel').style.display = 'block';
		clearWatch();
	}

	function clearWatch() {
        if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
        }
    }

	function computeTotalDistance(result) {
		var total = 0;
		var myroute = result.routes[0];
		for (i = 0; i < myroute.legs.length; i++) {
			total += myroute.legs[i].distance.value;
		}
		total = total / 1000;
		document.getElementById("total").innerHTML = total + " km";
		computeTotalDuration(result);
	}   

  
	function computeTotalDuration(result) {
		//var p = document.getElementById('peso').value; // Peso
		var p = localStorage.getItem('keypes');
        var total = 0;
		var cal = 0;
		var myroute = result.routes[0];
		for (i = 0; i < myroute.legs.length; i++) {
			total += myroute.legs[i].distance.value;
		}
		
		total = total / 60;
		document.getElementById("total1").innerHTML = total + " min";
		/*calorias caminata moderada*/
		cal = 0.029*(p*2.2)*total;
		document.getElementById("cal1").innerHTML = cal + " Aproximadamente";
        localStorage.setItem('calq',cal);
    }
  
	
  