import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	addControlKindergarten,
	loadControlKindergarten,
	updateControlKindergarten,
} from './KinderdartensSlice';
import './KindergartenForm.module.css';

export default function KindergartenForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const controlKindergarten = useAppSelector((state) => state.account.controlKindergarten);

	// useEffect(() => {
	// 	dispatch(loadControlKindergarten());
	// }, [dispatch]);

	// const controlKindergarten = useAppSelector((state) => state.kindergartens.controlKindergarten);
	const [error, setError] = useState<string>('');

	const [title, setTitle] = useState(controlKindergarten?.title || '');
	const [address, setAddress] = useState(controlKindergarten?.address || '');
	const [postcode, setPostcode] = useState(controlKindergarten?.postcode || '');
	const [city, setCity] = useState(controlKindergarten?.city || '');
	const [description, setDescription] = useState(controlKindergarten?.description || '');
	const [linkImg, setLinkImg] = useState(controlKindergarten?.linkImg || '');
	const [capacity, setCapacity] = useState(controlKindergarten?.capacity || 0);

	// TODO PHONE
	//add validation

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
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

	return (
		<>
			<h3>My Kindergarden</h3>
			<form onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				{/* title+label */}
				<label htmlFor="title-input">title</label>
				<input
					type="text"
					placeholder="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label htmlFor="phone-input">phone</label>
				<input type="text" placeholder="title" value={controlKindergarten?.phone} />

				<input
					type="text"
					placeholder="postcode"
					value={postcode}
					onChange={(e) => setPostcode(e.target.value)}
				/>

				<input
					type="text"
					placeholder="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>

				<input
					type="text"
					placeholder="city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>

				<input
					type="text"
					placeholder="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<input
					type="text"
					placeholder="img"
					value={linkImg}
					onChange={(e) => setLinkImg(e.target.value)}
				/>

				<input
					type="number"
					placeholder="capacity"
					value={capacity}
					onChange={(e) => setCapacity(Number(e.target.value))}
				/>
 
				<button type="submit">Update/Save</button>
			</form>
		</>
	);
}
