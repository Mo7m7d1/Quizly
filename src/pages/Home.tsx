import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Option, Select } from "@material-tailwind/react";

export default function Home() {
	const [category, setCategory] = useState(9);
	const [difficulty, setDifficulty] = useState("easy");
	const [numQuestions, setNumQuestions] = useState(3);

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
				Welcome to{" "}
				<span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
					Quizly
				</span>
			</h1>
			<div className="bg-white rounded-md shadow-lg  p-6 sm:w-10/12 md:w-auto">
				<h2 className="text-xl font-bold mb-4 text-gray-700">
					Filter Questions
				</h2>
				<div className="flex flex-col md:flex-row md:space-x-4 py-2">
					<div className="flex-grow sm:mb-3">
						<Select
							label="Category"
							name="category"
							className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:border-blue-500"
							onChange={(e) => setCategory(Number(e))}
						>
							<Option value="9">General Knowledge</Option>
							<Option value="21">Sports</Option>
							<Option value="23">History</Option>
							<Option value="11">Movies</Option>
							<Option value="15">Games</Option>
						</Select>
					</div>
					<div className="flex-grow sm:mb-3">
						<Select
							label="Difficulty"
							name="difficulty"
							className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:border-blue-500"
							onChange={(e) => setDifficulty(String(e))}
						>
							<Option defaultValue="easy">Easy</Option>
							<Option value="medium">Medium</Option>
							<Option value="hard">Hard</Option>
						</Select>
					</div>
					<div className="flex-grow">
						<Select
							label="Number of Questions"
							name="num-questions"
							className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:border-blue-500"
							onChange={(e) => setNumQuestions(Number(e))}
						>
							<Option value="3">3</Option>
							<Option value="5">5</Option>
							<Option value="10">10</Option>
							<Option value="15">15</Option>
							<Option value="20">20</Option>
						</Select>
					</div>
				</div>
				<Link
					to={`/quizly/quiz?category=${category}&difficulty=${difficulty}&numQuestions=${numQuestions}`}
				>
					<Button variant="gradient" fullWidth className="mt-4">
						Start Quiz
					</Button>
				</Link>
			</div>
		</div>
	);
}
