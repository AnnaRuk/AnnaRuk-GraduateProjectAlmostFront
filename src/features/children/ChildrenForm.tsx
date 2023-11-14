import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Child from './types/Child';
import { addChildren, updateChildren } from './ChildrenSlice';
import AddChildrenForm from './AddChildrenForm';
import { NavLink, Route } from 'react-router-dom';
import Switch from '@mui/material/Switch/Switch';
import EditIcon from '@mui/icons-material/Edit';

export default function ChildrenForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const [error, setError] = useState<string>('');
	const [editable, setEditable] = useState(false);
	const [editChild, setEditChild] = useState<Child | null>(null);

	const [firstName, setFirstName] = useState(editChild?.firstName || '');
	const [lastName, setLastName] = useState(editChild?.lastName || '');
	const [dateOfBirth, setDateOfBirth] = useState(editChild?.dateOfBirth || '');
	const [gender, setGender] = useState(editChild?.gender || '');

	const children = useAppSelector((state) => state.children.children);

	const handleEditClick = (id: number): void => {
		const child: Child = children.find((ch) => ch.id === id);
		if (child) {
			setEditable(true);
			setEditChild(child);
			setFirstName(child.firstName);
			setLastName(child.lastName);
			setDateOfBirth(child.dateOfBirth);
			setGender(child.gender || '');
		}
	};

	const handleSaveChanges = (): void => {
		if (editChild) {
			setEditable(false);
			dispatch(
				updateChildren({
					id: editChild.id,
					firstName,
					lastName,
					dateOfBirth,
					gender,
				})
			);
			setEditChild(null);
		}
	};

	return (
		<div>
			<div>
				<h3>CHILDREN</h3>
				<ul>
					{children.map((ch) => (
						<li key={ch.id}>
							{ch.firstName} {ch.lastName} {new Date(ch.dateOfBirth).toLocaleDateString()}{' '}
							{ch.gender}
							<EditIcon type="button" onClick={() => handleEditClick(ch.id)}>
								Edit
							</EditIcon>
						</li>
					))}
				</ul>
			</div>
			{editable && (
				<div>
					<form onSubmit={handleSaveChanges}>
						<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
						<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
						<input
							type="date"
							value={dateOfBirth}
							onChange={(e) => setDateOfBirth(e.target.value)}
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
						</div>

						<button type="submit">Save Changes</button>
					</form>
				</div>
			)}

			<NavLink to="/profile/children/addChild">Add a child</NavLink>
		</div>
	);
}
