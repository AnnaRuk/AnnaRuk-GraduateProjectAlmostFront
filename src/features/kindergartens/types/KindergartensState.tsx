import Kindergarten from './Kindergarten';

export default interface KindergartensState {
	kindergartenBaseDTOList: Kindergarten[];
	cities: string[];
	error?: string;
	selectedCity?: string;
}
