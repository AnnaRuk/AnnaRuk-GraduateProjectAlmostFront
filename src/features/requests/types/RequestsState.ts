import ChildWithParent from './ChildWithParent';
import Request from './Request';

export default interface RequestsState {
	childWithUserList: ChildWithParent[];
	requests: Request[];
	error?: string;
}
