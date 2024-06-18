import React, { useState } from 'react';
import TypeModal from '../components/modals/TypeModal';
import BrandModal from '../components/modals/BrandModal';
import DeviceModal from '../components/modals/DeviceModal';

const Admin = () => {
    const [typeIsOpen, setTypeIsOpen] = useState(false);
    const [brandIsOpen, setBrandIsOpen] = useState(false);
    const [deviceIsOpen, setDeviceIsOpen] = useState(false);

    return (
        <div className="w-full flex flex-col mt-10 gap-5">
            <button
                onClick={() => setTypeIsOpen(true)} 
                className="min-w-80 block bg-blue-500 text-white mx-auto py-3 px-4 text-center hover:bg-blue-600 active:text-gray-300 transition duration-150 ease-out"
            >
                Add Type
            </button>
            <button
                onClick={() => setBrandIsOpen(true)} 
                className="min-w-80 block bg-blue-500 text-white mx-auto py-3 px-4 text-center hover:bg-blue-600 active:text-gray-300 transition duration-150 ease-out"
            >
                Add Brand
            </button>
            <button
                onClick={() => setDeviceIsOpen(true)} 
                className="min-w-80 block bg-blue-500 text-white mx-auto py-3 px-4 text-center hover:bg-blue-600 active:text-gray-300 transition duration-150 ease-out"
            >
                Add Device
            </button>

            <TypeModal isOpen={typeIsOpen} hideModal={() => setTypeIsOpen(false)} />
            <BrandModal isOpen={brandIsOpen} hideModal={() => setBrandIsOpen(false)} />
            <DeviceModal isOpen={deviceIsOpen} hideModal={() => setDeviceIsOpen(false)} />
        </div>
    )
}
export default Admin;