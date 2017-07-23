$(document).ready(function(){

	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    $('.temp-toggle button').click(function(){
    	
    	// toggle state of buttons
    	$('.temp-toggle button').removeClass('active');
    	$(this).addClass('active');

    	// toggle state of temperature data
    	var _id = $(this).attr('id');
    	$('.temp').hide();
    	$('.temp.' + _id).show();

    	/**
    	 * jQuery Way
    	 */
    	// $('.temp').hide();
    	// $('.temp.' + _id).fadeIn('slow');*/
    });

})

function success(pos) {

	$.ajax({
		type: 'get',
		data: { lat: pos.coords.latitude, lon: pos.coords.longitude },
		url: 'https://fcc-weather-api.glitch.me/api/current',
		success: function(data){
			$('.loading').hide();
			$('#weather').css('visibility', 'visible');
			$('#weather .city').text(data.name +', ' + data.sys.country);

			var c = data.main.temp;
			var f = celsiusToFahrenheit(c);

			$('#weather .temp.celsius').html(Math.round(c) + '<span class=\'deg\'>&deg;C</span>');
			$('#weather .temp.fahrenheit').html(Math.round(f) + '<span class=\'deg\'>&deg;F</span>');
			$('#weather .description').text(data.weather[0].description);
			$('#weather .weather-icon').addClass('wi wi-owm-' + data.weather[0].id);
		}
	})
}

function celsiusToFahrenheit(c) {
	if (c != 0) return (c * 1.8) + 32;
}