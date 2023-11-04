import { useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { selectUser } from '../../features/auth/selectors';

function Navbar(): JSX.Element {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);

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
			{!user ? (
				<>
					{/* ALL */}
					<div>
						<span>LOGO</span>
						<NavLink to="/allKindergartens">All Kindergartens</NavLink>
						<span>About VOUCHER</span>
						<NavLink to="/auth/login">Sign In</NavLink>
						<NavLink to="/auth/register">Sign Up</NavLink>
					</div>
				</>
			) : location.pathname === '/' ? (
				//  HomePage auth
				<>
					<span>Hi, {user.firstName}</span>
					<>
						{user.role === 'USER' ? (
							// USER
							<>
								<NavLink to="/userAccount">Your Account</NavLink>
							</>
						) : (
							// MANAGER
							<>
								<NavLink to="/managerAccount">Your Account</NavLink>
							</>
						)}
					</>
				</>
			) : (
				// auth other pages
				<NavLink to="/">Home</NavLink>
			)}
			{user && (
				<NavLink to="" onClick={handleLogout}>
					Sign Out
				</NavLink>
			)}
		</nav>
	);
}

export default Navbar;
