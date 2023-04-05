export default function Footer() {
	return (
		<div className="flex justify-center items-center w-full relative bottom-4">
			<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© {new Date().getFullYear()}{" "}
				<a href="" className="hover:underline hover:text-main_color">
					ALMO™
				</a>
				. All Rights Reserved.
			</span>
		</div>
	);
}
