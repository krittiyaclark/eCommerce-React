import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const Header = () => {
	return (
		<header className='header'>
			<div className='wrap'>
				<div className='logo'>
					<Link to='/'>
						<img src='' alt='logo' />
					</Link>
				</div>

				<div className='callToActions'>
					<ul>
						<li>
							<Link to='/registration'>Registration</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Header