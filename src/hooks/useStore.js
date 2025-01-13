import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
	repeatedPassword: '',
	emailError: null,
	passwordError: null,
	repeatedPasswordError: null,
};

export const useStore = () => {
	const [state, setState] = useState(initialState);
	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};
