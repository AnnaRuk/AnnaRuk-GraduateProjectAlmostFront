import Kindergarten from './Kindergarten';

export default interface KindergartensState {
	kindergartens: Kindergarten[];
	error?: string;
}
