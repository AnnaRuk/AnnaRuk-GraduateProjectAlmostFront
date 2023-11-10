import { useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { selectUser } from '../../features/auth/selectors';
import '../../basic_styles/styles.css';
import './header.css';

export default function Header(): JSX.Element {
	return (
		<>
			<nav>
				<header>
					<div id="headerContainer">
						<div id="logoContainer" className="bg_blue">
							<NavLink to="/">
								<img id="logo" src="src\images\Logo.png" alt="logoImg" />
							</NavLink>
						</div>
						<div id="kAVContainer" className="bg_blue blind">
							<NavLink to="/">
								<button id="allKitasBtn" className="bg_green dark font_itim">
									All kindergartens
								</button>
							</NavLink>
						</div>
					</div>
				</header>
			</nav>
		</>
	);
}
