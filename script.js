window.onload = () => {
	let places = staticLoadPlaces();
	renderPlaces(places);
};

function staticLoadPlaces() {
	return [
		{
			name: "Arvore",
			location: {
				lat: 39.427543,
				lng: -8.947316,
			},
		},
		{
			name: "Arvore2",
			location: {
				lat: 39.427551,
				lng: -8.947484,
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
		model.setAttribute(
			"gps-entity-place",
			`latitude: ${latitude}; longitude: ${longitude};`
		);
		model.setAttribute("gltf-model", "./assets/asset.gltf");
		model.setAttribute("rotation", "0 180 0");
		model.setAttribute("animation-mixer", "");
		model.setAttribute("scale", "10 10 10");

		model.addEventListener("loaded", () => {
			window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
		});

		scene.appendChild(model);
	});
}
