import './home.css';
import '../../basic_styles/styles.css';
import { NavLink } from 'react-router-dom';

export default function Home(): JSX.Element {
	return (
		<nav>
			<div id="mainPageContainer" className="content">
				<div id="kitaConnection">
					<span className="font_jolly_lodger white">Kita Connection</span>
				</div>
				<div id="first">
					<span className="font_kavoon white additional">A lot of letters about us</span>
				</div>
				<div id="second">
					<span className="font_kavoon white additional">
						{' '}
						A lot of letters A lot of letters about us
					</span>
				</div>
				<div id="third">
					<span className="font_kavoon white additional">
						A lot of letters about us A lot of letters about us
					</span>
				</div>
			</div>
			<div id="mainBtnContainer">
				<NavLink to="/about">
					<button id="aboutBtn" className="btn_green dark font_itim  btn_big">
						About Us
					</button>
				</NavLink>
				<NavLink to="/faq">
					<button id="faqBtn" className="dark font_itim btn_blue btn_big">
						F A Q
					</button>
				</NavLink>
				<NavLink to="/contact">
					<button id="contactBtn" className="dark font_itim btn_pink btn_big">
						Contact Us
					</button>
				</NavLink>
			</div>
		</nav>
	);
}
