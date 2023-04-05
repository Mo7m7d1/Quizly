import { Button } from "@material-tailwind/react";
import { NextButtonProps } from "../types";

const NextButton = ({
	isLastQuestion,
	disabled,
	onClick,
	isAr = false,
}: NextButtonProps) => {
	return (
		<div className="flex justify-end mt-6">
			<Button
				color="blue"
				size="md"
				onClick={onClick}
				disabled={disabled}
				className="mr-2"
			>
				{isAr
					? isLastQuestion
						? "انهي الاختبار"
						: "السؤال التالي"
					: isLastQuestion
					? "Finish Quiz"
					: "Next Question"}
			</Button>
		</div>
	);
};

export default NextButton;
