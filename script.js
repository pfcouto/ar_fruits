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
		model.setAttribute("position", {
			x: 0,
			y: -0.0005,
			z: 0,
		});
		model.setAttribute(
			"gps-entity-place",
			`latitude: ${latitude}; longitude: ${longitude};`
		);
		model.setAttribute("gltf-model", "./assets/asset.gltf");
		model.setAttribute("scale", "10 10 10");

		scene.appendChild(model);
	});
}
