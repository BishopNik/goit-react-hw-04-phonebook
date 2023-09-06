/** @format */

import './style.css';

function ContactList({ contacts, onDeleteContact }) {
	return (
		<>
			{contacts.map(({ id, name, number }) => (
				<div className='contact-containet' key={id}>
					<p className='contact'>
						{name} {number}
					</p>
					<button
						id={id}
						className='del-button button'
						type='submit'
						onClick={onDeleteContact}
					>
						Delete
					</button>
				</div>
			))}
		</>
	);
}

export default ContactList;
