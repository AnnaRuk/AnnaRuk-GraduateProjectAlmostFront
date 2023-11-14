import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/selectors';
import './sidepanel.css';
import { useState } from 'react';
import { store } from '../../app/store';

function Sidepanel(): JSX.Element {
	const user = useAppSelector(selectUser);
	const [show1, setShow1] = useState(false);
	const [show2, setShow2] = useState(false);
	const dialogues = useAppSelector((state) => state.dialogues.dialogues);

	function showHide1(): void {
		setShow1(!show1);
	}
	function showHide2(): void {
		setShow2(!show2);
	}

	return (
		<div id="sidePanelContainer" className="content bg_blue dark font_itim">
			{user && (
				<div id="sidePanelBtnContainer">
					<div>
						<NavLink to="/profile/my_data">
							<button className="sBtn_green dark">My Data</button>
						</NavLink>
					</div>

					{user.role === 'USER' && (
						<>
							<div>
								<NavLink to="/profile/children">
									<button className="sBtn_green dark">My Children</button>
								</NavLink>
							</div>
							<div>
								<div>
									<button id="aKindergartens" className="sBtn_green dark" onClick={showHide1}>
										Kindergartens
									</button>
								</div>
								{show1 && (
									<div id="aKindergartensContainer" className="aBg_pink">
										<NavLink id="aKnav" to="/profile/kindergartens">
											<button id="aKindergartens" className="sBtn_pink dark ">
												Kindergartens
											</button>
										</NavLink>
										<NavLink to="/profile/favorites">
											<button className="sBtn_pink dark">My favorites</button>
										</NavLink>
									</div>
								)}
							</div>
							<div>
								<NavLink to="/profile/u_requests">
									<button className="sBtn_green dark">My Requests</button>
								</NavLink>
							</div>
						</>
					)}
					{user.role === 'MANAGER' && (
						<>
							<div>
								<NavLink to="/profile/kindergarten">My Kindergarten</NavLink>
							</div>
							<div>
								<span>Requests</span>
							</div>
							<div>
								<NavLink to="/profile/m_requests/confirmed">Confirmed</NavLink>
							</div>
							<div>
								<NavLink to="/profile/m_requests/in_process">In Process</NavLink>
							</div>
						</>
					)}
					<div>
						<button id="aDialogueBtn" className="sBtn_green dark" onClick={showHide2}>
							My dialogues
						</button>
					</div>
					{dialogues.length > 0 && show2 ? (
						<div id="aDcontainer" className="aBg_pink dark">
							{dialogues.map((d) => (
								<NavLink to={`/profile/dialogues/${d.id}`} key={d.id}>
									<button className="sBtn_pink dark dialogLnk">
										{d.recipient.firstName} {d.recipient.lastName}
									</button>
								</NavLink>
							))}
						</div>
					) : (
						show2 && (
							<div id="noDialogContainer" className="aBg_pink dark">
								No Dialogues
							</div>
						)
					)}
				</div>
			)}
		</div>
	);
}
export default Sidepanel;
