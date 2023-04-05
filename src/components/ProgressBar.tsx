import { ProgressProps } from "../types";

export default function ProgressBar({ initialTime, timer }: ProgressProps) {
	return (
		<div className="relative h-3 overflow-hidden bg-gray-200 rounded-t-md">
			<div
				className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
				style={{
					width: `${((initialTime - timer) / initialTime) * 100}%`,
				}}
			></div>
		</div>
	);
}
