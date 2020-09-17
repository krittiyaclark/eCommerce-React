import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../../firebase/utils'

import AuthWrapper from '../AuthWrapper'
import Button from '../Form/Button'
import FormInput from '../Form/FormInput'
import { resetAllAuthForms, resetPassword } from '../../redux/User/user.action'

const mapState = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	resetPasswordError: user.resetPasswordError,
})

const EmailPassword = (props) => {
	const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState)
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [errors, setErrors] = useState('')

	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetAllAuthForms())
			props.history.push('/')
		}
	}, [resetPasswordSuccess])

	useEffect(() => {
		if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
			setErrors(resetPasswordError)
		}
	}, [resetPasswordError])

	const handleSubmit = (event) => {
		event.preventDefault()

		dispatch(resetPassword({ email }))
	}

	const configAuthWrapper = {
		headline: 'Email Password',
	}

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className='form-wrap'>
				{errors.length > 0 && (
					<ul>
						{errors.map((e, index) => {
							return (
								<li className='error-message ' key={index}>
									{e}
								</li>
							)
						})}
					</ul>
				)}
				<form onSubmit={handleSubmit}>
					<FormInput
						type='email'
						name='email'
						value={email}
						placeholder='Email'
						handleChange={(event) => setEmail(event.target.value)}
					/>

					<Button type='submit'> Email Password</Button>
				</form>
			</div>
		</AuthWrapper>
	)
}

export default withRouter(EmailPassword)
