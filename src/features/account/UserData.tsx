import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addChild } from '../children/ChildrenSlice';
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

	//TODO validation

	const handleEditClick = (): void => {
		setEditable(true);
	};

	function handleUpdateSubmit(e: FormEvent<HTMLFormElement>): void {
		if (validateInputs()) {
			setEditable(false);
			dispatch(
				updateUsersProfile({
					id: user.id,
					email,
					role,
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
				<input
					type="text"
					id="userFirstName"
					placeholder="first name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<input
					type="text"
					id="userLastName"
					placeholder="last name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<input
					type="text"
					id="userEmail"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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

				<input
					type="date"
					id="childDateOfBirth"
					placeholder="date of birth"
					value={dateOfBirth}
					onChange={(e) => setDateOfBirth(e.target.value)}
				/>
				<input
					type="text"
					id="userPostCode"
					placeholder="postCode"
					value={postcode}
					onChange={(e) => setPostcode(e.target.value)}
				/>

				<input
					type="text"
					id="userAddress"
					placeholder="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<input
					type="text"
					id="userCity"
					placeholder="city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>

				<input
					type="text"
					id="userPhone"
					placeholder="phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>

				<button id="saveChildButton" type="submit">
					Save
				</button>
			</form>
			</div>
			):(
				<div>
<h3>My Kindergarden</h3>
					<p> {title}</p>
					<p> {city}</p>
					<p> {address}</p>
					<p> {postcode}</p>
					<p> {description}</p>
					<p> {capacity}</p>
					<a href={linkImg}></a>
					<p> {controlKindergarten?.phone}</p>
					<button onClick={handleEditClick}>Edit</button>
				</div>



			)}
		</div>

	);
}
