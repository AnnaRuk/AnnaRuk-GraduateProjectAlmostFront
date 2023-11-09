import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getUser } from './features/auth/authSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
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
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/auth/login" element={<Login />} />
					<Route path="/auth/register" element={<Register />} />
					<Route path="/admin/tasks" element={<AdminCabinet />} />
					<Route path="/allKindergartens" element={<KindergartensList />} />
					<Route path="/allKindergartens/:id" element={<KindergartenDetails />} />
					<Route path="/favorites" element={<FavoritesKindergartensList />} />
					<Route path="/kindergartenForm" element={<KindergartenForm />} />
					<Route path="/userAccount" element={<Account />} />
					<Route path="/sidepanel" element={<Sidepanel />} />
					<Route path="/childrenForm" element={<ChildrenForm />} />
					<Route path="/childrenForm/addChildrenForm" element={<AddChildrenForm />} />
					<Route path="/userDataForm" element={<UserData />} />
					<Route path="/requests" element={<UserRequestsList />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;
