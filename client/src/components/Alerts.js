import React, { useContext } from 'react'
import { AlertContext } from '../context/alert/AlertState'

const Alerts = () => {
	const alertContext = useContext(AlertContext)
	const { alerts } = alertContext
	return (
		alerts.length > 0 &&
		alerts.map((alert) => {
			return (
				<div key={alert.id} className={`alert alert-${alert.type}`}>
					<i className='fas fa-info-circle' /> {alert.msg}
				</div>
			)
		})
	)
}

export default Alerts
