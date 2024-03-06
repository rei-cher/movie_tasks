import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Watching from './components/watching/Watching';
import Watched from './components/watched/Watched';
import ToBeWatched from './components/to_be_watched/ToBeWatched'
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    console.log('Attemting to log in with: ', username, password);

    setIsLoggedIn(true);
  }

  return (
    <Router>
      {isLoggedIn && <Sidebar/>}
      <Routes>
        <Route path='/' element={!isLoggedIn ? <Login onLogin={handleLogin}/> : <Navigate to="/home"/>}/>
        <Route path='/register' element={!isLoggedIn ? <Signup/> : <Navigate to="/home"/>}/>
        <Route path='/home' element={isLoggedIn ? <Home/> : <Navigate to="/"/>}/>
        <Route path='/watching' element={<Watching userEmail={'p4shage@gmail.com'}/>}/>
        <Route path='/to-be-watched' element={<ToBeWatched userEmail={'p4shage@gmail.com'}/>}/>
        <Route path='/watched' element={<Watched userEmail={'p4shage@gmail.com'}/>}/>
        <Route path='*' element={<Navigate to={isLoggedIn ? "/home" : "/"}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
