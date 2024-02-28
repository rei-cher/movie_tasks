import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Watching from './components/watching/Watching';
import Watched from './components/watched/Watched';
import ToBeWatched from './components/to_be_watched/ToBeWatched'

function App() {
  return (
    <Router>
        <Sidebar/>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/watching' element={<Watching userEmail={'p4shage@gmail.com'}/>}/>
          <Route path='/to-be-watched' element={<ToBeWatched userEmail={'p4shage@gmail.com'}/>}/>
          <Route path='/watched' element={<Watched userEmail={'p4shage@gmail.com'}/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
    </Router>
  );
}

export default App;
