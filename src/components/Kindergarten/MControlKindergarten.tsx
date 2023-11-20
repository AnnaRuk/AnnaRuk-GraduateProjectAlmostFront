import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadControlKindergarten } from '../../features/kindergartens/KindergartensSlice';
import ControlKindergarten from '../../features/kindergartens/ControlKindergarten';

export default function MControlKindergarten(): JSX.Element {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadControlKindergarten());
	}, [dispatch]);
	const controlKindergarten = useAppSelector((state) => state.kindergartens?.controlKindergarten);
	return (
		<>
			<ControlKindergarten kindergarten={controlKindergarten} />
		</>
	);
}
