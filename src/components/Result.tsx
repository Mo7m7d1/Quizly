import { Button } from "@material-tailwind/react";
import { ResultsProps } from "../types";

const Result = ({
	score,
	totalQuestions,
	onRestart,
	onMenu,
	onAnswers,
	isAr = false,
}: ResultsProps) => {
	return (
		<div className="flex justify-center items-center flex-col bg-white shadow-md rounded-md p-6">
			<h2 className="mb-4 text-lg">
				{isAr ? "نتيجتك: " : "Your score:"}{" "}
				<span className="text-green-500 text-xl font-bold">{score}</span>{" "}
				{isAr ? "من" : "out of"}{" "}
				<span className="text-red-500 text-xl font-bold">{totalQuestions}</span>
			</h2>
			<div className="flex flex-row gap-4">
				<Button variant="gradient" onClick={onRestart} className="w-full">
					{isAr ? "إعادة الاختبار" : "Restart Quiz"}
				</Button>
				<Button variant="gradient" onClick={onMenu} className="w-full">
					{isAr ? "القائمة الرئيسية" : "Menu"}
				</Button>
			</div>
			{score < totalQuestions && (
				<div className="w-full h-4 mt-4">
					<Button
						size="sm"
						variant="text"
						onClick={onAnswers}
						className="text-sm text-blue-500 hover:text-blue-700"
					>
						{isAr ? "اجابات الأسئلة" : "Question's answers"}
					</Button>
				</div>
			)}
		</div>
	);
};

export default Result;
