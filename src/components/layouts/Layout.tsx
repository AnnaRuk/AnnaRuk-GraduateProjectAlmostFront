import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { loadControlKindergarten } from '../../features/kindergartens/KinderdartensSlice';
import { loadChildren } from '../../features/children/ChildrenSlice';
import { loadRequests } from '../../features/requests/RequestsSlice';
import Footer from './../Footer/Footer';
import Header from '../Header/Header';

function Main(): JSX.Element {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadChildren());
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadControlKindergarten());
	}, [dispatch]);

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default Main;
