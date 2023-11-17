import { toast } from 'react-toastify';

export const negative = (text: string) =>
	toast.error(text, {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	});

export const positive = (text: string) =>
	toast.success(text, {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	});
