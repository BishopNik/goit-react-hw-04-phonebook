/** @format */

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import Filter from './filter';
import ContactList from './contact';
import ContactForm from './forms';
import './style.css';

function App() {
	const [contacts, setContacts] = useState(() => {
		try {
			const savedContacts = JSON.parse(localStorage.getItem('contacts'));
			if (savedContacts) {
				return savedContacts;
			} else
				return [
					{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
					{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
					{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
					{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
				];
		} catch (error) {
			toast.error(`Error initialization: ${error}`, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
			return [
				{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
				{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
				{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
				{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
			];
		}
	});
	const [filter, setFilter] = useState('');
	const [filteredContacts, setFiltredContacts] = useState(contacts);
	const [isFirstRender, setIsFilterRender] = useState(true);

	useEffect(() => {
		if (isFirstRender) {
			setIsFilterRender(false);
			return;
		}
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}, [contacts, isFirstRender]);

	useEffect(() => {
		const filteredContacts = contacts.filter(contact => {
			const searchName = contact.name.toLowerCase();
			const filterName = filter.toLowerCase();
			return searchName.includes(filterName);
		});
		setFiltredContacts(filteredContacts);
	}, [filter, contacts]);

	function handlerOnFitred({ target }) {
		setFilter(target.value);
	}

	const handleAddContact = ({ name, number }) => {
		setContacts(contacts => [
			...contacts,
			{
				id: nanoid(),
				name,
				number,
			},
		]);
	};

	const handleDelClick = e => {
		const updatedContacts = contacts.filter(contact => contact.id !== e.target.id);
		setContacts([...updatedContacts]);
	};

	return (
		<div className='container'>
			<h1 className='title-name'>Phonebook</h1>

			<ContactForm onSubmitForm={handleAddContact} contacts={contacts} />

			<h2 className='title-name'>Contacts</h2>

			<Filter onFiltred={handlerOnFitred} value={filter} />

			<ContactList contacts={filteredContacts} onDeleteContact={handleDelClick} />

			<ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} />
		</div>
	);
}

export default App;
