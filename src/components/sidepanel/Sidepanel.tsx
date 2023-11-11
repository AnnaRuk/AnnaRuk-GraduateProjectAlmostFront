import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/selectors';

function Sidepanel(): JSX.Element {
	const user = useAppSelector(selectUser);
	return (
		<div>
		{/* TODO ternar */}
			{user && (
				<div>
					<h3>SIDE panel</h3>
					<NavLink to="/userDataForm">My data</NavLink>
					<NavLink to="/dialogues">My dialogues</NavLink>
					{user.role === 'USER' && (
						<>
							<NavLink to="/childrenForm">My children</NavLink>
							<span>All Kindergartens</span>
							<NavLink to="/kindergartens">Find kindergartens</NavLink>
							<NavLink to="/favorites">My favorites Kindergartens</NavLink>
							<NavLink to="/userRequests">My requests</NavLink>
						</>
					)}
					{user.role === 'MANAGER' && (
						<>
							<NavLink to="/kindergartenForm">Controlled Kindergarten</NavLink>
							<span>Requests</span>
							<NavLink to="/managerRequests">Confirmed Requests</NavLink>
							<NavLink to="/managerNotConfirmedRequests">NOT Confirmed Requests</NavLink>
						
						</>
					)}
				</div>
			)}
		</div>
	);
}
export default Sidepanel;
