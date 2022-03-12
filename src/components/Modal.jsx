import "./Modal.css";
import OwnAirport from "./OwnAirport";
import { AiFillCloseCircle } from "react-icons/ai";
import { makeJobs } from "../utils/utils";

const Modal = ({
	airport,
	setAirport,
	airports,
	setAirports,
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
	const closeMod = () => {
		setAirport(null);
	};

	return (
		<div className="container">
			<div className="modal">
				<AiFillCloseCircle
					className="closeButton"
					onClick={closeMod}
					color="red"
					size="30px"
				/>
				{airports[airport].owned ? (
					<OwnAirport
						airport={airport}
						airports={airports}
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
						setSelectedPlane={setSelectedPlane}
					/>
				) : (
					<BuyAirport
						airport={airport}
						airports={airports}
						setAirports={setAirports}
						setMoney={setMoney}
						money={money}
					/>
				)}
			</div>
		</div>
	);
};

const BuyAirport = ({ airport, airports, setAirports, setMoney, money }) => {
	const buy = () => {
		const newAP = [...airports];
		newAP[airport].owned = true;
		setAirports(newAP);
		makeJobs();
		setMoney((current) => current - airports[airport].price);
	};

	return (
		<div>
			<p>{airports[airport].name}</p>
			<p>${airports[airport].price}</p>
			{airports[airport].price < money ? (
				<button onClick={buy}>Buy</button>
			) : (
				<p>Not Enough Funds</p>
			)}
		</div>
	);
};

export default Modal;
