import { useEffect, useState } from "react";
import {
	Question,
	NextButton,
	Result,
	ProgressBar,
	QuestionProgress,
} from "../components/index";
import { questionType, searchParamsType } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
import getSearchParams from "../utils/getSearchParams";
import axios from "axios";

export default function Quiz() {
	const [questions, setQuestions] = useState<questionType[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const initialTime = 15;
	const [timer, setTimer] = useState(initialTime);

	const handleOptionClick = (optionIndex: number) => {
		setSelectedOptionIndex(optionIndex);
	};

	const handleRestartClick = async () => {
		setCurrentQuestionIndex(0);
		setSelectedOptionIndex(-1);
		setScore(0);
		setShowResult(false);
		setTimer(initialTime);
		await fetchQuestions();
	};

	const handleMenuClick = () => {
		setCurrentQuestionIndex(0);
		setSelectedOptionIndex(-1);
		setScore(0);
		setShowResult(false);
		navigate("/quizly/");
	};

	const handleNextClick = () => {
		if (
			questions[currentQuestionIndex].options[selectedOptionIndex] ===
			questions[currentQuestionIndex].correct_answer
		) {
			setScore(score + 1);
		}
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
			setTimer(initialTime);
		} else {
			setShowResult(true);
		}
		setSelectedOptionIndex(-1);
	};
	const fetchQuestions = async () => {
		const { category, numQuestions, difficulty }: searchParamsType =
			getSearchParams(location.search);

		try {
			setIsLoading(true);

			const cacheKey = `questions-${category}-${numQuestions}-${difficulty}`;
			const cachedData = JSON.parse(localStorage.getItem(cacheKey)!);

			if (cachedData) {
				setQuestions(cachedData);
			} else {
				const data = await axios.get(
					`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
				);
				const { results } = data.data;
				const questions = results.map((question: any) => {
					const options = [
						...question.incorrect_answers,
						question.correct_answer,
					];
					return {
						...question,
						options: options.sort(() => Math.random() - 0.5),
					};
				});
				setQuestions(questions);
				localStorage.setItem(cacheKey, JSON.stringify(questions));

				setIsLoading(false);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchQuestions();
	}, []);

	useEffect(() => {
		if (timer < 0) {
			handleNextClick();
		} else {
			const time = setTimeout(() => {
				setTimer((prevTime) => prevTime - 1);
			}, 1000);

			return () => {
				clearTimeout(time);
			};
		}
	}, [currentQuestionIndex, timer]);

	return (
		<>
			{isLoading ? (
				<div className="flex items-center justify-center h-screen">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
				</div>
			) : questions.length > 0 ? (
				<div className="flex justify-center items-center h-screen">
					{showResult ? (
						<Result
							score={score}
							totalQuestions={questions.length}
							onRestart={handleRestartClick}
							onMenu={handleMenuClick}
						/>
					) : (
						<div className="bg-white shadow-md rounded-md lg:w-[500px] md:w-[400px] sm:w-[360px]">
							<ProgressBar timer={timer} initialTime={initialTime} />
							<QuestionProgress
								currentQuestionIndex={currentQuestionIndex + 1}
								questionsLength={questions.length}
							/>
							<div className="m-6">
								<Question
									questions={questions}
									currentQuestionIndex={currentQuestionIndex}
									selectedOptionIndex={selectedOptionIndex}
									handleOptionClick={handleOptionClick}
								/>
								<NextButton
									isLastQuestion={currentQuestionIndex === questions.length - 1}
									disabled={selectedOptionIndex === -1}
									onClick={handleNextClick}
									isAr={false}
								/>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="flex justify-center items-center h-screen">
					<Alert color="red">
						There was an error loading the questions, Please refresh the page.
					</Alert>
				</div>
			)}
		</>
	);
}
