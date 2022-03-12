import "./Header.css";
import Modal from "./Modal";

const Header = ({
	airport,
	setAirport,
	airports,
	setAirports,
	setMoney,
	money,
	landed,
	setLanded,
	setFlying,
}) => {
	return (
		<>
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
				/>
			) : null}
		</>
	);
};

export default Header;
