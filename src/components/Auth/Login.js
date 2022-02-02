import axios from 'axios';
import React, { useState } from 'react';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [NotificationDisplay, setNotificationDisplay] = useState(false);

    const loginHandle = (event) => {

        event.preventDefault();

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/auth/login`,
            data: {
                username,
                password
            },
            withCredentials: true
        }).then((res) => {
            if (res.data.errors) {
                setNotificationDisplay(true);
                const Error = document.querySelector('.error');
                if (res.data.errors.username) Error.innerHTML = res.data.errors.username;
                if (res.data.errors.password) Error.innerHTML = res.data.errors.password;
            } else {
                window.location = '/';
            }
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
        <div className="login-container">
             <div className="content">
                <h1 className='title'>Se connecter</h1>
            </div>

            {NotificationDisplay && (
                    <>
                        <div className="notification is-danger is-light error">
                        </div>
                    </>
                )}

            <form method="post" onSubmit={loginHandle}>
                <div className="content">
                    <div className="field">
                        <span>Nom D'utilisateur</span>
                        <input type="text" name="username" id="username" autoComplete='off' onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="field">
                        <span>Mot de passe</span>
                        <input type="password" name="password" id="password" autoComplete='off' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="field">
                        <input type="submit" value="Se Connecter" />
                    </div>
                </div>
            </form>
        </div>
    );
}
