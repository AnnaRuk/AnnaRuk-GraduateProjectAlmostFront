import RequestUserDto from '../../requests/types/RequestsUserDto';
import Message from './Message';

export default interface DialoguesDto {
	id: number;
	recipient: RequestUserDto;
	messages: Message[];
}
