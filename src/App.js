import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './App.module.css';
import { sendFormData } from './assets/sendFormData';

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email('Некорректный email')
		.required('Email обязателен')
		.max(35, 'Email должен быть меньше 35 символов')
		.test('not-starting-with-dot', 'Email не может начинаться с точки', (value) => {
			return value ? !value.startsWith('.') : true;
		})
		.test('no-dot-before-at', 'Перед символом "@" не может быть точки', (value) => {
			return value ? !/(?<=.)\.(?=@)/.test(value) : true;
		}),
	password: yup
		.string()
		.required('Пароль обязателен')
		.min(6, 'Пароль должен быть не менее 6 символов')
		.max(30, 'Пароль не должен быть больше 30 символов')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			'Пароль должен содержать хотя бы по одной заглавной и строчной букве и хотя бы одну цифру',
		),
	repeatedPassword: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatedPassword: '',
		},
		resolver: yupResolver(validationSchema),
	});

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={handleSubmit(sendFormData)}>
				{errors.email && (
					<div className={styles.errorText}>{errors.email.message}</div>
				)}
				{errors.password && (
					<div className={styles.errorText}>{errors.password.message}</div>
				)}
				{errors.repeatedPassword && (
					<div className={styles.errorText}>
						{errors.repeatedPassword.message}
					</div>
				)}
				<input
					className={styles.input}
					{...register('email')}
					type="email"
					placeholder="Введите email"
				/>
				<input
					className={styles.input}
					{...register('password')}
					type="password"
					placeholder="Введите пароль"
				/>
				<input
					className={styles.input}
					{...register('repeatedPassword')}
					type="password"
					placeholder="Повторите пароль"
				/>
				<button className={styles.button} type="submit">
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
