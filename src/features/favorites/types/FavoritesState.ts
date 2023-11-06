import Kindergarten from '../../kindergartens/types/Kindergarten';

export default interface FavoritesState {
	kindergartens: Kindergarten[];
	error?: string;
}
