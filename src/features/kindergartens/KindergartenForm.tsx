import React, { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addKindergarten } from './KinderdartensSlice';

export default function KindergartenForm(): JSX.Element {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [postcode, setPostCode] = useState<string>('');
	const [capacity, setCapacity] = useState<number>(0);
	const [city, setCity] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [linkImg, setLinkImg] = useState<string>('');
	const [error, setError] = useState<string>('');

	function validateInputs(): boolean {
		if (title.trim() === '') {
			setError('Title is empty, please enter it');
			return false;
		}
		if (address.trim() === '') {
			setError('Address is empty, please enter it');
			return false;
		}
		if (postcode.trim() === '') {
			setError('Postcode is empty, please enter it');
			return false;
		}
		if (city.trim() === '') {
			setError('City is empty, please enter it');
			return false;
		}
		if (description.trim() === '') {
			setError('Description is empty, please enter it');
			return false;
		}
		if (linkImg.trim() === '') {
			setError('Peactures is empty, please enter it');
			return false;
		}
		if (capacity <= 0) {
			setError('Capasity is empty, please enter it');
			return false;
		}
		return true;
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		if (validateInputs()) {
			dispatch(
				addKindergarten({
					title,
					address,
					postcode,
					capacity,
					city,
					description,
					linkImg,
				})
			);
		}
	}

	return (
		<>
			<h3>My Kindergarden</h3>
			<form onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				<label htmlFor="title-input" className="form-label">
					Kindergarten's Title
				</label>
				<input
					type="text"
					id=""
					placeholder="Kindergarten's Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type="text"
					id=""
					placeholder="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<input
					type="text"
					id=""
					placeholder="city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<input
					type="text"
					id=""
					placeholder="postcode"
					value={postcode}
					onChange={(e) => setPostCode(e.target.value)}
				/>
				<input
					type="number"
					id=""
					placeholder="capacity"
					value={capacity}
					onChange={(e) => setCapacity(Number(e.target.value))}
				/>
				<input
					type="text"
					id=""
					placeholder="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<input
					type="text"
					id=""
					placeholder="add photo link"
					value={linkImg}
					onChange={(e) => setLinkImg(e.target.value)}
				/>
				<button type="submit">Save</button>
			</form>
		</>
	);
}

// title: string;
// address: string;
// postcode: string;
// city: string;
// capacity: number;
// description: string;
// linkImg: string;
