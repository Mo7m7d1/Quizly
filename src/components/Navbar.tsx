import { useState, useEffect, useRef } from "react";
import {
	Navbar,
	MobileNav,
	Typography,
	IconButton,
	Select,
	Option,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export default function Example() {
	const [openNav, setOpenNav] = useState(false);
	const navigate = useNavigate();
	const navbarRef = useRef(null);

	const handleEnglish = () => {
		navigate("quizly/");
	};
	const handleArabic = () => {
		navigate("quizly/homeAr");
	};

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpenNav(false)
		);

		const handleClickOutside = (event: MouseEvent) => {
			if (
				navbarRef.current &&
				!(navbarRef.current as any).contains(event.target)
			) {
				setOpenNav(false);
			}
		};
		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography variant="small" color="blue-gray" className="p-1 font-normal">
				<Link
					to="quizly/"
					className="flex items-center hover:text-blue-700 transition-all"
				>
					Home
				</Link>
			</Typography>
			<Typography variant="small" color="blue-gray" className="p-1 font-normal">
				<Link
					to="quizly/about"
					className="flex items-center hover:text-blue-700 transition-all"
				>
					About
				</Link>
			</Typography>
		</ul>
	);

	return (
		<Navbar
			ref={navbarRef}
			className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4"
			style={{ position: "sticky", top: 0 }}
		>
			<div className="container mx-auto flex items-center justify-between text-blue-gray-900">
				<Typography
					variant="small"
					className="mr-4 cursor-pointer py-1.5 font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text  hover:from-blue-600 hover:to-purple-400 transition-all ease-in-out"
				>
					<Link to="quizly/">Quizly</Link>
				</Typography>

				<div className="hidden lg:block">{navList}</div>
				<div className="hidden lg:inline-block">
					<Select label="Language">
						<Option onClick={() => handleEnglish()}>English</Option>
						<Option onClick={() => handleArabic()}>Arabic</Option>
					</Select>
				</div>
				<IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							className="h-6 w-6"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</IconButton>
			</div>
			<MobileNav open={openNav}>
				<div className="container mx-auto">
					{navList}
					<Select label="Language">
						<Option onClick={() => handleEnglish()}>English</Option>
						<Option onClick={() => handleArabic()}>Arabic</Option>
					</Select>
				</div>
			</MobileNav>
		</Navbar>
	);
}
