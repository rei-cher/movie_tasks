import React from 'react'
import { useLocation } from 'react-router-dom';
import './MovieInfo.css';

const MovieInfo = ({movie, onAddToWatchLater, onAddToWatchingNow, onAddToWatched, onClose}) =>{
    const location = useLocation();
    
    if (!movie) return null;

    const shouldShowBtn = (btnName) => {
        const path = location.pathname;
        switch (path) {
            case '/home':
                return true;
            case '/to-be-watched':
                return btnName !== 'watchLater';
            case '/watching':
                return btnName !== 'watchNow';
            case 'watched':
                return btnName !== 'watched';
            default:
                return true;
        }
    }

    return(
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2 className='modal-title'>{movie.nameRu} / {movie.nameEn}</h2>
                    <button className='modal-close-btn' onClick={onClose}>×</button>
                </div>
                    <div className='modal-body'>
                    <img className='modal-img' src={movie.posterUrl} alt={movie.nameRu || movie.nameEn} />
                    <div className='modal-genres'>Genres: {movie.genres.map(genre => genre.genre).join(', ')}</div>
                    <div className='modal-description'>{movie.description}</div>
                </div>
                <div className='modal-footer'>
                    <div className='button-group'>
                        {shouldShowBtn('watchNow') && <button className='modal-button button_Now' onClick={() => onAddToWatchingNow(movie)}>Add to Watch Now</button>}
                        {shouldShowBtn('watchLater') && <button className='modal-button button_Later' onClick={() => onAddToWatchLater(movie)}>Add to Watch Later</button>}
                        {shouldShowBtn('watched') && <button className='modal-button button_Watched' onClick={() => onAddToWatched(movie)}>Add to Watched</button>}
                    </div>

                    <button className='modal-button button_Close' onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
  }

export default MovieInfo