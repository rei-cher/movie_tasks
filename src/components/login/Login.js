import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import './LoginPage.css';

const Login = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) =>{
    event.preventDefault();

    try{
      const response = await fetch('http://localhost:5000/api/login',{
        method:'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
      
      const data = await response.json();

      if (response.ok){
        navigate('/home');
      }
      else{
        alert(data.message || 'Login failed');
      }
    } catch (err){
      console.error('Login error: ', err);
      alert('An error occured. Please try again');
    }

    onLogin(username, password);
  }

  return(
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Log In</h2>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type='password'
            if='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />        
        </div>
        
        <div className="form-actio">
          <button type="submit" className="login-button">Login</button>
          <Link to="/register" className="register-button">Sign Up</Link>
        </div>

      </form>
    </div>
  )
}

export default Login