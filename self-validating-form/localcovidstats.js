export function getLocalCovidStats() {
    let status = document.getElementById('status');
  
    function success(position) {
      console.log(position);
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetch(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=d4e7e53e-de61-4160-bab6-da91a2f1c18e`)
      .then(response => response.json())
      .then(data => console.log(data));
      status.textContent = '';
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your local COVID-19 statistics';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Fetching Data';
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }