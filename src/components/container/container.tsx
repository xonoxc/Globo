import React from "react";

const Container: React.FC = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="container w-full max-w-7xl mx-auto px-4">
			{children}
		</div>
	)

}

export default Container
