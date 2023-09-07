/** @format */

import './style.css';

function Filter({ value, onFiltred }) {
	return (
		<label className='filter-field'>
			Find contacts by name
			<input
				className='input-field filter'
				value={value}
				type='text'
				name='filter'
				autoComplete='off'
				onChange={onFiltred}
			/>
		</label>
	);
}
export default Filter;