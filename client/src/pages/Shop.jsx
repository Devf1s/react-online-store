import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deviceActions } from '../store/reducers/deviceSlice';
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pagination from '../components/Pagination';

const Shop = () => {
    const dispatch = useDispatch();
    const { selectedType, selectedBrand, devices, page, limit, totalCount } = useSelector(state => state.device);
    const { setTotalCount, setPage, setBrands, setDevices, setTypes } = deviceActions;
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];
    
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    const handlePage = (page) => {
        dispatch(setPage(page));
    }

    useEffect(() => {
        fetchTypes().then(data => dispatch(setTypes(data)));
        fetchBrands().then(data => dispatch(setBrands(data)));
        fetchDevices().then(data => {
            dispatch(setDevices(data.rows));
            dispatch(setTotalCount(data.count));
        });
    }, []);

    useEffect(() => {
        fetchDevices(selectedType.id, selectedBrand.id, page, limit).then(data => {
            dispatch(setDevices(data.rows));
            dispatch(setTotalCount(data.count));
        });
    }, [page, selectedType, selectedBrand]);
    
    return (
        <div className="p-5">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4">
                    <TypeBar />
                </div>
                <div className="w-full md:w-3/4">
                    <BrandBar />
                    <DeviceList />
                </div>
            </div>
            {devices.length ? 
                <Pagination 
                    pages={pages} 
                    active={page} 
                    setActive={handlePage}
                />
                :
                <div className='flex justify-center items-center text-3xl'>
                    No products
                </div>
            }
        </div>
    )
}
export default Shop;