import Kindergarten from './Kindergarten';

export default interface KindergartensState {
	kindergartenDTOList: Kindergarten[];
	cities: string[];
	error?: string;
	selectedCity?: string;
	controlKindergarten: Kindergarten | null;
}
