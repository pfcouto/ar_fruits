//websocket client
var ws = new WebSocket("wss://sockets-pedromario.duckdns.org/");
//websocket connection
ws.onopen = function () {
	console.log("Connected to server");
};
//websocket error
ws.onerror = function (err) {
	console.log("Error: " + err);
};
//websocket message
ws.onmessage = function (event) {
	console.log("Message: " + event.data);
	loadApples(event.data);
};
//websocket close
ws.onclose = function () {
	console.log("Disconnected");
};

function loadApples(json) {
	let scene = document.querySelector("a-scene");

	// do {
	// 	var element = scene.getObjectByName("fruit");
	// 	console.log(element);
	// 	scene.remove(element);
	// } while (element);

	// console.log(json);

	json = json.replaceAll("'", '"');
	const obj = JSON.parse(json);

	var fruit = obj.mario.map;

	// console.log("Fruit: ", fruit);

	for (var key of Object.keys(fruit)) {
		fruit[key].forEach((element) => {
			//place element close to arvore coordinates
			let model = document.createElement("a-entity");
			model.setAttribute("material", `color: red`);
			model.setAttribute("geometry", `primitive: sphere; radius: 1`);
			model.setAttribute(
				"gps-entity-place",
				`latitude: ${39.734168 + (element.lat - 0.0001) / 10000 - 0.000075}; longitude: ${
					-8.821121 + element.lon / 10000 - 0.00004
				};`
			);
			model.setAttribute("scale", "0.1 0.1 0.1");
			model.setAttribute("position", `0 ${2 + element.alt * 10} 0`);
			model.setAttribute("clicker", null);

			scene.appendChild(model);
		});
	}

	AFRAME.registerComponent("clicker", {
		init: function () {
			this.el.addEventListener("click", (e) => {
				let lat = e.srcElement.components["gps-entity-place"].attrValue.latitude;
				let lon = e.srcElement.components["gps-entity-place"].attrValue.longitude;
				let alt = e.srcElement.components["position"].data.y;
				let model = document.createElement("a-text");

				let x = 39.734167 / 1000000 + parseFloat(lat);
				let y = -8.821121 / 1000000 + parseFloat(lon);
				console.log(`lat:${lat}, lon:${lon}`);
				console.log(`x:${x}, y:${y}`);

				model.setAttribute(
					"value",
					`X: ${parseFloat(lat).toFixed(7)}\nY: ${parseFloat(lon).toFixed(
						7
					)}\nZ: ${parseFloat(alt).toFixed(2)};`
				);

				model.setAttribute(
					"gps-entity-place",
					`latitude: ${lat}; longitude: ${lon};`
				);
				model.setAttribute("position", `0 ${alt + 0.2} 0`);
				model.setAttribute("scale", "1 1 1");
				model.setAttribute("look-at", "[gps-camera]");
				model.setAttribute("color", "blue");
				model.setAttribute("clickerremove", null);
				scene.appendChild(model);
			});
		},
	});

	AFRAME.registerComponent("clickerremove", {
		init: function () {
			this.el.addEventListener("click", (e) => {
				console.log("Click");
				scene.removeChild(e.srcElement);
			});
		},
	});

	// console.log(scene)
}

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
		model.setAttribute("position", `0 -2.5 0`);

		scene.appendChild(model);
	});
}
