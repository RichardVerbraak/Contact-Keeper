import React, { useContext } from 'react'
import Contacts from './Contacts'

const Home = (props) => {
	return (
		<div className='grid-2'>
			<div>{/*ContactForm*/}</div>
			<div>
				<Contacts />
			</div>
		</div>
	)
}

export default Home
