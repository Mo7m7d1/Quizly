export type NextButtonProps = {
	isLastQuestion: boolean;
	disabled: boolean;
	isAr: boolean;
	onClick: () => void;
};

export type questionType = {
	id?: number;
	question: string;
	correct_answer: string;
	incorrect_answers?: string[];
	options: string[];
};

export type questionProps = {
	currentQuestionIndex: number;
	questions: questionType[];
	selectedOptionIndex: number;
	handleOptionClick: (index: number) => void;
};

export type ResultsProps = {
	score: number;
	totalQuestions: number;
	isAr?: boolean;
	onRestart: () => void;
	onMenu: () => void;
};

export type searchParamsType = {
	category: string | "9";
	difficulty: string | "easy";
	numQuestions: string | "3";
};

export type ProgressProps = {
	initialTime: number;
	timer: number;
};

export type QuestionProgressProps = {
	currentQuestionIndex: number;
	questionsLength: number;
};
