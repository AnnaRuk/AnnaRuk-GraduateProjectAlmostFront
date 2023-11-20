import ChildWithParent from './ChildWithParent';
import Request from './RequestDto';

export default interface RequestsState {
	childWithUserList: ChildWithParent[];
	requests: Request[];
	error?: string;
}
