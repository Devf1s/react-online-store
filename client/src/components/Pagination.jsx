import React from 'react';

const Pagination = ({ pages, active, setActive }) => {
	return (
		<nav className="flex justify-center mt-12 mx-auto">
			<ul className="flex gap-x-1 text-sm">
				<li>
					<button 
						type="button" 
						className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white select-none
						${active === pages[0] ? 'text-gray-700 bg-white pointer-events-none' : 'text-gray-500'}`}
						onClick={() => setActive(active - 1)}
					>
						Previous
					</button>
				</li>
				{pages.map(page => (
					<li key={page}>
						<button 
							type="button" 
							className={`flex items-center justify-center px-3 h-8 leading-tight transition-all duration-200 ease border select-none ${active === page ? 'bg-blue-500 border-blue-500 text-white' : 'text-gray-500 border-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
							onClick={() => setActive(page)}
						>
							{page}
						</button>
					</li>
				))}
				<li>
					<button 
						type="button" 
						className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white select-none
						${active === pages[pages.length - 1] ? 'text-gray-300 bg-white pointer-events-none' : 'text-gray-500'}`}
						onClick={() => setActive(active + 1)}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};
export default Pagination;