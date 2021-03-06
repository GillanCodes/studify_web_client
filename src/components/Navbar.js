import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isEmpty } from './Utils';
import { UIdContext } from './App.context';
import Notification from './Notification/Notification';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { FormControlLabel, Switch } from '@mui/material';

export default function Navbar() {

    const uid = useContext(UIdContext);
    const userData = useSelector(state => state.userReducer);


  	const [displayUser, setDisplayUser] = useState(false);
	const [cookies, setCookie] = useCookies(['theme'])
	const [isLight, setIsLight] = useState()

	useEffect(() => {
		if (!isEmpty(uid) && !isEmpty(userData)) { 
			setDisplayUser(true);
		} else {
			setDisplayUser(false);
		}
	}, [uid, userData])

	useEffect(() => {
		if (cookies.theme === "day") {
			setIsLight(true)
		} else {
			setIsLight(false)
		}
	}, [])
	

	const themeHandle = (e) => {
		if (isLight) {
		 setCookie("theme", "night")
		} else {
		 setCookie("theme", "day")
		}
		setIsLight(!isLight)
	}

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
				<NavLink exact="true" to="/" className={"nav-item"}>
					<i className="fas fa-home"></i>
				</NavLink>
				<div className="nav-item"></div>
				<NavLink exact="true" to="/library" className={"nav-item"}>
					<i className="fa-solid fa-book"></i> <span className='text'>La bibliotheque </span>
				</NavLink>
				<NavLink exact="true" to="/about" className={"nav-item"}>
				 	<i className="fas fa-address-card"></i> <span className='text'>A Propos</span>
				</NavLink>
				<NavLink exact="true" to="/partners" className={"nav-item"}>
					<i className="fas fa-handshake"></i> <span className='text'>Nos Partenaires</span>
				</NavLink>
				<p className="nav-item">
					<FormControlLabel control={<Switch checked={isLight} onChange={themeHandle} />} label={cookies.theme === "day" ? "Jour" : "Nuit" } />
				</p>
				<p className="nav-item">
					<span className='version text'>Pre-release : Beta 0.1.1</span>
				</p>
				
			</div>
			<div className="navbar-content">
				{displayUser ? (
					<>
						<div className='nav-item notification not-mobile'>
							<Notification />
						</div>
						{userData.permissions.DASHBOARD && (
							<a href={process.env.REACT_APP_DASHBOARD_URL} target="_blank" className="nav-item"><i className="fa-solid fa-chart-line"></i></a>
						)}
						<NavLink exact="true" to={"/" + userData.username} className={"nav-item not-mobile"}>
							{userData.displayName ? userData.displayName : userData.username}
						</NavLink>
						<NavLink exact="true" to={"/" + userData.username} className={"nav-item not-desktop"}>
							<i className="fa-solid fa-user"></i>
						</NavLink>
						<div className="nav-item" onClick={logoutHandle}>
							<i className="fas fa-sign-out-alt"></i>
						</div>
					
					</>	
				
				) : (
				<NavLink exact="true" to="/auth" className={"nav-item"}>
					Login
				</NavLink>
				)}
			</div>

		</div>
	);
}
