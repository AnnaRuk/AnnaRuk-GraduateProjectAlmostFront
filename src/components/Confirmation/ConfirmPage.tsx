import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import User from '../../features/auth/types/User';

export default function ConfirmPage(): JSX.Element {
	const { code } = useParams<string>();

	const [userToConfirm, setUserToConfirm] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const handleConfirm = async (): Promise<void> => {
			try {
				if (code) {
					const response = await fetch(`/api/users/confirm/${code}`);
					if (!response?.ok) {
						throw new Error('Error');
					} else {
						const newUser: User = await response?.json();
						setUserToConfirm(newUser);
					}
				}
			} catch (errors) {
				setUserToConfirm(null);
				setError('Your code has expired, please contact support on the main page/Contact us');
			}
		};
		handleConfirm();
	}, [code]);

	return (
		<div className="content  dark font_itim bgContainer">
			<div className="answerContainer bg_pink">
				{userToConfirm ? (
					<div>
						{`${userToConfirm.firstName}, Your account has been successfully confirmed. Now You can Log In Your account.`}
					</div>
				) : (
					<div>{error}</div>
				)}
			</div>
		</div>
	);
}
