import capitals from "./capitals.json";

const ports = capitals.features.map((city, index) => ({
	index: index,
	lng: city.geometry.coordinates[0],
	lat: city.geometry.coordinates[1],
	name: city.properties.name,
	price: Math.round(city.properties.pop_max / 100000) * 10,
	owned: false,
	planes: [],
	jobs: [],
	store: [],
	storeCapacity: 5,
}));

export default ports;
