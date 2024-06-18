import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../store/reducers/basketSlice';

const Basket = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.basket);

    setInterval(() => {
        console.log(products);
    }, 3000);
    return (
        <div>   
            {products.length ? 
                <div className="w-full flex flex-col p-5">
                    {products.map(product => 
                        <div 
                            key={product.id} 
                            className="flex flex-row justify-between 
                            border border-spacing-3 border-white bg-zinc-900 text-white mb-5 p-5"
                        >
                            <div className="flex flex-col gap-2">
                                <p className="text-xl">
                                    {product.name}
                                </p>
                                <span className="text-xl text-gray-500">
                                    ${product.price}
                                </span>
                                <button 
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    onClick={() => {
                                        dispatch(removeProduct(product.id))
                                    }}
                                >
                                    Delete 
                                </button>
                            </div>
                            <img 
                                src={process.env.REACT_APP_API_URL + product.img} 
                                className="inline-block max-h-20"
                            />
                        </div>
                    )}
                </div>
                :
                <div className="p-5 flex justify-center items-center mx-auto">
                    No products yet
                </div>
            }
        </div>
    )
}
export default Basket;