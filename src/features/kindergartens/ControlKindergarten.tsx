import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addControlKindergarten, updateControlKindergarten } from './KindergartensSlice';
import './ControlKindergarten.css';

export default function ControlKindergarten(): JSX.Element {
	const dispatch = useAppDispatch();
	const controlKindergarten = useAppSelector((state) => state.kindergartens.controlKindergarten);

	const [error, setError] = useState<string>('');
	const [editable, setEditable] = useState(false);

	const [title, setTitle] = useState(controlKindergarten?.title || '');
	const [address, setAddress] = useState(controlKindergarten?.address || '');
	const [postcode, setPostcode] = useState(controlKindergarten?.postcode || '');
	const [city, setCity] = useState(controlKindergarten?.city || '');
	const [description, setDescription] = useState(controlKindergarten?.description || '');
	const [linkImg, setLinkImg] = useState(controlKindergarten?.linkImg || '');
	const [capacity, setCapacity] = useState(controlKindergarten?.capacity || 0);

	function validateInputs(): boolean {
		if (title.trim() === '') {
			setError('Title is empty, please enter it. Empty data will not be saved!');
			return false;
		}
		if (address.trim() === '') {
			setError('Address is empty, please enter it. Empty data will not be saved!');
			return false;
		}
		if (postcode.trim() === '') {
			setError('Postcode is empty, please enter it. Empty data will not be saved!');
			return false;
		}
		if (city.trim() === '') {
			setError('City is empty, please enter it. Empty data will not be saved!');
			return false;
		}
		if (description.trim() === '') {
			setError('Description is empty, please enter it. Empty data will not be saved!');
			return false;
		}
		if (linkImg.trim() === '') {
			setError('Peactures is empty, please enter it. Empty data will not be saved!');
			return false;
		}
		if (capacity <= 0) {
			setError('Capacity is empty, please enter it. Empty data will not be saved!');
			return false;
		}
		return true;
	}

	const handleEditClick = (): void => {
		setEditable(true);
	};

	function handleSaveSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		if (validateInputs()) {
			setEditable(false);
			if (controlKindergarten) {
				dispatch(
					updateControlKindergarten({
						id: controlKindergarten.id,
						title,
						address,
						postcode,
						city,
						description,
						linkImg,
						capacity,
					})
				);
			} else {
				dispatch(
					addControlKindergarten({
						title,
						address,
						postcode,
						city,
						description,
						linkImg,
						capacity,
					})
				);
			}
		}
	}

	return (
		<div className="font_itim dark">
			{editable ? (
				<div>
					<h3>Edit Kindergarden data</h3>
					{error && <p>{error}</p>}
					<form onSubmit={handleSaveSubmit}>
						<label>Title:</label>
						<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
						<label>City:</label>
						<input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
						<label>Address:</label>
						<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
						<label>Postcode:</label>
						<input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
						<label>Description:</label>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<label>Capacity:</label>
						<input
							type="number"
							value={capacity}
							onChange={(e) => setCapacity(Number(e.target.value))}
						/>
						<button type="submit">Save</button>
					</form>
				</div>
			) : (
				<div>
					<div id="cKTitle">My Kindergarden</div>
					{controlKindergarten?.title ? (
						<>
							<div className="form-control input-imit"> {title}</div>
							<div className="form-control input-imit"> {address}</div>
							<div className="flex">
								<div className="form-control input-imit"> {city}</div>
								<div className="form-control input-imit"> {postcode}</div>
							</div>
							<div id="cKDescription" className="form-control input-imit">
								{description}
							</div>
							<div className="flex">
								<div className="form-control input-imit"> {capacity}</div>
								<div className="form-control input-imit"> {controlKindergarten?.phone}</div>
							</div>
							<div id="ckLinkImg" className="form-control input-imit">
								{linkImg}
							</div>

							<button
								onClick={handleEditClick}
								className="btn_blue btn bpn-padding dark editDataBtn"
							>
								Edit Data
							</button>
						</>
					) : (
						<div id="ckNoData">There is no added Kindergarten yet.</div>
					)}
				</div>
			)}
		</div>
	);
}
