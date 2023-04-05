export default function Footer() {
	return (
		<div className="flex justify-center items-center w-full absolute bottom-4">
			<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© {new Date().getFullYear()}{" "}
				<a
					href="https://twitter.com/Mo7m7d1"
					className="hover:underline hover:text-blue-500"
				>
					ALMO™
				</a>
				. All Rights Reserved.
			</span>
		</div>
	);
}
