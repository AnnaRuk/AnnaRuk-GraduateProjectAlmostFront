import './voucher.css';
export default function Voucher(): JSX.Element {
	return (
		<div id="voucherContainer" className="content font_itim dark">
			<div id="voucherContentContainer" className="bg_white">
				<div id="voucherTitle">About Voucher</div>
				<div id="voucherTextContainer" className="bg_pink">
					If you want your child to go to a day care center or day care center, you will need a day
					care center voucher. You can redeem the voucher at a Berlin daycare center or day care
					center of your choice if there is a place available for your child there. The daycare
					voucher is used to determine your child`s care needs. How many hours a day your child can
					be looked after depends, among other things, on their age: From your child`s first
					birthday, the voucher is valid for at least part-time care (more than 5 to 7 hours a day),
					without the need being checked. In the first year of life, you must demonstrate a need for
					care for your child. Longer care times for your child are possible if you go to work,
					study or are in training and therefore cannot look after your child yourself. The need
					must arise from your family situation or be necessary for educational or social reasons.
					Please note that your youth welfare office may require proof of the accuracy of your
					information. Attach a copy of the relevant evidence to your application. For a daycare
					center, you conclude the care contract directly with the daycare center or the provider.
					In child day care, you usually make initial contact with the child day care person. The
					contract is then concluded with the responsible youth welfare office. If there are any
					changes in your family or work situation between registration and the conclusion of a care
					contract for your child, you must inform the youth welfare office immediately.
				</div>
				<div id="lnkContainer">
					You can do it Online :{' '}
					<a href="https://fms.verwalt-berlin.de/kita/" target="_blank" rel="noreferrer">
						Online-Processing
					</a>{' '}
				</div>
			</div>
		</div>
	);
}
