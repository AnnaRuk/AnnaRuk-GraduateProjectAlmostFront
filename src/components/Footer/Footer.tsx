import React from 'react';
import './footer.css';
import '../../basic_styles/styles.css';
export default function Footer(): JSX.Element {
	return (
		<footer id="footer" role="contentinfo" className="bg_blue blind ">
			<div id="footerContainer" className="white font_itim">
				<p>© 2023 Project of Group № </p>
				<p>Всякие значки</p>
			</div>
		</footer>
	);
}
