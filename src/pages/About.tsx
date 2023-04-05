import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function About() {
	return (
		<div className="flex justify-center items-center h-[80vh]">
			<div className="bg-white shadow-lg rounded-lg w-96 md:w-3/5 lg:w-1/3">
				<div className="bg-gradient-to-br from-indigo-400 to-purple-500 text-center rounded-t-lg py-8">
					<h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold font-serif">
						ALMO
					</h1>
					<div className="flex justify-center pt-4">
						<a
							href="https://github.com/Mo7m7d1"
							target="_blank"
							rel="noreferrer"
						>
							<FaGithub className="text-white mx-4 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 hover:text-purple-200 transition-all" />
						</a>
						<a
							href="https://www.linkedin.com/in/Mo7m7d1"
							target="_blank"
							rel="noreferrer"
						>
							<FaLinkedin className="text-white mx-4 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 hover:text-blue-500 transition-all" />
						</a>
						<a
							href="https://twitter.com/Mo7m7d1"
							target="_blank"
							rel="noreferrer"
						>
							<FaTwitter className="text-white mx-4 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 hover:text-blue-300 transition-all" />
						</a>
					</div>
				</div>
				<div className="px-8 py-6">
					<p className="text-gray-700 text-center text-lg md:text-xl lg:text-2xl leading-relaxed font-serif">
						Web Developer
					</p>
				</div>
			</div>
		</div>
	);
}

export default About;
