export function gtLocalWeatherStats() {
	let status = document.getElementById('status');
  //let button = document.getElementById('get-local-weather-stats');

	function success(position) {
		console.log(position);
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		fetch(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=d4e7e53e-de61-4160-bab6-da91a2f1c18e`)
			.then(response => response.json())
			.then(data => {
        status.textContent = '';
				status.innerHTML += `<li>City ${data.data.city}</li></br>`;
				let pollution = data.data.current.pollution;
				let weather = data.data.current.weather;
				status.innerHTML += `<li>Humidity ${weather.hu}%</li></br>`;
				status.innerHTML += `<li>Atmospheric Pressure ${weather.pr}hPa</li></br>`;
				status.innerHTML += `<li>Temperature ${weather.tp}C</li></br>`;
				status.innerHTML += `<li>Wind Speed ${weather.ws}m/s</li></br>`;
				status.innerHTML += `<li>Air Quality Index US ${pollution.aqius}</li></br>`;
				status.innerHTML += `<li>Main Pollutant US ${pollution.mainus}</li></br>`;
				
			});
	}

	function error() {
		status.textContent = 'Unable to retrieve your local Weather and Pollution statistics';
	}

	if (!navigator.geolocation) {
		status.textContent = 'Geolocation is not supported by your browser';
	} else {
		status.textContent = 'Fetching Data';
		navigator.geolocation.getCurrentPosition(success, error);
	}

}