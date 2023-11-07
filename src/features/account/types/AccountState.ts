import Child from '../../children/types/Child';
import Kindergarten from '../../kindergartens/types/Kindergarten';

export default interface AccountState {
	children?: Child[] | undefined;
	controlKindergarten?: Kindergarten | undefined;
	error?: string;
}
