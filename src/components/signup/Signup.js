import React, {useState} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';

import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSuccess, setIsSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) =>{
    event.preventDefault();

    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
      setEmailError('Please enter a valid email address.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)){
      setPasswordError('Password must be: \nAt least 8 characters long \nInclude at least 1 upper case letter \nInclude at least 1 lowercase letter \nInclude at least 1 number');
      return;
    }

    try{
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      if (response.ok){
        setIsSuccess(true);
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
      }
      else{
        const errorText = await response.text();
        setEmailError(`Registration failed: ${errorText}`);
      }
    } catch (err){
      console.error('Registration error: ', err);
      setEmailError('Failed to register. Please try again');
    }
  }

  return (
    <div className='signup-container'>
      {isSuccess ? (
        <div className='success-message'>
          <h2>Account created successfully!</h2>
          <p>You can now log in with your new account.</p>
          <button onClick={() => navigate('/')} className='go-to-login-button'>Go to Log In</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='signup-form'>
          <h2>Sign Up</h2>

          <div className='form-group'>
            <label htmlFor='firstName'>First Name</label>
            <input
              className="input-field"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              className="input-field"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              className='input-field'
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <div className='error-message'>{emailError}</div>}
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              className='input-field'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <div className='error-message'>{passwordError}</div>}
          </div>

          <button type='submit' className='signup-button'>Sign Up</button>
          <Link to='/' className='back-button'>Back</Link>

        </form>
      )}
    </div>
  )
}

export default Signup;