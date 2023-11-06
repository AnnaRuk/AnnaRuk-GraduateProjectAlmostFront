import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import selectUser from '../../features/auth/selectors';
import { addChild } from '../children/ChildrenSlice';

export default function UserData(): JSX.Element {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const [firstName, setFirstName] = useState<string>(user?.firstName);
	const [lastName, setLastName] = useState<string>(user?.lastName);
	const [email, setEmail] = useState(user?.email);
	const [gender, setGender] = useState<string>(user?.gender);
	const [dateOfBirth, setDateOfBirth] = useState<string>(user?.dateOfBirth);
	const [postCode, setPostCode] = useState<string>(user?.postCode);
	const [address, setAddress] = useState<string>(user?.address);
	const [city, setCity] = useState<string>(user?.city);
	const [phone, setPhone] = useState<string>(user?.phone);

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		dispatch(
			addChild({
				firstName,
				lastName,
				gender,
				dateOfBirth,
				email,
				postCode,
				address,
				city,
				phone,
			})
		);
	}
	if (user) {
		return (
			<>
				<h5>My data</h5>
				<form id="userDataForm" onSubmit={handleSubmit}>
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
						<label>
							<input
								type="radio"
								value="NOT_SELECTED"
								checked={gender === 'NOT_SELECTED'}
								onChange={(e) => setGender(e.target.value)}
							/>
							Not selected
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
						value={postCode}
						onChange={(e) => setPostCode(e.target.value)}
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
			</>
		);
	} else {
		return <p>Error</p>;
	}
}

// {
//   "id": 1,
//   "firstName": "Anna",
//   "lastName": "Bieliaieva",
//   "email": "user@gmail.com",
//   "role": "USER",
//   "postCode": "46446",
//   "address": "Berlinstr. 8",
//   "city": "Berlin",
//   "phone": "+495451619",
//   "dateOfBirth": "05.03.1990",
//   "gender": "MALE"
// }
