import './kindergarten.css';
import '../../basic_styles/styles.css';
import { Outlet } from 'react-router-dom';

export default function Kindergartens(): JSX.Element {
	return (
		<div id="substrate">
			<div id="kindergartenBack" className="bg_white content">
				<Outlet />
			</div>
		</div>
	);
}
