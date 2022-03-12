import React from "react";

const JobCard = ({ job, selectedPlane }) => {
	function load() {}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<p>{job.product}</p>
			<p>{job.destination}</p>
			<p>{job.location}</p>
			<p>{job.distance}</p>
			<p>{job.payment}</p>
			<button onClick={load} disabled={money < model.price}>
				LOAD
			</button>
		</div>
	);
};

export default JobCard;
