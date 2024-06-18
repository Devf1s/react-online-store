import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '../store/reducers/userSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLogin = useLocation().pathname === LOGIN_ROUTE;

    const handleSubmit = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            dispatch(setUser(data));
            dispatch(setIsAuth(true));
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-full max-w-md bg-gray-900 shadow-md rounded p-8">
                <h2 className="text-2xl mb-4 text-center text-gray-200">
                    {isLogin ? 'Authorization' : 'Registration'}
                </h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {isLogin ?
                            <p className="text-gray-400 text-sm">
                                Don't have an account? <NavLink to={REGISTRATION_ROUTE} className="text-blue-500 hover:text-blue-700">Register</NavLink>
                            </p>
                            :
                            <p className="text-gray-400 text-sm">
                                Do you have an account? <NavLink to={LOGIN_ROUTE} className="text-blue-500 hover:text-blue-700">Log in</NavLink>
                            </p>
                        }
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleSubmit()}
                        >
                            {isLogin ? 'Log in' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Auth;