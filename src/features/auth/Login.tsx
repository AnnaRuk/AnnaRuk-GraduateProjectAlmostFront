import { NavLink, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginFormError } from './selectors';
import { getUser, login, resetLoginFormError } from './authSlice';
import './auth.css';

function Login(): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(selectLoginFormError);
	const [email, setName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			// делаем диспатч санка
			const dispatchResult = await dispatch(
				login({
					email,
					password,
				})
			);
			// проверяем, что санк login зарезолвился успешно
			if (login.fulfilled.match(dispatchResult)) {
				dispatch(getUser()); // подгрузит юзера
				navigate('/'); // переведет на стартовую страницу
			}

			// выводим в консоль ошибку если санк login зареджектился
			if (login.rejected.match(dispatchResult)) {
				// eslint-disable-next-line no-console
				console.error(dispatchResult.error.message);
			}
		},
		[dispatch, email, navigate, password]
	);

	const handleNameChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setName(event.target.value);
			// 332 очищаем ошибку
			dispatch(resetLoginFormError());
		},
		[dispatch]
	);

	const handlePasswordChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(event.target.value);
			// 332 очищаем ошибку
			dispatch(resetLoginFormError());
		},
		[dispatch]
	);

	return (
		<div id="loginAllContainer" className="content font_itim">
			<form id="loginForm" className="bg_pink dark" onSubmit={handleSubmit}>
				<div id="loginContainer">
					<div id="signInTitle"> Let`s Sign In!</div>
					{error && (
						<div className="invalid-feedback mb-3" style={{ display: 'block' }}>
							{error}
						</div>
					)}
					<div className="mb-3">
						<label htmlFor="name-input" className="form-label lbl" id="nameInputLbl">
							E-mail
						</label>
						<input
							type="text"
							className={`form-control input ${error ? 'is-invalid' : ''}`}
							id="name-input"
							name="username"
							value={email}
							onChange={handleNameChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password-input" className="form-label lbl">
							Password
						</label>
						<input
							type="password"
							className={`form-control input ${error ? 'is-invalid' : ''}`}
							id="password-input"
							name="password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>

					<button type="submit" className="aBtn_green dark btn_toRight">
						Sign In
					</button>

					<div id="additionalLogin">
						<nav>
							<NavLink to="/auth/forgot_password" id="fgPass">
								Forgot password?
							</NavLink>
							<NavLink to="/auth/register" id="toSIgnUp">
								Have no Acc? Let`s Sign Up!
							</NavLink>
						</nav>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Login;
