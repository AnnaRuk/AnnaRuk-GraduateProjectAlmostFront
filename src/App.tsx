import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getUser } from './features/auth/authSlice';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import { selectAuthChecked } from './features/auth/selectors';
import Layout from './components/layouts/Layout';
import KindergartensList from './features/kindergartens/KindergartensList';
import FavoritesKindergartensList from './features/favorites/FavoritesKindergartensList';
import KindergartenDetails from './features/kindergartens/KindergartenDetails';
import Account from './components/myaccount/Account';
import Home from './components/home/Home';
import Sidepanel from './components/sidepanel/Sidepanel';
import ControlKindergarten from './features/kindergartens/ControlKindergarten';
import UserData from './features/account/UserData';
import ChildrenForm from './features/children/ChildrenForm';
import AddChildrenForm from './features/children/AddChildrenForm';
import UserRequestsList from './features/requests/UserRequestsList';
import ManagerRequestsList from './features/requests/ManagerRequestsList';
import ManagerNOTConfirmRequestList from './features/requests/ManagerNOTConfirmedRequestList';
import DialoguesList from './features/dialogues/DialoguesList';
import Kindergartens from './components/Kindergarten/Kindergartens';
import Dialogue from './features/dialogues/Dialogue';
import { loadRequests } from './features/requests/RequestsSlice';
import { loadDialogues } from './features/dialogues/DialoguesSlice';
import { loadControlKindergarten } from './features/kindergartens/KindergartensSlice';
import { loadFavorites } from './features/favorites/FavoritesSlice';
import { loadChildren } from './features/children/ChildrenSlice';
import Profile from './components/Profile/Profile';

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
					<Route path="/profile" element={<Account />}>
						<Route path="" element={<Profile />} />
						<Route path="my_data" element={<UserData />} />
						<Route path="favorites" element={<FavoritesKindergartensList />} />
						<Route path="favorites/:id" element={<KindergartenDetails />} />
						<Route path="kindergarten" element={<ControlKindergarten />} />
						<Route path="kindergartens" element={<KindergartensList />} />
						<Route path="kindergartens/:id" element={<KindergartenDetails />} />
						<Route path="children" element={<ChildrenForm />} />
						<Route path="children/addChild" element={<AddChildrenForm />} />
						<Route path="u_requests" element={<UserRequestsList />} />
						<Route path="m_requests/confirmed" element={<ManagerRequestsList />} />
						<Route path="m_requests/in_process" element={<ManagerNOTConfirmRequestList />} />
						<Route path="dialogues/:dialogueId" element={<Dialogue />} />
					</Route>
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;
