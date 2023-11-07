export default interface UpdateUserDto {
	email: string;
	role: string;
	firstName: string;
	lastName: string;
	postcode?: string;
	address?: string;
	city?: string;
	phone?: string;
	dateOfBirth?: string;
	gender?: string;
}
