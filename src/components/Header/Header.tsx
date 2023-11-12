import { useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { selectUser } from '../../features/auth/selectors';
import '../../basic_styles/styles.css';
import './header.css';

export default function Header(): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);

	const handleLogout = useCallback(
		async (event: React.MouseEvent) => {
			event.preventDefault();
			const dispatchResult = await dispatch(logout());
			if (logout.fulfilled.match(dispatchResult)) {
				navigate('/');
			}
		},
		[dispatch, navigate]
	);
	return (
		<>
			<nav>
				<header id="header" className="bg_blue">
					<div id="headerContainer">
						<div id="logoContainer" className="bg_blue">
							<NavLink to="/">
								<img id="logo" src="src\images\Logo.png" alt="logoImg" />
							</NavLink>
						</div>
						<div id="kAVContainer">
							<NavLink to="/kindergartens">
								<button id="allKitasBtn" className="bg_green dark font_itim btn_green leftBtn">
									All kindergartens
								</button>
							</NavLink>
							<NavLink to="/voucher">
								<button id="voucherBtn" className="bg_green dark font_itim btn_green rightBtn ">
									About voucher
								</button>
							</NavLink>
						</div>
						<div id="accountContainer">
							{!user ? (
								<div id="accountNoNameContainer">
									<NavLink to="/auth/login">
										<button id="signInBtn" className="bg_green dark font_itim btn_green leftBtn">
											Sign In
										</button>
									</NavLink>
									<NavLink to="/auth/register">
										<button id="signOutBtn" className="bg_green dark font_itim btn_green rightBtn ">
											Sign Up
										</button>
									</NavLink>
								</div>
							) : (
								<div id="accountNameContainer">
									<div className="green font_itim userName">
										Hi, {user.firstName} {user.lastName} !
									</div>
									<div id="accountBtnContainer">
										<NavLink to="/profile">
											<button
												id="myAccountBtn"
												className="bg_green dark font_itim btn_green leftBtn"
											>
												My Account
											</button>
										</NavLink>
										<NavLink to="" onClick={handleLogout}>
											<button
												id="signOutBtn"
												className="bg_green dark font_itim btn_green rightBtn "
											>
												Sign Out
											</button>
										</NavLink>
									</div>
								</div>
							)}
						</div>
					</div>
				</header>
			</nav>
		</>
	);
}
