type titlePageProps = {
	title: string;
};

export const TitlePage = ({ title }: titlePageProps) => {
	return (
		<div className="flex items-center gap-4 border-l-yellow-500 border-l-4 p-4">
			<h1 className="text-[1.2rem] sm:text-[1.8rem] md:text-[2rem] font-bold tracking-wider">
				{title}
			</h1>
		</div>
	);
};
