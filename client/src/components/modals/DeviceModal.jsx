import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deviceActions } from '../../store/reducers/deviceSlice';
import { fetchTypes, fetchBrands, createDevice } from '../../http/deviceAPI';

const DeviceModal = ({ isOpen, hideModal }) => {
	const dispatch = useDispatch();
	const { types, brands, selectedType, selectedBrand } = useSelector((state) => state.device);
	const { setSelectedType, setSelectedBrand, setTypes, setBrands } = deviceActions;
	
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [file, setFile] = useState(null);
	const [info, setInfo] = useState([]);

	useEffect(() => {
        fetchTypes().then(data => dispatch(setTypes(data)));
        fetchBrands().then(data => dispatch(setBrands(data)));
    }, []);

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }]);
	}

	const removeInfo = (number) => {
		setInfo(info.filter(i => i.number !== number));
	}

	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
	}

	const addSelectedType = (name) => {
		const selectedType = types.find(type => type.name === name);
		dispatch(setSelectedType(selectedType));
	}

	const addSelectedBrand = (name) => {
		const selectedBrand = brands.find(brand => brand.name === name);
		dispatch(setSelectedBrand(selectedBrand));
	}

	const addDevice = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', price);
		formData.append('img', file);
		formData.append('typeId', selectedType.id);
		formData.append('brandId', selectedBrand.id);
		formData.append('info', JSON.stringify(info));

		createDevice(formData).then(() => {
			const form = document.getElementById('deviceForm'); 
			form.reset(); // clear form
			hideModal(); // close modal
			alert('Device created successfully!');
		}).catch(error => alert(error.response.data.message));
	}

	return (
		<>
			{isOpen && <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full flex flex-col justify-center items-center">
				<div className="relative w-full max-w-md max-h-full mx-auto my-8">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl font-medium text-gray-900 dark:text-white">
								Add Device
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
							<form className="p-3 md:p-4" id="deviceForm">
								<div className="grid gap-4 grid-cols-2">
									<div className="col-span-2">
										<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Device name</label>
										<input 
											type="text" 
											name="name" 
											id="name"
											value={name}
											onChange={(e) => setName(e.target.value)} 
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
											placeholder="Type device name" 
										/>
									</div>
									<div className="col-span-2 sm:col-span-1">
										<label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
										<input 
											type="number" 
											name="price" 
											id="price"
											value={price}
											onChange={(e) => setPrice(Number(e.target.value))} 
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
											placeholder="$2999" 
										/>
									</div>
									<div className="col-span-2 sm:col-span-1">
										<label htmlFor="image" className="block text-sm font-medium text-gray-900 dark:text-white">
											<p className="mb-2 ">Image</p>
											<input 
												type="file" 
												accept="image/*" 
												id="image" 
												name="image" 
												className="hidden" 
												onChange={(e) => setFile(e.target.files[0])} 
											/>
											<div className="cursor-pointer inline-block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">Select file</div>
										</label>
									</div>
									<div className="col-span-2 sm:col-span-1">
										<label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
										<select 
											id="type" 
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											onChange={(e) => addSelectedType(e.target.value)}
										>
											<option defaultValue="">Select type</option>
											{types.map(type =>
												<option 
													key={type.id} 
													value={type.name}	
												>
													{type.name}
												</option>
											)}
										</select>
									</div>
									<div className="col-span-2 sm:col-span-1">
										<label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
										<select 
											id="category" 
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											onChange={(e) => addSelectedBrand(e.target.value)}
										>
											<option defaultValue="">Select brand</option>
											{brands.map(brand =>
												<option 
													key={brand.id} 
													value={brand.name}
												>
													{brand.name}
												</option>
											)}
										</select>
									</div>
									<div className="col-span-2">
										<button
											type="button"
											className="my-2 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
											onClick={addInfo}
										>
											<svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
											Add description
										</button>
										{info.map(item =>
											<div key={item.number} className="flex col-span-2 mt-3.5 gap-3">
												<input 
													type="text"
													value={item.title}
													onChange={(e) => changeInfo('title', e.target.value, item.number)} 
													className="block p-2 w-full h-10 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
													placeholder="Name"
												/>
												<input 
													type="text"
													value={item.description}
													onChange={(e) => changeInfo('description', e.target.value, item.number)} 
													className="block p-2 w-full h-10 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
													placeholder="Description"
												/>
												<button
													onClick={() => removeInfo(item.number)}
													className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
												>
													Delete
												</button>
											</div>
										)}
									</div>
								</div>
							</form>
						</div>
						<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={addDevice}
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Add device
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
export default DeviceModal;