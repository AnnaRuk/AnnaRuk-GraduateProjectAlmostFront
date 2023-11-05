import React, { useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { selectUser } from '../../features/auth/selectors';

function Navbar(): React.ReactElement {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const navigate = useNavigate();
	const user = useAppSelector(selectUser);

	const isUserLoggedIn = !!user;
	const isAdmin = isUserLoggedIn && user.role === 'ADMIN';

	const handleLogout = useCallback(

		async (event: React.MouseEvent) => {
			event.preventDefault();
			const dispatchResult = await dispatch(logout());
			if (logout.fulfilled.match(dispatchResult)) {
				navigate('/auth/login');
			}
		},

		[dispatch, navigate]
	);

	return (
		<nav>
			{!isUserLoggedIn ? (
				<>
					<NavLink to="/auth/login">Войти</NavLink>
					<NavLink to="/auth/register">Регистрация</NavLink>
				</>
			) : location.pathname === '/' && isAdmin ? (
				<NavLink to="/admin/tasks">Задачи всех пользователей</NavLink>
			) : location.pathname === '/' ? (
				<NavLink to="/tasks">Задачи текущего пользователя</NavLink>
			) : (
				<NavLink to="/" onClick={handleLogout}>
					На главную
				</NavLink>
			)}
			{isUserLoggedIn && (
				<NavLink to="" onClick={handleLogout}>
					Выйти
				</NavLink>
			)}
		</nav>
	);
}

export default Navbar;
