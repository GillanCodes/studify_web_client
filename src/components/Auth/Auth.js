import React from 'react';
import Login from './Login';
import Register from './Register';

export default function Auth() {
  return (
      <div className='auth-container'>

            <div className="auth-content">
                <Register />
                <Login />
            </div>

      </div>
  );
}
