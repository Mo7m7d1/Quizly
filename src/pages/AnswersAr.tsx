import { useEffect, useState } from "react";
import { Question, NextButton } from "../components/index";
import { questionType } from "../types";
import { useLocation, useNavigate } from "react-router-dom";

export default function AnswersAr() {
	const [questions, setQuestions] = useState<questionType[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const [isLoading, setIsLoading] = useState(true);

	const location = useLocation();
	const navigate = useNavigate();

	const handleNextClick = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
		}

		if (currentQuestionIndex === questions.length - 1)
			navigate("/quizly/homeAr");
	};

	const fetchQuestions = () => {
		setIsLoading(false);
		const { questions } = location.state;
		setQuestions(questions);
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchQuestions();
		}, 800);

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="flex items-center justify-center h-[80vh]">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
				</div>
			) : (
				<div className="flex justify-center items-center h-[80vh]" dir="rtl">
					<div className="bg-white shadow-md rounded-md lg:w-[500px] md:w-[400px] sm:w-[360px]">
						<div className="m-6">
							<Question
								questions={questions}
								currentQuestionIndex={currentQuestionIndex}
								correctOptionIndex={
									questions[currentQuestionIndex].correct_answer
								}
								selectedOptionIndex={-1}
								handleOptionClick={() => {}}
							/>
							<NextButton
								isLastQuestion={currentQuestionIndex === questions.length - 1}
								disabled={false}
								onClick={handleNextClick}
								isAr={true}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
