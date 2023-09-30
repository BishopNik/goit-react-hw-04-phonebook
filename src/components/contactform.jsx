/** @format */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import toastWindow from './toastwindow.js';
import * as yup from 'yup';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';

function ContactForm({ onSubmitForm }) {
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');

	const schema = yup.object({
		name: yup.string().min(2).required('Name is required'),
		number: yup.string().min(6).max(13).required('Number is required'),
	});

	const handlerOnChange = ({ target }) => {
		switch (target.name) {
			case 'name':
				setName(target.value);
				break;
			case 'number':
				setNumber(target.value);
				break;
			default:
				break;
		}
	};

	const handleClick = ({ target }) => {
		target.style.scale = '0.9';
		setTimeout(() => (target.style.scale = '1'), 80);
	};

	const handleSubmit = e => {
		e.preventDefault();

		schema
			.validate({ name, number })
			.then(() => {
				const res = onSubmitForm({ name, number });
				setName(res.name);
				setNumber(res.number);
			})
			.catch(validationErrors => {
				toastWindow(`Error: ${validationErrors.errors}`);
			});
	};

	return (
		<>
			<form className='form-contact' onSubmit={handleSubmit}>
				<label className='label'>
					Name
					<input
						className='input-field'
						value={name}
						type='text'
						name='name'
						pattern="^[a-zA-Zа-яА-Я]+([' \-]?[a-zA-Zа-яА-Я ])*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						required
						autoComplete='off'
						onChange={handlerOnChange}
					/>
				</label>
				<label className='label'>
					Number
					<input
						className='input-field'
						value={number}
						type='tel'
						name='number'
						pattern='\+?\d{1,4}[\-.\s]?\(?\d{1,3}\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}'
						title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
						required
						autoComplete='off'
						onChange={handlerOnChange}
					/>
				</label>
				<button className='add-contact button' type='submit' onClick={handleClick}>
					Add contact
				</button>
			</form>
			<ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} />
		</>
	);
}

ContactForm.propTypes = {
	onSubmitForm: PropTypes.func.isRequired,
};

export default ContactForm;
