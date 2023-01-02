// WEB Sockets
var W3CWebSocket = require("websocket").w3cwebsocket;

var client = new W3CWebSocket("ws://172.22.21.135:3306", "echo-protocol");

client.onerror = function () {
	console.log("Connection Error");
};

client.onopen = function () {
	console.log("WebSocket Client Connected");
};

client.onclose = function () {
	console.log("Client Closed");
};

client.onmessage = function (e) {
	if (typeof e.data === "string") {
		console.log("Recebido!");
		if (e.data != "ESTOU A ESPERA") {
			loadApples(e.data);
		}
	}
};

window.onload = () => {
	let places = staticLoadPlaces();
	renderPlaces(places);
};

function staticLoadPlaces() {
	return [
		{
			name: "Arvore",
			location: {
				lat: 39.734167,
				lng: -8.821121,
			},
		},
		{
			name: "Arvore2",
			location: {
				lat: 39.733845,
				lng: -8.820798,
			},
		},
	];
}

function renderPlaces(places) {
	let scene = document.querySelector("a-scene");

	places.forEach((place) => {
		let latitude = place.location.lat;
		let longitude = place.location.lng;

		let model = document.createElement("a-entity");
		// model.setAttribute("position", {
		// 	x: 0,
		// 	y: -0.0005,
		// 	z: 0,
		// });
		model.setAttribute(
			"gps-entity-place",
			`latitude: ${latitude}; longitude: ${longitude};`
		);
		model.setAttribute("gltf-model", "./assets/asset.gltf");
		model.setAttribute("scale", "10 10 10");

		scene.appendChild(model);
	});
}
