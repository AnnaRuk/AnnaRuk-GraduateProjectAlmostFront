import Kindergarten from '../../kindergartens/types/Kindergarten';

export default interface FavoritesState {
	kindergartenDTOList: Kindergarten[];
	error?: string;
}
