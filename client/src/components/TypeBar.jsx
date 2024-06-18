import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deviceActions } from '../store/reducers/deviceSlice';

const TypeBar = () => {
	const dispatch = useDispatch();
	const { types, selectedType } = useSelector((state) => state.device);
	const { setSelectedType } = deviceActions;

	return (
		<div className="w-full max-w-52 flex flex-col gap-0 border">
			{types.map(type => (
				<div 
					key={type.id} 
					className={`border-b p-3 last:border-b-0 last:mb-0 cursor-pointer transition duration-75 ${type.id === selectedType.id ? 'bg-blue-600' : ''}`}
					onClick={() => dispatch(setSelectedType(type))}
				>
					{type.name}
				</div>
			))}
		</div>
	)
}
export default TypeBar;