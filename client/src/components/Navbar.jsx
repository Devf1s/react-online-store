import React from 'react';
import { Disclosure } from '@headlessui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '../store/reducers/userSlice';
import { SHOP_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE } from '../utils/consts';
import ShoppingCart from './ShoppingCart';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.user);
    const url = useLocation().pathname;

    const navigation = [
        { name: 'Shop', href: SHOP_ROUTE, current: url === SHOP_ROUTE },
    ];

    const authNavigation = [
        { name: 'Shop', href: SHOP_ROUTE, current: url === SHOP_ROUTE },
        { name: 'Admin', href: ADMIN_ROUTE, current: url === ADMIN_ROUTE }
    ];

    let navList;
    navList = isAuth ? authNavigation : navigation;

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ');
    }

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(setUser({}));
        dispatch(setIsAuth(false));
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex flex-1 h-16 items-center justify-center relative">
                    <div className="flex justify-between space-x-4">
                        {navList.map(item => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        {isAuth ?
                            <button
                                className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm font-medium mr-2"
                                onClick={() => logOut()}
                            >
                                Sign Out
                            </button>
                            :
                            <NavLink
                                to={LOGIN_ROUTE}
                                className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm font-medium mr-2"
                            >
                                Sign In
                            </NavLink>
                        }
                        <ShoppingCart />
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}
export default Navbar;