import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/selectors';

function Sidepanel(): JSX.Element {
	const user = useAppSelector(selectUser);
	return (
		<div>
			{user && (
				<div>
					<h3>SIDE panel</h3>
					<NavLink to="/userData">My data</NavLink>
					<NavLink to="/dialogues">My dialogues</NavLink>
					{user.role === 'USER' && (
						<>
							<NavLink to="/children">My children</NavLink>
							<span>All Kindergartens</span>
							<NavLink to="/allKindergartens">Find kindergartens</NavLink>
							<NavLink to="/favorites">My favorites Kindergartens</NavLink>
							<NavLink to="/requests">My requests</NavLink>
						</>
					)}
					{user.role === 'MANAGER' && (
						<>
							<NavLink to="/managerKindergarten">Controlled Kindergarten</NavLink>
							<span>Requests</span>
							<NavLink to="/requests">Requests</NavLink>
							<NavLink to="/processRequests">Processed requests</NavLink>
							<NavLink to="/confirmedRequests">Confirmed requests</NavLink>
						</>
					)}
				</div>
			)}
		</div>
	);
}
export default Sidepanel;
