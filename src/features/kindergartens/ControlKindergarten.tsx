import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	addControlKindergarten,
	loadControlKindergarten,
	updateControlKindergarten,
} from './KindergartensSlice';
import './ControlKindergarten.css';
import { negative } from '../../basic_styles/toastify';

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
	const [selectedFile, setSelectedFile] = useState(null);
	const fileName = useAppSelector((state) => state.kindergartens?.filePath);

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

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files[0]);
		setSelectedFile(e.target.files[0]);
	};

	async function handleSaveSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		if (!selectedFile) {
			negative('please select file');
			return;
		}
		const formData = new FormData();
		formData.append('file', selectedFile);

		const requestOptions = {
			method: 'POST',
			body: formData,
		};

		const response = await fetch('/api/files', requestOptions);
		const res = await response?.json();
		const newLink = res?.message;

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
						linkImg: newLink,
						description,
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

	useEffect(() => {
		dispatch(loadControlKindergarten());
	}, [dispatch]);

	return (
		<div className="font_itim dark">
			{editable ? (
				<div>
					<div id="cKEditTitle">Edit Kindergarten's Data</div>
					{error && <p>{error}</p>}
					<form id="editForm" onSubmit={handleSaveSubmit}>
						<div className="couple">
							<label htmlFor="cKTitle-input" className="form-label lbl">
								Title
							</label>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="form-control input"
								id="cKTitle-input"
								name="cKTitle-input"
								required
							/>
						</div>
						<div className="couple">
							<label htmlFor="cKAddress-input" className="form-label lbl">
								Address
							</label>
							<input
								type="text"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								className="form-control input"
								id="cKAddress-input"
								name="cKAddress-input"
								required
							/>
						</div>
						<div id="cKPaCContainer">
							<div className="couple">
								<label htmlFor="cKPostcode-input" className="form-label lbl">
									Postcode
								</label>
								<input
									type="text"
									value={postcode}
									onChange={(e) => setPostcode(e.target.value)}
									className="form-control input"
									id="cKPostcode-input"
									name="cKPostcode-input"
									required
								/>
							</div>
							<div className="couple">
								<label htmlFor="cKCity-input" className="form-label lbl">
									City
								</label>
								<input
									type="text"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									className="form-control input"
									id="cKCity-input"
									name="cKCity-input"
									required
								/>
							</div>
						</div>
						<div className="couple">
							<label htmlFor="cKCapacity-input" className="form-label lbl">
								Capacity
							</label>
							<input
								type="number"
								value={capacity}
								onChange={(e) => setCapacity(Number(e.target.value))}
								className="form-control input"
								id="cKCapacity-input"
								name="cKCapacity-input"
								required
							/>
						</div>
						<div className="couple">
							<label htmlFor="cKFileSelector" className="form-label lbl">
								Photo
							</label>
							<input
								type="file"
								name="cKFileSelector"
								id="cKFileSelector"
								accept="image/*"
								className="form-control input"
								onChange={handleFileChange}
							/>
						</div>
						<div className="couple">
							<label htmlFor="cKDescription" className="form-label lbl">
								Description
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								id="cKDescription"
								name="cKDescription"
								className="form-control input"
							/>
						</div>
						<button type="submit" className="btn_blue btn" id="cKSaveBtn">
							Save Data
						</button>
					</form>
				</div>
			) : (
				<div>
					<div id="cKTitle">My Kindergarten</div>
					{controlKindergarten?.title ? (
						<>
							<div className="form-control input-imit">title: {title}</div>
							<div className="form-control input-imit">address: {address}</div>
							<div className="flex">
								<div className="form-control input-imit">postcode: {postcode}</div>
								<div className="form-control input-imit">city: {city}</div>
							</div>
							<div id="cKDescription" className="form-control input-imit">
								about kindergarten: {description}
							</div>
							<div className="flex">
								<div className="form-control input-imit">capacity: {capacity}</div>
								<div className="form-control input-imit">phone: {controlKindergarten?.phone}</div>
							</div>
							<div id="ckLinkImg" className="form-control input-imit">
								fileName: {fileName} linkImg: {linkImg}
							</div>
						</>
					) : (
						<div id="ckNoData">There is no added Kindergarten yet.</div>
					)}
					<button onClick={handleEditClick} className="btn_blue btn bpn-padding dark editDataBtn">
						{controlKindergarten?.title ? 'Edit Data' : 'Add a Kindergarten'}
					</button>
				</div>
			)}
		</div>
	);
}
