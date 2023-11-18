import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUsersProfile } from './AccountSlice';
import './UserData.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
		<div className="dark font_itim">
			<ToastContainer />
			{editable ? (
				<div id="updateDataContainer">
					<span style={{ color: 'red' }}>{error}</span>
					<form id="userDataForm" onSubmit={handleUpdateSubmit}>
						<div id="dataEditTitle">Data Edit</div>
						<div id="fAndLNameContainer">
							<div className="couple">
								<label htmlFor="firstName-input" className="form-label lbl">
									First name
								</label>
								<input
									type="text"
									className="form-control input"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									id="firstName-input"
									name="firstName-input"
									required
								/>
							</div>
							<div className="couple">
								<label htmlFor="lastName-input" className="form-label lbl">
									Last name
								</label>
								<input
									type="text"
									className="form-control input"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									id="lastName-input"
									name="lastName-input"
									required
								/>
							</div>
						</div>
						<div>
							<label className="radio-right ">
								<input
									id="userGender"
									type="radio"
									value="MALE"
									checked={gender === 'MALE'}
									onChange={(e) => setGender(e.target.value)}
								/>
								Male
							</label>
							<label className="radio-right ">
								<input
									type="radio"
									value="FEMALE"
									checked={gender === 'FEMALE'}
									onChange={(e) => setGender(e.target.value)}
								/>
								Female
							</label>
							<label className="radio-right ">
								<input
									type="radio"
									value="DIVERSE"
									checked={gender === 'DIVERSE'}
									onChange={(e) => setGender(e.target.value)}
								/>
								Diverse
							</label>
						</div>
						<div id="dAEInputContainer">
							<div className="couple">
								<label htmlFor="dateOfBirth-input" className="form-label lbl">
									Date of Birth
								</label>
								<input
									type="date"
									value={dateOfBirth}
									onChange={(e) => setDateOfBirth(e.target.value)}
									className="form-control input date_width"
									name="dateOfBirth-input"
									id="dateOfBirth-input"
									required
								/>
							</div>
							<div className="couple">
								<label htmlFor="email-input" className="form-label lbl">
									Email
								</label>
								<input
									type="email"
									className="form-control input"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									name="email-input"
									id="email-input"
									required
								/>
							</div>
						</div>

						<div className="couple">
							<label htmlFor="address-input" className="form-label lbl">
								Address
							</label>
							<input
								type="text"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								className="form-control input"
								id="address-input"
								name="address-input"
								required
							/>
						</div>
						<div id="pACInputContainer">
							<div className="couple">
								<label htmlFor="postcode-input" className="form-label lbl">
									Postcode
								</label>
								<input
									type="text"
									value={postcode}
									onChange={(e) => setPostcode(e.target.value)}
									className="form-control input"
									id="postcode-input"
									name="postcode-input"
									required
								/>
							</div>

							<div className="couple">
								<label htmlFor="city-input" className="form-label lbl">
									City
								</label>
								<input
									type="text"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									className="form-control input"
									id="city-input"
									name="city-input"
									required
								/>
							</div>
						</div>

						<div className="couple">
							<label htmlFor="phone-input" className="form-label lbl">
								Phone
							</label>
							<input
								type="text"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className="form-control input"
								id="phone-input"
								name="phone-input"
							/>
						</div>

						<button type="submit" className="btn_blue btn bpn-padding mrg">
							Save Data
						</button>
					</form>
				</div>
			) : (
				<div>
					<div id="MyDataTitle">My data</div>
					<div className="flex">
						<div className="form-control input-imit">Name: {firstName}</div>
						<div className="form-control input-imit">Last name: {lastName}</div>
					</div>
					<div className="form-control input-imit">Gender: {gender}</div>
					<div className="flex">
						<div className="form-control input-imit">
							Birthday:
							{new Date(dateOfBirth).toLocaleDateString()}
						</div>
						<div className="form-control input-imit">Email: {email}</div>
					</div>
					<div className="flex">
						<div className="form-control input-imit">Address: {address}</div>
						<div className="form-control input-imit">
							{' '}
							Postcode, city:
							{postcode}, {city}
						</div>
					</div>
					<div className="form-control input-imit">Phone: {phone}</div>
					<div className="flex">
						<button onClick={handleEditClick} className="btn_blue btn bpn-padding dark editDataBtn">
							Edit Data
						</button>

						<button type="button" className="btn btn_blue bpn-padding dark editDataBtn">
							Change Password
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
