const sosBtn = document.getElementById('sosBtn');
const locationSpan = document.getElementById('location');
const networkSpan = document.getElementById('network');
const messageSpan = document.getElementById('message');

let lastLocation = null;

//Get user location
function sendSOS() {
  messageSpan.textContent = "Requesting location...";
  
  if (!navigator.geolocation) {
    locationSpan.textContent = "Geolocation not supported.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const link = `https://www.google.com/maps?q=${latitude},${longitude}`;

      locationSpan.textContent = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
      messageSpan.textContent = "Sending SOS...";

      lastLocation = { latitude, longitude, link };
    
      sendAlert(link);
    },
    (err) => {
      locationSpan.textContent = "Unable to get location.";
      messageSpan.textContent = `Error: ${err.message}`;
    }
  );
}

// Send alert (simulated)
function sendAlert(link) {
  const network = navigator.connection?.effectiveType || "unknown";

  if (["slow-2g", "2g"].includes(network)) {
    messageSpan.textContent = "Slow network detected. Will retry shortly...";

    // Simulate Background Task fallback
    setTimeout(() => {
      messageSpan.textContent = "✅ SOS resent in background!";
      alert(`Emergency! Help needed.\nLocation: ${link}`);
    }, 5000);

  } else {
    messageSpan.textContent = "✅ SOS sent successfully!";
    alert(`Emergency! Help needed.\nLocation: ${link}`);
  }
}

// Detect network
function updateNetworkInfo() {
  const conn = navigator.connection;
  if (conn) {
    networkSpan.textContent = `${conn.effectiveType} (${conn.downlink} Mbps)`;
  } else {
    networkSpan.textContent = "Not available";
  }
}

// Init
updateNetworkInfo();
navigator.connection?.addEventListener('change', updateNetworkInfo);

sosBtn.addEventListener('click', sendSOS);
