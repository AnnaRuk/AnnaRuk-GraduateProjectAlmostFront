import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getUser } from './features/auth/authSlice';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import { selectAuthChecked } from './features/auth/selectors';
import AdminCabinet from './components/main/AdminCabinet';
import Layout from './components/layouts/Layout';
import Tasks from './features/tasks/Tasks';
import KindergartensList from './features/kindergartens/KindergartensList';
import FavoritesKindergartensList from './features/favorites/FavoritesKindergartensList';
import KindergartenDetails from './features/kindergartens/KindergartenDetails';
import Account from './components/myaccount/Account';
import Home from './components/home/Home';
import Sidepanel from './components/sidepanel/Sidepanel';
import ChildForm from './features/children/ChildrenForm';
import KindergartenForm from './features/kindergartens/KindergartenForm';
import UserData from './features/account/UserData';
import ChildrenForm from './features/children/ChildrenForm';
import AddChildrenForm from './features/children/AddChildrenForm';
import UserRequestsList from './features/requests/UserRequestsList';
import ManagerRequestsList from './features/requests/ManagerRequestsList';
import ManagerNOTConfirmRequestList from './features/requests/ManagerNOTConfirmedRequestList';
import DialoguesList from './features/dialogues/DialoguesList';
import Kindergartens from './components/Kindergarten/Kindergartens';
import Dialogue from './features/dialogues/Dialogue';

function App(): JSX.Element {
	const dispatch = useAppDispatch();
	const authChecked = useAppSelector(selectAuthChecked);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	if (!authChecked) {
		return (
			<div className="spinner-border text-primary" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		);
	}

	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/auth/login" element={<Login />} />
					<Route path="/auth/register" element={<Register />} />
					<Route path="/kindergartens" element={<Kindergartens />}>
						<Route path="" element={<KindergartensList />} />
						<Route path=":id" element={<KindergartenDetails />} />
					</Route>

					<Route path="/favorites" element={<FavoritesKindergartensList />} />
					<Route path="/kindergartenForm" element={<KindergartenForm />} />
					<Route path="/userAccount" element={<Account />} />
					<Route path="/sidepanel" element={<Sidepanel />} />
					<Route path="/childrenForm" element={<ChildrenForm />} />
					<Route path="/childrenForm/addChildrenForm" element={<AddChildrenForm />} />
					<Route path="/userDataForm" element={<UserData />} />
					<Route path="/userRequests" element={<UserRequestsList />} />
					<Route path="/managerRequests" element={<ManagerRequestsList />} />
					<Route path="/managerNotConfirmedRequests" element={<ManagerNOTConfirmRequestList />} />
					<Route path="/dialogues" element={<DialoguesList />} />
					<Route path="/dialogues/:dialogueId" element={<Dialogue />} />

				
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;
