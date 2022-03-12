import { getDistance } from "geolib";
import products from "../data/products";
import planeModels from "../data/planeModels";
import capitals from "../data/capitals.json";

export const makeJobs = (airport) => {
	const caps = capitals.features;
	const job_count = 20;
	const newJobs = [];
	const coords = { lat: airport.lat, lng: airport.lng };
	for (let i = 0; i < job_count; i++) {
		const job_type = products[Math.random() * products.length];
		const dest = caps[Math.floor(Math.random() * caps.length)].properties;

		const dist = getDistance(coords, {
			lng: dest.longitude,
			lat: dest.latitude,
		});
		newJobs.push({
			product: job_type.product,
			destination: dest.name,
			location: airport.name,
			distance: dist,
			payment: Math.ceil(dist / 10000) * job_type.value,
		});
	}
	setTimeout(makeJobs, 1000);
	console.log("making jobs");
	return newJobs;
};

export const makePlane = (airport_index, plane_index, planeCount) => {
	const model = planeModels[plane_index];
	const newPlane = {
		coordinates: {},
		destination: {},
		origin: {},
		route_length: 0,
		destination_id: airport_index,
		distance_travelled: 0,
		bearing: 0,
		cargo: [],
		id: planeCount,
		name: model + "-" + planeCount,
	};
	return Object.assign(newPlane, model);
};
