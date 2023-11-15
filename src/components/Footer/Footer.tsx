import React from 'react';
import './footer.css';
import '../../basic_styles/styles.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
export default function Footer(): JSX.Element {
	return (
		<footer id="footer" role="contentinfo" className="bg_blue blind ">
			<div id="footerContainer" className="white font_itim">
				<p>© 2023 Project of Group № By</p>
				<div id="iconContainer">
					<a href="https://www.facebook.com/" className="white" target="_blank" rel="noreferrer">
						<FacebookIcon />
					</a>
					<a href="https://www.twitter.com/" className="white" target="_blank" rel="noreferrer">
						<TwitterIcon />
					</a>
					<a href="https://www.instagram.com/" className="white" target="_blank" rel="noreferrer">
						<InstagramIcon />
					</a>
					<a href="https://web.telegram.org/" className="white" target="_blank" rel="noreferrer">
						<TelegramIcon />
					</a>
				</div>
			</div>
		</footer>
	);
}
