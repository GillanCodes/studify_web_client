import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isEmpty } from './Utils';
import { UIdContext } from './App.context';
import Notification from './Notification/Notification';
import axios from 'axios';

export default function EditorNavBar() {

    const uid = useContext(UIdContext);
    const userData = useSelector(state => state.userReducer);


  	const [displayUser, setDisplayUser] = useState(false);

	useEffect(() => {
		if (!isEmpty(uid) && !isEmpty(userData)) { 
			setDisplayUser(true);
		} else {
			setDisplayUser(false);
		}
	}, [uid, userData])

	const logoutHandle = () => {
		axios({
			method: "GET",
			withCredentials: true,
			url: `${process.env.REACT_APP_API_URL}/api/auth/logout/`
		}).then((res) => {
			console.log(res);
			window.location.reload();
		}).catch((err) => {
			console.log(err);
		})

		
	}

	return (
		<div className="navbar-container">
			<div className="navbar-content">
				<div className="nav-item"></div>
				<NavLink exact="true"="true" to="/" className={"nav-item"}>
					<i className="fas fa-home"></i>
				</NavLink>
				<div className="nav-item"></div>
				<NavLink exact="true"="true" to="/sheets" className={"nav-item"}>
					<i className="fas fa-file-alt"></i> Fiches Publics
				</NavLink>
				<NavLink exact="true"="true" to="/about" className={"nav-item"}>
				 	<i className="fas fa-address-card"></i> A Propos
				</NavLink>
				<NavLink exact="true"="true" to="/partners" className={"nav-item"}>
					<i className="fas fa-handshake"></i> Nos Partenaires
				</NavLink>
				
			</div>
			<div className="navbar-content">
				{displayUser ? (
					<>
						<div className='nav-item notification'>
							<Notification />
						</div>
						<NavLink exact="true"="true" to={"/" + userData.username} className={"nav-item"}>
							{userData.displayName ? userData.displayName : userData.username}
						</NavLink>
						<div className="nav-item" onClick={logoutHandle}>
							<i className="fas fa-sign-out-alt"></i>
						</div>
					
					</>	
				
				) : (
				<NavLink exact="true"="true" to="/auth" className={"nav-item"}>
					Login
				</NavLink>
				)}
			</div>

		</div>
	);
}
