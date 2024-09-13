import { Commet } from "react-loading-indicators";

export const Loading = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Commet
				color="#000000"
				size="medium"
				text=""
				textColor="#dc1818"
			/>
		</div>
	);
};
