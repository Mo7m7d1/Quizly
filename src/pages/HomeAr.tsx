import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Option, Select } from "@material-tailwind/react";

export default function Home() {
	const [category, setCategory] = useState(2);
	const [difficulty, setDifficulty] = useState(2);
	const [numQuestions, setNumQuestions] = useState(3);

	return (
		<div className="flex flex-col items-center justify-center h-[80vh] bg-gray-100">
			<h1 className="text-4xl font-bold mb-12 text-gray-800 text-center">
				<span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
					Quizly{" "}
				</span>
				مرحباً بك في
			</h1>
			<div className="bg-white rounded-md shadow-lg  p-6 sm:w-10/12 md:w-auto">
				<div className="flex justify-between items-center flex-row-reverse mb-3">
					<h2 className="text-xl font-bold mb-4 text-gray-700 text-right">
						تصفية الأسئلة
					</h2>
					<Link to={`/quizly/gradualModeAr`}>
						<Button size="sm" variant="gradient">
							المود التصاعدي
						</Button>
					</Link>
				</div>
				<div className="flex flex-col sm:flex-col-reverse md:flex-row md:space-x-4 py-2">
					<div className="flex-grow sm:mb-3">
						<Select
							label="عدد الاسئلة"
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
					<div className="flex-grow sm:mb-3">
						<Select
							label="الصعوبة"
							name="difficulty"
							className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:border-blue-500"
							onChange={(e) => setDifficulty(Number(e))}
						>
							<Option value="1">سهل</Option>
							<Option value="2">متوسط</Option>
							<Option value="3">صعب</Option>
						</Select>
					</div>

					<div className="flex-grow sm:mb-3">
						<Select
							label="التصنيف"
							name="category"
							className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:border-blue-500"
							onChange={(e) => setCategory(Number(e))}
						>
							<Option value="1">ثقافة عامة</Option>
							<Option value="2">ثقافة إسلامية</Option>
							<Option value="3">تاريخ</Option>
							<Option value="7">جغرافيا</Option>
							<Option value="4">رياضة</Option>
							<Option value="5">أفلام</Option>
							<Option value="6">ألعاب</Option>
						</Select>
					</div>
				</div>
				<Link
					to={`/quizly/quizAr?category=${category}&difficulty=${difficulty}&numQuestions=${numQuestions}`}
				>
					<Button variant="gradient" fullWidth className="mt-4">
						ابدأ
					</Button>
				</Link>
			</div>
		</div>
	);
}
