import { decode } from "html-entities";
import { questionProps } from "../types";

export default function Question({
	currentQuestionIndex,
	questions,
	selectedOptionIndex,
	handleOptionClick,
	correctOptionIndex,
}: questionProps) {
	return (
		<div className="flex flex-col justify-center items-center space-y-6 ">
			<h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
				{decode(questions[currentQuestionIndex]?.question!)}
			</h2>
			<div className="w-full space-y-4">
				{questions[currentQuestionIndex].options.map((option, index) => (
					<div
						key={index}
						className={`py-4 px-8 rounded-md cursor-pointer flex items-center justify-between bg-white shadow-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
							selectedOptionIndex === index
								? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
								: ""
						}
						${
							correctOptionIndex === index
								? "bg-gradient-to-r from-purple-500 to-blue-500"
								: ""
						}
						`}
						onClick={() => handleOptionClick(index)}
					>
						<span className="text-gray-800">{decode(option)}</span>
						{selectedOptionIndex === index && (
							<svg
								className="h-6 w-6 text-white ml-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
