import axios from 'axios';
import React, { useState } from 'react';

export default function Register({ intro }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [formSubmit, setFormSubmit] = useState(false);


    const registerHandle = (e) => {
        e.preventDefault();

        const usernameError = document.querySelector('.username.error')
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.passwordConfirm.error');

        usernameError.innerHTML = "";
        emailError.innerHTML = ""
        passwordError.innerHTML = ""
        passwordConfirmError.innerHTML = ""

        if (!username || !email || !password || !passwordConfirm){
            if (!username) {
                usernameError.innerHTML = "Ce champs est vide !";
            }
            if (!email) {
                emailError.innerHTML = "Ce champs est vide !"  
            }
            if (!password) {
                passwordError.innerHTML = "Ce champs est vide !"
            } 
            if (!passwordConfirm) {
                passwordConfirmError.innerHTML = "Ce champs est vide !"  
            }
            return;
        }

        if (password !== passwordConfirm) {
            passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas !";
            return
        }

        axios({
            method:"post",
            url:`${process.env.REACT_APP_API_URL}/api/auth/register`,
            data:{
                username,
                email,
                password
            }
        }).then((res) => {
            if(res.data.errors){
                usernameError.innerHTML = res.data.errors.username
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password
            } else {
                setFormSubmit(true)
            }
        })
        
}

  return (
      <div className="register-container">
          

            <div className="content">
                <h2 className='title'>S'enregistrer</h2>
            </div>


            {formSubmit && !intro && (
                <div className="notification is-success">
                    Engistrement terminé, <strong>vous pouvez vous connecter</strong> !
                </div>
            )}

            {formSubmit && intro && (
                <div className="notification is-success">
                    Engistrement terminé, <strong><a href="/auth">vous pouvez vous connecter</a></strong> !
                </div>
            )}

            <form method="post" onSubmit={registerHandle}>
                <div className="content">
                    <div className="field">
                        <span>Email</span>
                        <input type="email" name="email" id="email" autoComplete='off' onChange={(e) => setEmail(e.target.value)}/>
                        <p className="help is-danger error email"></p>
                    </div>
                    <div className="field">
                        <span>Nom D'utilisateur</span>
                        <input type="text" name="username" id="username" autoComplete='off' onChange={(e) => setUsername(e.target.value)}/>
                        <p className="help is-danger error username"></p>
                    </div>
                    <div className="field">
                        <span>Mot de passe</span>
                        <input type="password" name="password" id="password" autoComplete='off' onChange={(e) => setPassword(e.target.value)}/>
                        <p className="help is-danger error password"></p>
                    </div>
                    <div className="field">
                        <span>Mot de passe</span>
                        <input type="password" name="password" id="password" autoComplete='off' onChange={(e) => setPasswordConfirm(e.target.value)}/>
                        <p className="help is-danger error passwordConfirm"></p>
                    </div>
                    {!formSubmit && ( 
                        <div className="field">
                            <input type="submit" value="S'enregistrer" />
                        </div>
                    )}
                </div>
            </form>

      </div>
  );
}
