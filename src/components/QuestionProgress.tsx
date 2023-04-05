import { QuestionProgressProps } from "../types";

export default function QuestionProgress({
	currentQuestionIndex,
	questionsLength,
}: QuestionProgressProps) {
	return (
		<div className="text-gray-600 text-sm float-right">
			<span className="text-green-500">{currentQuestionIndex}</span> /{" "}
			{questionsLength}
		</div>
	);
}
