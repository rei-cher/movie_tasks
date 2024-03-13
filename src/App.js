import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth} from './components/authentication/AuthContext';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Search from './components/search/Search';
import Watching from './components/watching/Watching';
import Watched from './components/watched/Watched';
import ToBeWatched from './components/to_be_watched/ToBeWatched'
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import PrivateRoute from './components/authentication/PrivateRoute';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';

function AppWrapper(){
  return (
    <AuthProvider>
      <App/>
    </AuthProvider>
  )
}


function App() {
  const {isLoggedIn, userEmail} = useAuth();

  return (
    <Router>
      {isLoggedIn && (
        <>
          <Sidebar/> && <Navbar/>
        </>
      )}
      <Routes>
        <Route path='/' element={!isLoggedIn ? <Login/> : <Navigate to="/search"/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/search' element={<PrivateRoute> <Search/> </PrivateRoute>}/>
        <Route path='/home' element={<PrivateRoute> <Home/> </PrivateRoute>}/>
        <Route path='/watching' element={<PrivateRoute><Watching userEmail={userEmail}/></PrivateRoute>}/>
        <Route path='/to-be-watched' element={<PrivateRoute><ToBeWatched userEmail={userEmail}/></PrivateRoute>}/>
        <Route path='/watched' element={<PrivateRoute><Watched userEmail={userEmail}/></PrivateRoute>}/>
        <Route path='*' element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  );
}

export default AppWrapper;
