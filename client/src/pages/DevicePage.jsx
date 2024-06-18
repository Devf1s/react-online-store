import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import star from '../assets/star.svg';
import { addProduct } from '../store/reducers/basketSlice';

const DevicePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [device, setDevice] = useState({ info: [] });

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, []);

    return (
        <div className="p-5 flex flex-col">
            <div className="w-full flex md:flex-row flex-wrap justify-between gap-5">
                <div className="w-full md:max-w-xs">
                    <img src={process.env.REACT_APP_API_URL + device.img} alt="Device" />
                </div>
                <div className="w-full md:max-w-xs flex flex-col m-auto gap-5 text-center">
                    <h2 className="text-3xl font-bold text-white">
                        {device.name}
                    </h2>
                    <div className="flex flex-col align-center gap-2 text-3xl font-normal text-slate-600">
                        <img src={star} alt="Star" className="" />
                        {device.price}
                    </div>
                </div>
                <div className="w-full md:max-w-xs text-center">
                    <p className="border border-gray-700 border-b-none p-2">${device.price}</p>
                    <button 
                        onClick={() => dispatch(addProduct(device))}
                        className="w-full border border-gray-50 p-3 text-2xl hover:bg-white hover:text-black transition duration-100 ease"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mt-12 pl-2 flex flex-col">
                <h2 className="text-4xl font-bold mb-3">
                    {!device.info.length ? 'No description' : 'Description'}
                </h2>   
                {device.info.map((item, index) => 
                    <div key={item.id} className={`p-4 ${index % 2 === 0 ? 'bg-gray-500' : 'bg-gray-400'}`}>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-700">{item.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default DevicePage;