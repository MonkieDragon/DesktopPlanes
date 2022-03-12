const demoPlanes = [
	{
		coordinates: { lat: 51.507351, lng: -0.127758 },
		destination: { lat: 48.856613, lng: 2.352222 },
		origin: { lat: 51.507351, lng: -0.127758 },
		route_length: getPreciseDistance(
			{ lat: 51.507351, lng: -0.127758 },
			{ lat: 48.856613, lng: 2.352222 }
		),
		destination_id: 0,
		distance_travelled: 0,
		speed: 10000,
		bearing: 0,
		range: 50000,
		capacity: 10,
		model: "big plane",
		cargo: [],
	},
	{
		coordinates: { lat: 51.507351, lng: -0.127758 },
		destination: { lat: 40.712776, lng: -74.005974 },
		origin: { lat: 51.507351, lng: -0.127758 },
		route_length: getDistance(
			{ lat: 51.507351, lng: -0.127758 },
			{ lat: 40.712776, lng: -74.005974 }
		),
		destination_id: 0,
		distance_travelled: 0,
		speed: 50000,
		bearing: 0,
		range: 100000,
		capacity: 10,
		model: "big plane",
		cargo: [],
	},
];

export default demoPlanes;
