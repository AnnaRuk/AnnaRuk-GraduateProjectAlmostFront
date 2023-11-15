import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Child from './types/Child';
import { addChildren, updateChildren } from './ChildrenSlice';
import AddChildrenForm from './AddChildrenForm';
import { NavLink, Route } from 'react-router-dom';
import Switch from '@mui/material/Switch/Switch';
import EditIcon from '@mui/icons-material/Edit';
import './children.css';

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
		<div className="font_itim dark">
			<div id="childrenTitle">My Children</div>
			<div id="cAllContainer">
				<div id="cAAddContainer">
					{children?.length > 0 ? (
						<div>
							{children.map((ch) => (
								<div key={ch.id} id={`cDataContainer${ch.id}`} className="childContainer">
									<div className="flex">
										<div className="form-control input-imit childWith">{ch.firstName}</div>
										<div className="form-control input-imit childWith">{ch.lastName}</div>
									</div>
									<div className="form-control input-imit">
										{new Date(ch.dateOfBirth).toLocaleDateString()}
									</div>
									<div className="form-control input-imit">{ch.gender}</div>
									<div>
										<EditIcon
											id={`cEditBtn${ch.id}`}
											className="cEditBtn"
											type="button"
											onClick={() => handleEditClick(ch.id)}
										></EditIcon>
									</div>
								</div>
							))}
						</div>
					) : (
						<div id="noChildren">{`There is no added Children's data yet.`}</div>
					)}
					<NavLink to="/profile/children/addChild">
						<button id="addChildBtn" className="btn_blue btn bpn-padding">
							Add a Child
						</button>
					</NavLink>
				</div>
				{editable && (
					<div id="childEditFormContainer">
						<form onSubmit={handleSaveChanges}>
							<div>
								<div className="couple1">
									<label htmlFor="kFirstName-input" className="form-label lbl">
										First name
									</label>
									<input
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className="form-control input"
										id="kFirstName-input"
										name="kFirstName-input"
										required
									/>
								</div>
								<div className="couple1">
									<label htmlFor="kLastName-input" className="form-label lbl">
										Last name
									</label>
									<input
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className="form-control input"
										id="kLastName-input"
										name="kLastName-input"
										required
									/>
								</div>
								<div className="couple1">
									<label htmlFor="kDateOfBirth-input" className="form-label lbl">
										Date of Birth
									</label>
									<input
										type="date"
										value={dateOfBirth}
										onChange={(e) => setDateOfBirth(e.target.value)}
										className="form-control input"
										id="kDateOfBirth-input"
										name="kDateOfBirth-input"
										required
									/>
								</div>
								<div>
									<label className="radio-right">
										<input
											type="radio"
											value="MALE"
											checked={gender === 'MALE'}
											onChange={(e) => setGender(e.target.value)}
										/>
										Male
									</label>
									<label className="radio-right">
										<input
											type="radio"
											value="FEMALE"
											checked={gender === 'FEMALE'}
											onChange={(e) => setGender(e.target.value)}
										/>
										Female
									</label>
									<label className="radio-right">
										<input
											type="radio"
											value="DIVERSE"
											checked={gender === 'DIVERSE'}
											onChange={(e) => setGender(e.target.value)}
										/>
										Diverse
									</label>
								</div>

								<button id="cSaveDataBtn" className="btn_blue btn bpn-padding" type="submit">
									Save Changes
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
}
