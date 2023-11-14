import { useAppSelector } from '../../app/hooks';
import './profile.css';

export default function Profile(): JSX.Element {
	const user = useAppSelector((state) => state.auth.user);

	return (
		<>
			<div className="font_itim dark">
				{user?.role == 'USER' ? (
					<div>
						<div className="aTitle aMid">Dear {user.firstName}!</div>
						<div className="aText ">
							Attention! If You want to use all the functionality of the site, please fill in the
							data about You and Your Children in the appropriate menus of Your personal account!
						</div>
						<div className="aText aMid">Thank You!</div>
					</div>
				) : (
					<div>
						<div className="aTitle aMid">Dear {user.firstName}!</div>
						<div className="aText ">
							Attention! If You want to use all the functionality of the site, please fill in the
							data about You and Your Kindergarten in the appropriate menus of Your personal
							account!
						</div>
						<div className="aText aMid">Thank You!</div>
					</div>
				)}
			</div>
		</>
	);
}
