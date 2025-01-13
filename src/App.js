import styles from './App.module.css';
import { useRef } from 'react';
import { useStore } from './hooks/useStore';
import { sendFormData } from './assets/sendFormData';

export const App = () => {
	const { getState, updateState } = useStore();

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		updateState('email', target.value);
		if (target.value.startsWith('.')) {
			updateState('emailError', 'Email не может начинаться с точки');
		} else if (target.value.length > 35) {
			updateState('emailError', 'Email должен быть меньше 35 символов');
		} else if (/(?<=.)\.(?=@)/.test(target.value)) {
			updateState('emailError', 'Перед символом "@" не может быть точки');
		}
	};

	const onEmailBlur = ({ target }) => {
		let newError = null;
		if (!target.value.includes('@')) {
			newError = 'Email должен содержать знак "@"';
		} else if (!target.value.includes('.')) {
			newError = 'Email должен содержать знак "."';
		}
		updateState('emailError', newError);
	};

	const onPasswordChange = ({ target }) => {
		updateState('password', target.value);
		if (target.value.length > 30) {
			updateState('passwordError', 'Пароль не должен быть больше 30 символов');
		}
	};

	const onPasswordBlur = ({ target }) => {
		let newError = null;
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(target.value)) {
			newError =
				'Пароль должен содержать хотя бы по одной заглавной и строчной букве и хотя бы одну цифру';
		} else if (target.value.length < 6) {
			newError = 'Пароль должен быть не менее 6 символов';
		}
		updateState('passwordError', newError);
	};

	const onRepeatedPasswordChange = ({ target }) => {
		updateState('repeatedPassword', target.value);
		getState('repeatedPasswordError');
	};

	const onRepeatedPasswordBlur = ({ target }) => {
		if (target.value !== password) {
			updateState('repeatedPasswordError', 'Пароли не совпадают');
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (!emailError && !passwordError && !repeatedPasswordError) {
			sendFormData({ email, password, repeatedPassword });
			submitButtonRef.current.focus();
		}
	};

	const {
		email,
		password,
		repeatedPassword,
		emailError,
		passwordError,
		repeatedPasswordError,
	} = getState();

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit}>
				{emailError && <div className={styles.errorText}>{emailError}</div>}
				{passwordError && <div className={styles.errorText}>{passwordError}</div>}
				{repeatedPasswordError && (
					<div className={styles.errorText}>{repeatedPasswordError}</div>
				)}
				<input
					className={styles.input}
					name="email"
					type="email"
					value={email}
					placeholder="Введите email"
					onChange={onEmailChange}
					onBlur={onEmailBlur}
				></input>
				<input
					className={styles.input}
					name="password"
					type="password"
					value={password}
					placeholder="Введите пароль"
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				></input>
				<input
					className={styles.input}
					name="repeatedPassword"
					type="password"
					value={repeatedPassword}
					placeholder="Повторите пароль"
					onChange={onRepeatedPasswordChange}
					onBlur={onRepeatedPasswordBlur}
				></input>
				<button
					className={styles.button}
					ref={submitButtonRef}
					type="submit"
					disabled={!!emailError || !!passwordError || !!repeatedPasswordError}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
