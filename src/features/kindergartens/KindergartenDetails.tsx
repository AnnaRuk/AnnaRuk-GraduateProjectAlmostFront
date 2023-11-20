import { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/selectors';
import Kindergarten from './types/Kindergarten';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BusinessIcon from '@mui/icons-material/Business';
import { addToFavorites, deleteFavorites } from '../favorites/FavoritesSlice';
import { createRequest } from '../requests/RequestsSlice';
import '../../basic_styles/styles.css';
import './kindergartenDetails.css';
import { loadChildren } from '../children/ChildrenSlice';
import { createDialogue } from '../dialogues/DialoguesSlice';
import FavoriteAddDto from './../favorites/types/FavoriteAddDto';

export default function KindergartenDetails(): JSX.Element {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const children = useAppSelector((state) => state.children.children);
	const { id } = useParams();
	const kindergartens = useAppSelector((state) => state.kindergartens.kindergartenDTOList);
	const favorites = useAppSelector((state) => state.favorites.kindergartens);

	const [messageAreaEditable, setMessageAreaEditable] = useState(false);

	let kindergarten: Kindergarten | null | undefined = null;

	kindergarten = kindergartens?.find((k) => String(k.id) === String(id));

	const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

	const [newMessage, setNewMessage] = useState<string>('');

	const isKindergartenInFavorites = (kindergartenId: number): boolean => {
		return favorites?.find((k) => k.id === kindergartenId) ? true : false;
	};

	const [isInFavorites, setIsInFavorites] = useState(
		isKindergartenInFavorites(kindergarten?.id || 0)
	);

	const handleDelete = (kindergartenId: number): void => {
		setIsInFavorites(false);
		dispatch(deleteFavorites({ kindergartenId }));
	};
	useEffect(() => {
		if (user?.role == 'USER') {
			dispatch(loadChildren());
		}
	}, [dispatch]);
	const handleCreateRequest = (Kid: number): void => {
		if (selectedChildId !== null) {
			dispatch(
				createRequest({
					childId: selectedChildId,
					kindergartenId: Kid,
				})
			);
		}
	};

	const handleAddToFavorite = (kId: number): void => {
		setIsInFavorites(true);
		const addDto: FavoriteAddDto = { id: kId };
		dispatch(addToFavorites(addDto));
	};

	const handleChildChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setSelectedChildId(Number(e.target.value));
	};

	function showMessageArea(): void {
		const area = document.getElementById('textArea');
		const button = document.getElementById('kShowMessageBTN');
		const button1 = document.getElementById('kSendMessageBTN');
		area?.classList.toggle('hide');
		area?.focus({ preventScroll: false });
		button?.classList.toggle('hide');
		button1?.classList.toggle('hide');
		setMessageAreaEditable(!messageAreaEditable);
	}

	function handleSendMessage(recipientId: number, messageText: string): void {
		if (messageText) {
			dispatch(
				createDialogue({
					recipientId,
					messageText,
				})
			);
			setNewMessage('');
			setMessageAreaEditable(!messageAreaEditable);
		}
	}

	const path = useLocation()?.pathname.replace(`/${id ? id : ''}`, '');

	if (kindergarten) {
		return (
			<div id="kostyl" className="dark font_itim bg_white">
				<div id="kindergartenDataContainer">
					<div>
						<div id="kTitleContainer" className="dark font_itim">
							<NavLink to={`${path}`}>
								<button className="kBtn_blue dark btn">Go Back</button>
							</NavLink>
							<div id="kTitle">{kindergarten?.title}</div>
						</div>
						<div id="imgAndDataContainer">
							<div>
								<img id="kImage" src={kindergarten?.linkImg} alt="KINDERGARTEN" />
							</div>
							<div id="kDataContainer" className="bg_green">
								<div>
									<BusinessIcon /> {kindergarten?.address}
									<div>
										{kindergarten?.postcode}, {kindergarten?.city}
									</div>
								</div>
								<div>
									<PhoneInTalkIcon /> {kindergarten?.phone}
								</div>
								<div>{`contact person:{${
									kindergarten.manager
										? `${kindergarten?.manager?.firstName} ${kindergarten?.manager?.lastName}`
										: ''
								}`}</div>
								<div> capacity: {kindergarten?.capacity}</div>
							</div>
						</div>
						<div id="kDescriptionContainer" className="bg_pink">
							{kindergarten?.description}
						</div>
					</div>

					{user && user?.role === 'USER' ? (
						<div id="kAdditionalContainer">
							{!isInFavorites ? (
								<button
									className="kBtn_blue dark mg"
									type="button"
									id="kToFavoritesBTN"
									onClick={() => handleAddToFavorite(kindergarten ? kindergarten.id : 0)}
								>
									Add to Favorites
								</button>
							) : (
								<button
									type="button"
									className="kBtn_blue dark mg"
									id="kFromFavoritesBTN"
									onClick={() => handleDelete(Number(kindergarten?.id))}
								>
									Remove from Favorites
								</button>
							)}

							<div id="kChildSelectorContainer">
								<label htmlFor="kChildSelector" id="kChoseLbl">
									Choose a child:
								</label>
								<select
									value={selectedChildId || 'children'}
									onChange={handleChildChange}
									className="form-control input"
									id="kChildSelector"
									name="kChildSelector"
								>
									<option value="children">Children</option>
									{children?.map((child) => (
										<option key={child.id} value={child.id}>
											{child.firstName}
										</option>
									))}
								</select>
							</div>

							<button
								className="kBtn_green dark mg "
								type="button"
								id="kRequestBTN"
								onClick={() => handleCreateRequest(Number(kindergarten?.id || 0))}
							>
								Send a Request
							</button>

							<button
								type="button"
								id="kShowMessageBTN"
								className="kBtn_pink dark mg"
								onClick={showMessageArea}
							>
								Send a Message
							</button>
							<div id="kMessageContainer" className={messageAreaEditable ? '' : 'hide'}>
								<textarea
									id="textArea"
									placeholder="Write your message here"
									cols={50}
									rows={7}
									maxLength={1000}
									wrap="soft"
									className={
										messageAreaEditable ? 'form-control input' : ' form-control input hide'
									}
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									required
								></textarea>
								<button
									type="button"
									id="kSendMessageBTN"
									className="kBtn_pink dark mg hide"
									onClick={() => {
										handleSendMessage(Number(kindergarten?.manager?.id), newMessage);
									}}
								>
									Send a Message
								</button>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		);
	} else {
		return <div className="dark">Error!</div>;
	}
}
