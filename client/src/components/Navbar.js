import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Navbar = ({ title, icon }) => {
	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>
				<li>
					<NavLink to='/' activeClassName='selected'>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to='/about'>About</NavLink>
				</li>
				<li>
					<NavLink to='/register'>Register</NavLink>
				</li>
				<li>
					<NavLink to='/login'>Login</NavLink>
				</li>
			</ul>
		</div>
	)
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
}

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt',
}

export default Navbar
