import Child from '../../children/types/Child';
import RequestUserDto from './RequestsUserDto';

export default interface ChildWithParent {
	child: Child;
	userInRequestAndDialog: RequestUserDto;
}
