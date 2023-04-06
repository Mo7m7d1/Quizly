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
								? "bg-gradient-to-r from-green-400 to-green-300"
								: ""
						}
						`}
						onClick={() => handleOptionClick(index)}
					>
						<span className="text-gray-900">{decode(option)}</span>
					</div>
				))}
			</div>
		</div>
	);
}
