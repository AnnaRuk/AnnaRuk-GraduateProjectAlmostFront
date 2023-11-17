import { useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { register, resetRegisterFormError, login } from './authSlice';
import { selectRegisterFormError } from './selectors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './auth.css';

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
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setRole(event.target.value);
			dispatch(resetRegisterFormError());
		},
		[dispatch]
	);

	return (
		<div id="registerAllContainer" className="content font_itim">
			<form id="registerForm" className="auth-form bg_green dark" onSubmit={handleSubmit}>
				<div id="registerContainer">
					<div id="registerTitle">Let's Sign Up!</div>
					{error && (
						<div className="invalid-feedback " style={{ display: 'block' }}>
							{error}
						</div>
					)}
					<div id="fAlContainer" className="fAlContainer">
						<div>
							<label htmlFor="name-input" className="form-label lbl ">
								First name
							</label>
							<input
								type="text"
								className={` input_reg form-control ${error ? 'is-invalid' : ''}`}
								id="firstName-input"
								name="userFirstName"
								value={firstName}
								onChange={handleFirstNameChange}
								required
							/>
						</div>
						<div>
							<label htmlFor="name-input" className="form-label lbl">
								Last name
							</label>
							<input
								type="text"
								className={`input_reg form-control ${error ? 'is-invalid' : ''}`}
								id="lastName-input"
								name="lastFirstName"
								value={lastName}
								onChange={handleLastNameChange}
								required
							/>
						</div>
					</div>
					<div >
						<label htmlFor="role-input" className="form-label lbl">
							Choose a role
						</label>
						<select
							className={`input_reg form-select ${error ? 'is-invalid' : ''}`}
							id="role-input"
							name="userRole"
							value={role}
							onChange={handleRoleChange}
							required
						>
							<option value="">Select Role</option>
							<option value="MANAGER">Kindergarten Manager</option>
							<option value="USER">Just parent</option>
						</select>
					</div>
					<div>
						<label htmlFor="name-input" className="form-label lbl">
							E-mail
						</label>
						<input
							type="text"
							className={`input_reg form-control ${error ? 'is-invalid' : ''}`}
							id="name-input"
							name="username"
							value={email}
							onChange={handleNameChange}
							required
						/>
					</div>
					<div className="fAlContainer">
						<div>
							<label htmlFor="password-input" className="form-label lbl">
								Password
							</label>
							<input
								type="password"
								className={`input_reg form-control ${error ? 'is-invalid' : ''}`}
								id="password-input"
								name="password"
								value={password}
								onChange={handlePasswordChange}
								required
							/>
						</div>
						<div>
							<label htmlFor="password-repeat-input" className="form-label lbl">
								Confirm password
							</label>
							<input
								type="password"
								className={`input_reg form-control ${error ? 'is-invalid' : ''}`}
								id="password-repeat-input"
								name="passwordRepeat"
								value={passwordRepeat}
								onChange={handlePasswordRepeatChange}
								required
							/>
						</div>
					</div>
					<div id="regBtnContainer" className="">
						<div>
							<input type="checkbox" id="agreeCheck" name="agreeCheck" />
							<label id="agreeLbl" htmlFor="agreeCheck">
								I agree with <NavLink to={'/terms_of_use'}>Terms of Use</NavLink> .
							</label>
						</div>
						<button id="regBtn" type="submit" className="aBtn_blue dark" disabled={true}>
							Sign up
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Register;
