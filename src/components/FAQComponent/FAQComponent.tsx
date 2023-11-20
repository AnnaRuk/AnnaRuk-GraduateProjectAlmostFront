import { useState } from 'react';
import './FAQ.css';

export default function FAQComponent(): JSX.Element {
	const faqData = [
		{
			question: 'I can`t write a message to the kindergarten on the kindergarten`s page.',
			answer:
				'This service is available only to registered users. Please register or log in to your account. Once logged in, the service will be accessible.',
		},
		{
			question: 'I can`t complete the registration.',
			answer:
				'Ensure that all fields in the registration form are filled, and you have agreed to the rules. Check your email, the one you provided during registration. You should receive an email with a confirmation link. Click on it to confirm your registration. After that, you can use your personal account.',
		},
		{
			question: 'Which role should I choose during registration?',
			answer:
				'If you are looking for a place in the kindergarten for your child, choose the role "Just Parent." If you are an employee of the kindergarten and will manage the queue for places, choose the role "Kindergarten Manager."',
		},
		{
			question: 'I`m a parent and can`t send a request from the kindergarten`s page.',
			answer: 'You need to select a child before clicking the "Send a Request" button.',
		},
		{
			question: 'There are no options to choose a child in the "Choose a Child" field.',
			answer:
				'Go to the "My Children" tab in your account and fill in the information for each child separately. After that, try again.',
		},
		{
			question: 'How to add a kindergarten to favorites?',
			answer:
				'Go to the "Kindergartens" tab, select the desired kindergarten, open its profile, and click on the "Add to Favorites" button. The kindergarten will then appear in the "My Favorites" list, and a star will appear before its name in the general list.',
		},
		{
			question: 'How can I send a message to the kindergarten` manager?',
			answer:
				'You can send a message from the kindergarten`s page, from the "Requests" tab, by clicking on the envelope icon next to the corresponding request. If you have had a previous conversation, you can find and continue it in the "My Dialogues" section.',
		},
		{
			question: 'How to reject/cancel a request?',
			answer:
				'To reject/cancel a request, go to the "Requests" tab, find the one you want to reject/cancel, and click on the trash icon with a cross next to it.',
		},
		{
			question: 'How to confirm a request?',
			answer:
				'Available only for managers. To confirm a request, go to the "Requests In Progress" tab, find the one you want to confirm, and click on the checkmark icon next to it. The request will then appear in the "Requests Confirmed" list.',
		},
		{
			question: ' I can`t save my kindergarten data.',
			answer:
				'If you are a manager filling or editing kindergarten data, please check that you have correctly filled in all the fields. Incomplete information will not be saved.',
		},
	];

	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleAccordion = (index: number): void => {
		setOpenIndex((prevIndex: number | null) => (prevIndex === index ? null : index));
	};

	return (
		<div id="FAQBg" className="content dark  font_itim">
			<div className="bg_white faq-container">
				<div id="questionsContainer" className="bg_pink">
					<div id="FAQTitle">Frequently Asked Questions</div>
					{faqData.map((item, index) => (
						<div key={index} className={`accordion-item ${openIndex === index ? 'open' : ''}`}>
							<button
								className="accordion-button"
								aria-expanded={openIndex === index}
								onClick={() => toggleAccordion(index)}
							>
								<span className="accordion-title">{item.question}</span>
								<span className="icon" aria-hidden="true"></span>
							</button>
							<div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
								<p>{item.answer}</p>
							</div>
						</div>
					))}
				</div>
				<div id="contact">
					If you haven`t found an answer to your question, please contact support on the main page
					in the `Contact Us`-section.
				</div>
			</div>
		</div>
	);
}
