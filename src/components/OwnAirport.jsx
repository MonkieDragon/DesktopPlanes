import { useEffect, useState } from "react";
import ModelCard from "./ModelCard";
import "./OwnAirport.css";
import PlaneCard from "./PlaneCard";
import planeModels from "../data/planeModels";
import JobCard from "./JobCard";

const OwnAirport = ({
	airport,
	airports,
	setMoney,
	money,
	landed,
	setLanded,
	setFlying,
	jobs,
	setJobs,
	planeCount,
	setPlaneCount,
	selectedPlane,
	setSelectedPlane,
}) => {
	const [buyPlane, setBuyPlane] = useState(false);
	const [localJobs, setLocalJobs] = useState([]);

	useEffect(() => {
		console.log("in own airport");
		const APJobs = jobs.filter((job) => job.location == airports[airport].name);
		setLocalJobs(APJobs);
	}, [jobs]);

	const buyToggle = () => {
		setBuyPlane(!buyPlane);
	};

	return (
		<div className="OA-container">
			<p>{airports[airport].name}</p>
			<div className="OA-body">
				<div className="OA-column OA-planes">
					{buyPlane ? (
						<>
							<button onClick={buyToggle}>CANCEL</button>

							{planeModels.map((model, index) => {
								return (
									<ModelCard
										key={index}
										plane_index={index}
										model={model}
										setMoney={setMoney}
										money={money}
										setLanded={setLanded}
										airport={airport}
										planeCount={planeCount}
										setPlaneCount={setPlaneCount}
									/>
								);
							})}
						</>
					) : (
						<>
							<button onClick={buyToggle}>BUY PLANE</button>

							{airports[airport].planes.map((plane) => {
								return (
									<PlaneCard
										plane={plane}
										key={airports[airport].name}
										selectedPlane={selectedPlane}
										setSelectedPlane={setSelectedPlane}
									/>
								);
							})}
						</>
					)}
				</div>
				<div className="OA-column OA-jobs">
					{localJobs.map((_job, index) => {
						return <JobCard job={_job} key={index} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default OwnAirport;
