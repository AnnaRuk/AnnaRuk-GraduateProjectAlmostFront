import RequestUserDto from '../../requests/types/RequestsUserDto';

export default interface Kindergarten {
	id: number;
	title: string;
	manager?: RequestUserDto;
	address: string;
	postcode?: string;
	city: string;
	capacity: number;
	freePlaces?: number;
	description?: string;
	linkImg?: string;
	phone?: string;
}
