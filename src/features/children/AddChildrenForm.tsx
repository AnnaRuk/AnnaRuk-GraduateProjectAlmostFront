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
		<div id="cAddContainer" className="font_itim dark">
			<div id="backATitleContainer">
				<nav>
					<NavLink to="/profile/children">
						<button id="cBackBtn" className="btn_blue btn bpn-padding">
							Go Back
						</button>
					</NavLink>
				</nav>
				<div id="addChildTitle">Adding a Child</div>
			</div>
			<div id="cAddFormContainer">
				<form onSubmit={handleAddNewChildSaveSubmit}>
					<div>
						<label htmlFor="cNewFirstName-input" className="form-label lbl">
							First name
						</label>
						<input
							type="text"
							value={newChildFirstName}
							onChange={(e) => setNewChildFirstName(e.target.value)}
							className="form-control input"
							id="cNewFirstName-input"
							name="cNewFirstName-input"
							required
						/>
					</div>
					<div>
						<label htmlFor="cNewLastName-input" className="form-label lbl">
							Last name
						</label>
						<input
							type="text"
							value={newChildLastName}
							onChange={(e) => setNewChildLastName(e.target.value)}
							className="form-control input"
							id="cNewLastName-input"
							name="cNewLastName-input"
							required
						/>
					</div>
					<div>
						<label htmlFor="cNewDateOfBirth-input" className="form-label lbl">
							Date of Birth
						</label>
						<input
							type="date"
							value={newChildDateOfBirth}
							onChange={(e) => setNewChildDateOfBirth(e.target.value)}
							className="form-control input"
							id="cNewDateOfBirth-input"
							name="cNewDateOfBirth-input"
							required
						/>
					</div>

					<div>
						<label className="radio-right">
							<input
								type="radio"
								value="MALE"
								checked={newChildGender === 'MALE'}
								onChange={(e) => setNewChildGender(e.target.value)}
							/>
							Male
						</label>
						<label className="radio-right">
							<input
								type="radio"
								value="FEMALE"
								checked={newChildGender === 'FEMALE'}
								onChange={(e) => setNewChildGender(e.target.value)}
							/>
							Female
						</label>
						<label className="radio-right">
							<input
								type="radio"
								value="DIVERSE"
								checked={newChildGender === 'DIVERSE'}
								onChange={(e) => setNewChildGender(e.target.value)}
							/>
							Diverse
						</label>
					</div>

					<button id="saveNewChildBtn" className="btn_blue btn bpn-padding" type="submit">
						Save
					</button>
				</form>
			</div>
		</div>
	);
}
