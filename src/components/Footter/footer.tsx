import React from 'react';
import './footerstyle.css';
import '../../basic_styles/styles.css';
export default function Footer(): JSX.Element {
	return (
		<footer id="footer" role="contentinfo" className="bg_blue blind white">
			<div id="footerContainer">
				<p>© 2023 Project of Group № </p>
				<p>Всякие значки</p>
			</div>
		</footer>
	);
}
