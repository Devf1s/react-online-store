import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = () => {
	const { isAuth } = useSelector((state) => state.user);
	
	return (
		<Routes>
			{isAuth && authRoutes.map(route =>
				<Route
					key={route.path}
					path={route.path}
					element={<route.element />}
				/>
			)}
			{publicRoutes.map(route =>
				<Route
					key={route.path}
					path={route.path}
					element={<route.element />}
				/>		
			)}
			<Route path="/*" element={<Navigate to={SHOP_ROUTE} replace />} />
		</Routes>
	)
}
export default AppRouter;