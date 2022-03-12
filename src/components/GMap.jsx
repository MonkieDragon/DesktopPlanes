import React from "react";
import {
	Circle,
	GoogleMap,
	Marker,
	Polyline,
	useLoadScript,
} from "@react-google-maps/api";
import mapStyles from "../mapstyles/mapStyles";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	computeDestinationPoint,
	getDistance,
	getPreciseDistance,
	getRhumbLineBearing,
} from "geolib";

const libraries = ["places"];
const mapContainerStyle = { width: "100vw", height: "100vh" };
const centre = { lat: 51.507351, lng: -0.127758 };
const options = { styles: mapStyles, disableDefaultUI: true };

const GMap = ({
	setLanded,
	flying,
	setFlying,
	plane,
	setAirport,
	airports,
}) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});
	const mapRef = useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const movePlanes = () => {
		// const newFlying = flying.map((plane) => ({ ...plane }));
		const newFlying = [...flying];
		newFlying.forEach((plane) => {
			plane.coordinates = computeDestinationPoint(
				plane.coordinates,
				plane.speed,
				plane.bearing
			);
			plane.distance_travelled += plane.speed;
			if (plane.distance_travelled >= plane.route_length * 0.8) {
				const dist = getDistance(plane.coordinates, plane.destination);
				if (dist < plane.speed) {
					plane.route_length = 0;
					setLanded((current) => [...current, plane]);
				}
				// plane.route_length = 0;
				// plane.distance_travelled = 0;
				//copy to different array
			}
		});
		const filteredFlying = newFlying.filter((plane) => plane.route_length > 0);
		setFlying(filteredFlying);
		console.log("moved planes", flying.length);
		setTimeout(movePlanes, 1000);
	};

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(6);
	}, []);

	const airportClick = (i) => {
		console.log(i);
		setAirport(i);
		console.log("click!");
	};

	if (loadError) return "error loading maps";
	if (!isLoaded) return "Loading Maps";

	return (
		<GoogleMap
			mapContainerStyle={mapContainerStyle}
			zoom={5}
			center={centre}
			options={options}
			onLoad={onMapLoad}
		>
			{airports.map((airport, index) => (
				<Marker
					key={index}
					position={{
						lng: airport.lng,
						lat: airport.lat,
					}}
					icon={{
						url: airport.owned ? "/red-dot.svg" : "/grey-dot.svg",
						scaledSize: new window.google.maps.Size(50, 50),
						origin: new window.google.maps.Point(0, 0),
						anchor: new window.google.maps.Point(25, 25),
					}}
					onClick={() => {
						airportClick(index);
					}}
				/>
			))}
			{flying.map((fly, index) => (
				<>
					<Marker
						key={index}
						position={{
							lat: fly.coordinates.latitude,
							lng: fly.coordinates.longitude,
						}}
						options={{
							icon: {
								// url: "/plane.svg",
								path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
								scale: 4,
								// scaledSize: new window.google.maps.Size(200, 200),
								// origin: new window.google.maps.Point(0, 0),
								// anchor: new window.google.maps.Point(100, 100),
								fillOpacity: 1,
								fillColor: "red",
								strokeWeight: 1,
								strokeColor: "white",
								rotation: fly.bearing,
							},
						}}
						// onClick={() => {
						// 	panTo({
						// 		lng: airport.geometry.coordinates[0],
						// 		lat: airport.geometry.coordinates[1],
						// 	});
						// }}
						onClick={() => {
							airportClick(index);
						}}
					/>
					<Polyline path={[fly.origin, fly.destination]} />
				</>
			))}
			{/* {plane ? (
				<Circle
					center={{
						lng: airport.lng,
						lat: airport.lat,
					}}
					radius={plane.range}
					options={{
						strokeColor: "#fc0320",
						strokeOpacity: 0.8,
						strokeWeight: 3,
					}}
				/>
			) : null} */}
		</GoogleMap>
	);
};

export default GMap;
