import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addChild } from './ChildrenSlice';
import Child from './types/Child';
import { updateChildren } from './api';

export default function ChildForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const [error, setError] = useState<string>('');
	const children = useAppSelector((state) => state.account.children);
	const child: Child | undefined = children![0];
	const [firstName, setFirstName] = useState(child?.firstName || '');
	const [lastName, setLastName] = useState(child?.lastName || '');
	const [gender, setGender] = useState(child?.gender || '');
	const [dateOfBirth, setDateOfBirth] = useState(child?.dateOfBirth || '');

	//TODO validation
	// function validateInputs(): boolean {
	// 	if (firstName.trim() === '') {
	// 		setError('Name is empty, please enter it');
	// 		return false;
	// 	}
	// 	if (lastName.trim() === '') {
	// 		setError('Last name is empty, please enter it');
	// 		return false;
	// 	}
	// 	if (gender.trim() === '') {
	// 		setError('Gender is empty, please enter it');
	// 		return false;
	// 	}
	// 	if (dateOfBirth.trim() === '') {
	// 		setError('date of birth is empty, please select it');
	// 		return false;
	// 	}

	// 	return true;
	// }

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		if (child) {
			dispatch(
				updateChild({
					id: child.id,
					firstName,
					lastName,
					gender,
					dateOfBirth,
				})
			);
		} else {
			dispatch(
				addChild({
					firstName,
					lastName,
					gender,
					dateOfBirth,
				})
			);
		}
	}

	return (
		<>
			<h5>My children</h5>
			{error && <p>{error}</p>}
			<form id="addChildForm" onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				<input
					type="text"
					placeholder="first name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>


				<input
					type="text"
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
					placeholder="date of birth"
					value={dateOfBirth}
					onChange={(e) => setDateOfBirth(e.target.value)}
				/>
				<button type="submit">
					Save
				</button>
			</form>
		</>
	);
}
