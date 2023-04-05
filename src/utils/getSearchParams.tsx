import { searchParamsType } from "../types";

export default function getSearchParams(search: string): searchParamsType {
	const searchParams = new URLSearchParams(search);
	const category = searchParams.get("category")!;
	const difficulty = searchParams.get("difficulty")!;
	const numQuestions = searchParams.get("numQuestions")!;
	return { category, difficulty, numQuestions };
}
