import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUsersProfile } from './AccountSlice';

export default function UserData(): JSX.Element {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);

	const [error, setError] = useState<string>('');
	const [editable, setEditable] = useState(false);

	const [firstName, setFirstName] = useState<string>(user?.firstName || '');
	const [lastName, setLastName] = useState<string>(user?.lastName || '');
	const [email, setEmail] = useState(user?.email || '');
	const [gender, setGender] = useState<string>(user?.gender || '');
	const [dateOfBirth, setDateOfBirth] = useState<string>(user?.dateOfBirth || '');
	const [postcode, setPostcode] = useState<string>(user?.postcode || '');
	const [address, setAddress] = useState<string>(user?.address || '');
	const [city, setCity] = useState<string>(user?.city || '');
	const [phone, setPhone] = useState<string>(user?.phone || '');

	function validateInputs(): boolean {
		if (firstName.trim() === '') {
			setError('Your name is empty, please enter it. Empty data will not be saved!');
			return false;
		}
		if (lastName.trim() === '') {
			setError('Your last name is empty, please enter it. Empty data will not be saved!');
			return false;
		}
		if (email.trim() === '') {
			setError('Your email is empty, please enter it. Empty data will not be saved!');
			return false;
		}

		return true;
	}

	const handleEditClick = (): void => {
		setEditable(true);
	};

	function handleUpdateSubmit(e: FormEvent<HTMLFormElement>): void {
		if (validateInputs()) {
			setEditable(false);
			dispatch(
				updateUsersProfile({
					email,
					firstName,
					lastName,
					postcode,
					address,
					city,
					phone,
					dateOfBirth,
					gender,
				})
			);
		}
	}

	return (
		<div>
			{editable ? (
				<div>
					<h5>My data</h5>
					<form id="userDataForm" onSubmit={handleUpdateSubmit}>
						<label>Email:</label>
						<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
						<label>first name:</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
						<label>last name:</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
						<label>postcode:</label>
						<input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
						<label>address:</label>
						<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
						<label>city:</label>
						<input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
						<label>date of birth:</label>
						<input
							type="date"
							value={dateOfBirth}
							onChange={(e) => setDateOfBirth(e.target.value)}
						/>

						<div>
							<label>
								<input
									id="userGender"
									type="radio"
									value="MALE"
									checked={gender === 'MALE'}
									onChange={(e) => setGender(e.target.value)}
								/>
								Male
							</label>
							<label>
								<input
									type="radio"
									value="FEMALE"
									checked={gender === 'FEMALE'}
									onChange={(e) => setGender(e.target.value)}
								/>
								Female
							</label>
							<label>
								<input
									type="radio"
									value="DIVERSE"
									checked={gender === 'DIVERSE'}
									onChange={(e) => setGender(e.target.value)}
								/>
								Diverse
							</label>
						</div>
						<label>phone:</label>
						<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
						<button type="submit">Save</button>
					</form>
				</div>
			) : (
				<div>
					<h3>My data</h3>
					<p> {firstName}</p>
					<p> {lastName}</p>
					<p>
						{' '}
						{address}, {city}, {postcode}{' '}
					</p>
					<p> {phone}</p>
					<p> {gender}</p>
					<p> {new Date(dateOfBirth).toLocaleDateString()}</p>
					<p> {email}</p>

					<button onClick={handleEditClick}>Edit</button>
				</div>
			)}
			<button type="button">Change password</button>
		</div>
	);
}
