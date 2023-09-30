/** @format */

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { nanoid } from 'nanoid';
import Filter from './filter';
import ContactList from './contactlist';
import ContactForm from './contactform';
import toastWindow from './toastwindow.js';
import './style.css';

const DEFAULTCONTACTS = [
	{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
	{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
	{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
	{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App() {
	const [contacts, setContacts] = useState(() => {
		try {
			const savedContacts = JSON.parse(localStorage.getItem('contacts'));
			return savedContacts ?? DEFAULTCONTACTS;
		} catch (error) {
			toastWindow(`Error initialization: ${error}`);
			return DEFAULTCONTACTS;
		}
	});
	const [filter, setFilter] = useState('');

	useEffect(() => {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}, [contacts]);

	const filteredContacts = contacts.filter(contact =>
		contact.name.toLowerCase().includes(filter.toLowerCase())
	);

	function handlerOnFitred({ target }) {
		setFilter(target.value);
	}

	const handleAddContact = ({ name, number }) => {
		const checkName = contacts.find(
			contact => contact.name.toLowerCase() === name.toLowerCase()
		);
		if (checkName) {
			toastWindow(`${checkName.name} is already in contacts.`);
			return { name, number };
		}

		setContacts(contacts => [
			...contacts,
			{
				id: nanoid(),
				name,
				number,
			},
		]);
		return { name: '', number: '' };
	};

	const handleDelClick = e => {
		const updatedContacts = contacts.filter(contact => contact.id !== e.target.id);
		setContacts([...updatedContacts]);
	};

	return (
		<div className='container'>
			<h1 className='title-name'>Phonebook</h1>

			<ContactForm onSubmitForm={handleAddContact} />

			<h2 className='title-name'>Contacts</h2>

			<Filter onFiltred={handlerOnFitred} value={filter} />

			<ContactList contacts={filteredContacts} onDeleteContact={handleDelClick} />

			<ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} />
		</div>
	);
}

export default App;
