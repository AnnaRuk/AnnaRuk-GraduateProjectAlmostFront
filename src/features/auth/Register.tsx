import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, resetRegisterFormError, login } from './authSlice';
import { selectRegisterFormError } from './selectors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function Register(): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(selectRegisterFormError);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [role, setRole] = useState('');

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			const dispatchResult = await dispatch(
				register({
					email,
					password,
					passwordRepeat,
					firstName,
					lastName,
					role,
				})
			);
			if (register.fulfilled.match(dispatchResult)) {
				dispatch(login({ email, password }));
				navigate('/');
			}
		},
		[dispatch, email, navigate, password, passwordRepeat]
	);

	const handleNameChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	const handlePasswordChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	const handlePasswordRepeatChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPasswordRepeat(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	const handleFirstNameChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFirstName(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	const handleLastNameChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setLastName(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	const handleRoleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setRole(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Регистрация</h2>
			{error && (
				<div className="invalid-feedback mb-3" style={{ display: 'block' }}>
					{error}
				</div>
			)}
     <div className="mb-3">
				<label htmlFor="name-input" className="form-label">
					first name
				</label>
				<input
					type="text"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="firstName-input"
					name="userFirstName"
					value={firstName}
					onChange={handleFirstNameChange}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="name-input" className="form-label">
					last name
				</label>
				<input
					type="text"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="lastName-input"
					name="lastFirstName"
					value={lastName}
					onChange={handleLastNameChange}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="name-input" className="form-label">
					role
				</label>
				<input
					type="text"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="role-input"
					name="userRole"
					value={role}
					onChange={handleRoleChange}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="name-input" className="form-label">
					Login(email)
				</label>
				<input
					type="text"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="name-input"
					name="username"
					value={email}
					onChange={handleNameChange}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="password-input" className="form-label">
					Пароль
				</label>
				<input
					type="password"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="password-input"
					name="password"
					value={password}
					onChange={handlePasswordChange}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="password-repeat-input" className="form-label">
					Повторите пароль
				</label>
				<input
					type="password"
					className={`form-control ${error ? 'is-invalid' : ''}`}
					id="password-repeat-input"
					name="passwordRepeat"
					value={passwordRepeat}
					onChange={handlePasswordRepeatChange}
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Зарегистрироваться
			</button>
		</form>
	);
}

export default Register;
