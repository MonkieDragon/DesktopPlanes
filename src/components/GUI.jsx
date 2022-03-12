import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import "./GUI.css";
import { makeJobs } from "../utils/utils";

const GUI = ({
	airport,
	setAirport,
	airports,
	setAirports,
	setMoney,
	money,
	landed,
	setLanded,
	setFlying,
	selectedPlane,
	SetSelectedPlane,
}) => {
	const [jobs, setJobs] = useState([]);
	const [planeCount, setPlaneCount] = useState(0);
	useEffect(() => {
		console.log("in GUI");
		setInterval(jobGen, 3000);
	}, []);

	function jobGen() {
		console.log("in jobGen");
		const newJobs = [];
		airports.forEach((ap) => {
			if (ap.owned) {
				newJobs = [...newJobs, ...makeJobs(ap)];
			}
		});
		setJobs(newJobs);
	}

	return (
		<div className="GUI-container">
			<div className="header">Money: ${money}</div>{" "}
			{airport ? (
				<Modal
					airport={airport}
					setAirport={setAirport}
					airports={airports}
					setAirports={setAirports}
					setMoney={setMoney}
					money={money}
					landed={landed}
					setLanded={setLanded}
					setFlying={setFlying}
					jobs={jobs}
					setJobs={setJobs}
					planeCount={planeCount}
					setPlaneCount={setPlaneCount}
					selectedPlane={selectedPlane}
					SetSelectedPlane={SetSelectedPlane}
				/>
			) : null}
		</div>
	);
};

export default GUI;
