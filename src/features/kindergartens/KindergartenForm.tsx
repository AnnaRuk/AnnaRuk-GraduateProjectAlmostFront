import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addControlKindergarten, updateControlKindergarten } from './KinderdartensSlice';
import './KindergartenForm.module.css';

export default function KindergartenForm(): JSX.Element {
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
		<div>
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
						<label htmlFor="phone-input">phone</label>
						<input type="text" value={controlKindergarten?.phone} />
						<button type="submit">Save</button>
					</form>
				</div>
			) : (
				<div>
					<h3>My Kindergarden</h3>
					<p> {title}</p>
					<p> {city}</p>
					<p> {address}</p>
					<p> {postcode}</p>
					<p> {description}</p>
					<p> {capacity}</p>
					<a href={linkImg}></a>
					<p> {controlKindergarten?.phone}</p>
					<button onClick={handleEditClick}>Edit</button>
				</div>
			)}
		</div>
	);

	// return (
	// 	<>
	// 		<h3>My Kindergarden</h3>
	// 		<form onSubmit={handleSubmit}>
	// 			{error && <p>{error}</p>}
	// 			{/* title+label */}
	// 			<label htmlFor="title-input">title</label>
	// 			<input
	// 				type="text"
	// 				placeholder="title"
	// 				value={title}
	// 				onChange={(e) => setTitle(e.target.value)}
	// 			/>

	// 			<label htmlFor="phone-input">phone</label>
	// 			<input type="text" placeholder="title" value={controlKindergarten?.phone} />

	// 			<input
	// 				type="text"
	// 				placeholder="postcode"
	// 				value={postcode}
	// 				onChange={(e) => setPostcode(e.target.value)}
	// 			/>

	// 			<input
	// 				type="text"
	// 				placeholder="address"
	// 				value={address}
	// 				onChange={(e) => setAddress(e.target.value)}
	// 			/>

	// 			<input
	// 				type="text"
	// 				placeholder="city"
	// 				value={city}
	// 				onChange={(e) => setCity(e.target.value)}
	// 			/>

	// 			<input
	// 				type="text"
	// 				placeholder="description"
	// 				value={description}
	// 				onChange={(e) => setDescription(e.target.value)}
	// 			/>

	// 			<input
	// 				type="text"
	// 				placeholder="img"
	// 				value={linkImg}
	// 				onChange={(e) => setLinkImg(e.target.value)}
	// 			/>

	// 			<input
	// 				type="number"
	// 				placeholder="capacity"
	// 				value={capacity}
	// 				onChange={(e) => setCapacity(Number(e.target.value))}
	// 			/>

	// 			<button type="submit">Update/Save</button>
	// 		</form>
	// 	</>
	// );
}
