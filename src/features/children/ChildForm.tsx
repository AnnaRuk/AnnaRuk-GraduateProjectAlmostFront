import React, { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addChild } from './ChildrenSlice';

export default function ChildForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [gender, setGender] = useState<string>('');
	const [dateOfBirth, setDateOfBirth] = useState<string>('');
	const [error, setError] = useState<string>('');

	function validateInputs(): boolean {
		if (firstName.trim() === '') {
			setError('Name is empty, please enter it');
			return false;
		}
		if (lastName.trim() === '') {
			setError('Last name is empty, please enter it');
			return false;
		}
		if (gender.trim() === '') {
			setError('Gender is empty, please enter it');
			return false;
		}
		if (dateOfBirth.trim() === '') {
			setError('date of birth is empty, please select it');
			return false;
		}

		return true;
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		if (validateInputs()) {
			dispatch(addChild({ firstName, lastName, gender, dateOfBirth }));
		}
	}

	return (
		<>
			<h5>My children</h5>
			<form id="addChildForm" onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				<input
					type="text"
					id="childFirstName"
					placeholder="first name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<input
					type="text"
					id="childLastName"
					placeholder="last name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>

				<div>
					<label>
						<input
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
				<button id="saveChildButton" type="submit">
					Save
				</button>
			</form>
		</>
	);
}

// firstName: string;
// lastName: string;
// gender: string;
// dateOfBirth: string;
