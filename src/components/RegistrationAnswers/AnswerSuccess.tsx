import './answer.css';
export default function AnswerSuccess(): JSX.Element {
	return (
		<div id="successContainer" className="bgContainer">
			<div className="font_itim dark content  bg_white answerContainer">
				Registration completed successfully! A registration confirmation e-mail has been sent to
				your e-mail address.
			</div>
		</div>
	);
}
