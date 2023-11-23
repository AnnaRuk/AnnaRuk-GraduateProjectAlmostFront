import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import {
	addControlKindergarten,
	loadControlKindergarten,
	updateControlKindergarten,
} from './KindergartensSlice';
import './ControlKindergarten.css';
import FilePath from './types/FilePath';

import Kindergarten from './types/Kindergarten';
type KindergartenProps = {
	kindergarten: Kindergarten | null;
};
export default function ControlKindergarten({ kindergarten }: KindergartenProps): JSX.Element {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadControlKindergarten());
	}, [dispatch]);

	const controlKindergarten = kindergarten;

	const [error, setError] = useState<string>('');
	const [editable, setEditable] = useState(false);

	const [title, setTitle] = useState(controlKindergarten?.title ?? '');
	const [address, setAddress] = useState(controlKindergarten?.address ?? '');
	const [postcode, setPostcode] = useState(controlKindergarten?.postcode ?? '');
	const [city, setCity] = useState(controlKindergarten?.city ?? '');
	const [description, setDescription] = useState(controlKindergarten?.description ?? '');
	const [linkImg, setLinkImg] = useState(controlKindergarten?.linkImg ?? '');
	const [capacity, setCapacity] = useState(controlKindergarten?.capacity ?? 0);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	function validateInputs(): boolean {
		if (title?.trim() === '') {
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
		if (capacity <= 0) {
			setError('Capacity is wrong, please enter it correctly. Empty data will not be saved!');
			return false;
		}
		if (!selectedFile && linkImg == '') {
			setError('You haven`t chose an image, please enter it.');
			return false;
		}
		return true;
	}

	const handleEditClick = (): void => {
		setEditable(true);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files) {
			setSelectedFile(e.target.files[0]);
		}
	};
	async function getNewLink(file: File): Promise<FilePath | undefined> {
		const formData = new FormData();
		formData.append('file', file);

		const requestOptions = {
			method: 'POST',
			body: formData,
		};
		const response = await fetch('/api/files', requestOptions);
		if (response.ok) {
			return response.json();
		}
		if (response.status >= 400) {
			const { message }: { message: string } = await response.json();
			throw new Error(message);
		}
	}
	function send(newLink: string): void {
		if (validateInputs()) {
			setEditable(false);
			if (!newLink) {
				newLink = '';
			}
			if (controlKindergarten?.title) {
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
						linkImg: newLink,
						capacity,
					})
				);
			}
		}
	}

	async function handleSaveSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		if (selectedFile) {
			await getNewLink(selectedFile).then((res) => {
				if (res) {
					setLinkImg(res.message);
					send(res.message);
				}
			});
		} else {
			send(linkImg);
		}
	}

	return (
		<div className="font_itim dark">
			{editable ? (
				<div>
					<div id="cKEditTitle">Edit Kindergarten`s Data</div>
					{error && <p>{error}</p>}
					<form id="editForm" onSubmit={handleSaveSubmit}>
						<div className="couple">
							<label htmlFor="cKTitle-input" className="form-label lbl">
								Title
							</label>
							<input
								type="text"
								value={title ? title : ''}
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
								value={capacity == 0 ? '' : capacity}
								onChange={(e) => setCapacity(e.target.value == '' ? 0 : Number(e.target.value))}
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
								onClick={(event) => {
									event.currentTarget.files = null;
								}}
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
					{title ? (
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
								link to image: {controlKindergarten?.linkImg}
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
