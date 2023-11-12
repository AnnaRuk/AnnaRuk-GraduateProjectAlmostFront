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
						<NavLink to="/profile/userDataForm">My data</NavLink>
					</div>

					{user.role === 'USER' && (
						<>
							<div>
								<NavLink to="/profile/childrenForm">My children</NavLink>
							</div>
							<div>
								<NavLink to="/profile/kindergartens">Find kindergartens</NavLink>
							</div>
							<div>
								<NavLink to="/profile/favorites">My favorites Kindergartens</NavLink>
							</div>
							<div>
								<NavLink to="/profile/userRequests">My requests</NavLink>
							</div>
						</>
					)}
					{user.role === 'MANAGER' && (
						<>
							<div>
								<NavLink to="/profile/kindergarten">Controlled Kindergarten</NavLink>
							</div>
							<div>
								<span>Requests</span>
							</div>
							<div>
								<NavLink to="/profile/managerRequests">Confirmed Requests</NavLink>
							</div>
							<div>
								<NavLink to="/profile/managerNotConfirmedRequests">NOT Confirmed Requests</NavLink>
							</div>
						</>
					)}
					<div>
						<NavLink to="/profile/dialogues/1">dialogue</NavLink>
					</div>
				</div>
			)}
		</div>
	);
}
export default Sidepanel;
