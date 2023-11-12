import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/selectors';
import './sidepanel.css';

function Sidepanel(): JSX.Element {
	const user = useAppSelector(selectUser);
	return (
		<div id="sidePanelContainer" className="bg_blue dark">
			{user && (
				<div className="dark">
					<div>
						<NavLink to="/profile/my_data">My data</NavLink>
					</div>

					{user.role === 'USER' && (
						<>
							<div>
								<NavLink to="/profile/children">My children</NavLink>
							</div>
							<div>
								<NavLink to="/profile/kindergartens">Find kindergartens</NavLink>
							</div>
							<div>
								<NavLink to="/profile/favorites">My favorites</NavLink>
							</div>
							<div>
								<NavLink to="/profile/u_requests">My requests</NavLink>
							</div>
						</>
					)}
					{user.role === 'MANAGER' && (
						<>
							<div>
								<NavLink to="/profile/kindergarten">My Kindergarten</NavLink>
							</div>
							<div>
								<span>Requests</span>
							</div>
							<div>
								<NavLink to="/profile/m_requests/confirmed">Confirmed</NavLink>
							</div>
							<div>
								<NavLink to="/profile/m_requests/in_process">In Process</NavLink>
							</div>
						</>
					)}
					<div>
						<NavLink to="/profile/dialogues/1">Dialogues</NavLink>
					</div>
				</div>
			)}
		</div>
	);
}
export default Sidepanel;
