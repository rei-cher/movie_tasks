import React from 'react'

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTasks, faCheckSquare, faEye } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar d-md-block'>
        <h2 className='text-start'><Link to="/home">Menu</Link></h2>
        <ul className='list-unstyled text-start'>
            <li><Link to="/home"><FontAwesomeIcon icon={faHome}/> Home</Link></li>
            <li><Link to="/watching"><FontAwesomeIcon icon={faEye}/> Watching</Link></li>
            <li><Link to="/to-be-watched"><FontAwesomeIcon icon={faTasks}/> To Be Watched</Link></li>
            <li><Link to="/watched"><FontAwesomeIcon icon={faCheckSquare}/> Watched</Link></li>
        </ul>
    </div>
  )
}

export default Sidebar