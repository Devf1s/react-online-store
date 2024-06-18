import React, { useState } from 'react';
import { createType } from '../../http/deviceAPI';

const TypeModal = ({ isOpen, hideModal }) => {
	const [value, setValue] = useState('');
	
	const addType = () => {
		createType({ name: value }).then(() => {
			setValue(''); // clear input
			hideModal(); // close modal
			alert('Type created successfully!');
		});
	}

	return (
		<>
			{isOpen && <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full flex flex-col justify-center items-center">
				<div className="relative w-full max-w-md max-h-full mx-auto my-8">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl font-medium text-gray-900 dark:text-white">
								Add Type
							</h3>
							<button
								onClick={hideModal}
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" type="button">
								<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						<div className="p-4 md:p-5 space-y-4">
							<input 
								type="text" 
								name="name" 
								id="name" 
								value={value}
								onChange={(e) => setValue(e.target.value)}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
								placeholder="Enter type name" 
							/>
						</div>
						<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={addType}
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Add type
							</button>
							<button
								onClick={hideModal}
								className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>}
		</>
	)
}
export default TypeModal;