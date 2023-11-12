import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Child from './types/Child';
import { addChildren, updateChildren } from './ChildrenSlice';
import { NavLink } from 'react-router-dom';

export default function EditChildrenForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const [error, setError] = useState<string>('');
	const [editable, setEditable] = useState(false);
	const [newChildFirstName, setNewChildFirstName] = useState<string>('');
	const [newChildLastName, setNewChildLastName] = useState<string>('');
	const [newChildDateOfBirth, setNewChildDateOfBirth] = useState<string>('');
	const [newChildGender, setNewChildGender] = useState<string>('');

	const children = useAppSelector((state) => state.children.children);

	const handleEditClick = (id: number): void => {
		setEditable(true);
	};

	function handleAddNewChildSaveSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		dispatch(
			addChildren({
				firstName: newChildFirstName,
				lastName: newChildLastName,
				dateOfBirth: newChildDateOfBirth,
				gender: newChildGender,
			})
		);
		setNewChildFirstName('');
		setNewChildLastName('');
		setNewChildDateOfBirth('');
		setNewChildGender('');
	}

	return (
		<div>
			<div>
				<nav>
					<NavLink to="/profile/children">Back</NavLink>
				</nav>
				<form onSubmit={handleAddNewChildSaveSubmit}>
					<input
						type="text"
						value={newChildFirstName}
						onChange={(e) => setNewChildFirstName(e.target.value)}
						required
					/>
					<input
						type="text"
						value={newChildLastName}
						onChange={(e) => setNewChildLastName(e.target.value)}
						required
					/>
					<input
						type="date"
						value={newChildDateOfBirth}
						onChange={(e) => setNewChildDateOfBirth(e.target.value)}
						required
					/>
					<div>
						<label>
							<input
								type="radio"
								value="MALE"
								checked={newChildGender === 'MALE'}
								onChange={(e) => setNewChildGender(e.target.value)}
							/>
							Male
						</label>
						<label>
							<input
								type="radio"
								value="FEMALE"
								checked={newChildGender === 'FEMALE'}
								onChange={(e) => setNewChildGender(e.target.value)}
							/>
							Female
						</label>
						<label>
							<input
								type="radio"
								value="DIVERSE"
								checked={newChildGender === 'DIVERSE'}
								onChange={(e) => setNewChildGender(e.target.value)}
							/>
							Diverse
						</label>
					</div>

					<button type="submit">Save</button>
				</form>
			</div>
		</div>
	);
}
