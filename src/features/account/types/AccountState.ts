import User from '../../auth/types/User';
import Child from '../../children/types/Child';
import Kindergarten from '../../kindergartens/types/Kindergarten';

export default interface AccountState {
	// children?: Child[];
	// controlKindergarten?: Kindergarten | undefined;
	error?: string;
	user?: User;
}
