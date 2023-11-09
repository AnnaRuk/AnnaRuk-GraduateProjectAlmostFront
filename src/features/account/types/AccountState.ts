import User from '../../auth/types/User';

export default interface AccountState {
	error?: string;
	user?: User;
}
