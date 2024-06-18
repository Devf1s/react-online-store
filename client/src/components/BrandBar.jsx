import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deviceActions } from '../store/reducers/deviceSlice';

const Brand = () => {
	const dispatch = useDispatch();
	const { brands, selectedBrand } = useSelector((state) => state.device);
	const { setSelectedBrand } = deviceActions;
	
	return (
		<div className="flex flex-col md:flex-row gap-5 mb-5">
			{brands.map(brand => (
				<div 
					key={brand.id} 
					className={`w-full md:w-3/12 p-3 border cursor-pointer text-center transition duration-75 ${brand.id === selectedBrand.id ? ' border-red-500' : 'border-transparent'}`}
					onClick={() => dispatch(setSelectedBrand(brand))}
				>
					{brand.name}
				</div>
			))}
		</div>
	)
}
export default Brand;