import { useEffect, useState } from "react";
import {
	Question,
	NextButton,
	Result,
	ProgressBar,
	QuestionProgress,
} from "../components/index";
import { questionType } from "../types";
import { useNavigate } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
import jsonData from "../data/dataAr.min.json";

export default function GradualModeAr() {
	const [questions, setQuestions] = useState<questionType[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const initialTime = 15;
	const [timer, setTimer] = useState(initialTime);
	const [wrongAnswers, setWrongAnswers] = useState<questionType[]>([]);
	const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

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
		navigate("/quizly/homeAr");
	};

	const onAnswersClick = () => {
		if (wrongAnswers.length === 0) return;

		navigate("/quizly/answersAr", {
			state: {
				questions: wrongAnswers,
				selectedOptions: selectedOptions,
			},
		});
	};

	const handleNextClick = () => {
		if (
			selectedOptionIndex === questions[currentQuestionIndex].correct_answer
		) {
			setScore(score + 1);
		} else {
			setWrongAnswers((prevWrongAnswers) => [
				...prevWrongAnswers,
				questions[currentQuestionIndex],
			]);
			setSelectedOptions((prevSelectedOptions) => [
				...prevSelectedOptions,
				selectedOptionIndex,
			]);
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
		try {
			const difficultyLevels = [1, 2, 3];
			const filteredData = difficultyLevels
				.map((level) => {
					return jsonData.filter((question) => question.difficulty === level);
				})
				.flatMap((data) => data)
				.sort(() => Math.random() - 0.5)
				.sort((a, b) => a.difficulty! - b.difficulty!)
				.slice(0, 10);

			setQuestions(filteredData);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchQuestions();
		}, 800);

		return () => {
			clearTimeout(timeoutId);
		};
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
				<div className="flex items-center justify-center h-[80vh]">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
				</div>
			) : questions.length > 0 ? (
				<div className="flex justify-center items-center h-[80vh]" dir="rtl">
					{showResult ? (
						<Result
							score={score}
							totalQuestions={questions.length}
							onRestart={handleRestartClick}
							onMenu={handleMenuClick}
							isAr={true}
							onAnswers={onAnswersClick}
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
									isAr={true}
								/>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="flex justify-center items-center h-screen" dir="rtl">
					<Alert color="red">حدث خطأ في تحميل الأسئلة، يرجى تحديث الصفحة</Alert>
				</div>
			)}
		</>
	);
}
