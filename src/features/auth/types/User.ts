export default interface User {
	id: number;
	email: string;
	role: string;
	firstName: string;
	lastName: string;
	postCode?: string;
	address?: string;
	city?: string;
	phone?: string;
	dateOfBirth?: string;
	gender?: string;
}


// {
//   "id": 1,
//   "firstName": "Anna",
//   "lastName": "Bieliaieva",
//   "email": "user@gmail.com",
//   "role": "USER",
//   "postCode": "46446",
//   "address": "Berlinstr. 8",
//   "city": "Berlin",
//   "phone": "+495451619",
//   "dateOfBirth": "05.03.1990",
//   "gender": "MALE"
// }