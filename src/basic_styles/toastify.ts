import { toast } from 'react-toastify';

export const negative = (text: string): void =>
	toast.error(text, {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	}) as unknown as void;

export const positive = (text: string): void =>
	toast.success(text, {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	}) as unknown as void;
