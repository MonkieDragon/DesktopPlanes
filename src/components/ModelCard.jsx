import React from "react";
import { makePlane } from "../utils/utils";

const ModelCard = ({
	plane_index,
	model,
	setMoney,
	money,
	setLanded,
	airport,
	planeCount,
	setPlaneCount,
}) => {
	const buyPlane = () => {
		const newPlane = makePlane(airport, plane_index, planeCount);
		setPlaneCount((current) => current + 1);
		setLanded((current) => [...current, newPlane]);
		setMoney((current) => current - model.price);
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<p>{model.name}</p>
			<p>{model.capacity}</p>
			<p>{model.range / 1000}km</p>
			<p>${model.price}</p>
			<button onClick={buyPlane} disabled={money < model.price}>
				BUY
			</button>
		</div>
	);
};

export default ModelCard;
