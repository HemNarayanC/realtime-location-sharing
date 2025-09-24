const socket = io();

// Leaflet map
const map = L.map("map").setView([27.7172, 85.3240], 16);   // Kathmandu default
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "open streetmap"
}).addTo(map);

// Get own location and send to server
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

//store markers for each user/device
const markers = {};

//receive locations from others
socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    //if a marker already exists for this device
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);   //update the coordinates
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);   //add the coordinates to map
    }
});