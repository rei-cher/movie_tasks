import React, { useState, useEffect, useRef } from 'react';

import MovieCard from '../cards/MovieCard';
import MovieInfo from '../movie_info/MovieInfo';

import './ToBeWatched.css';

const ToBeWatched = ({ userEmail }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const fetchedRef = useRef(false);
  
  useEffect(() => {
    if(!fetchedRef.current){
      console.log('Fetching movies useEffect');
      fetchWatchLaterMovies(userEmail);
      fetchedRef.current = true; //Mark as fetched
    }
  }, [userEmail]);

  const fetchWatchLaterMovies = async (email) => {
    const response = await fetch(`http://localhost:5000/api/watch-later/${email}`);
    const data_raw = await response.json();
    const data = data_raw.map(item => item.movie_data);
    setMovies(data);
    console.log('Fetching movies fetchWatchLaterMovies',data);
  };

  const handleMovieSelect = (movie) =>{
    setSelectedMovie(movie);
    setIsInfoVisible(true);
  };

  return (
    <div className='main'>
      <div className='main-content'>

        <h2>Watch Later List</h2>
        
        <div className='container'>
          {
            movies.map((movie) =>
              <MovieCard
                key = {movie.filmId}
                movie = {movie}
                onSelect = {() => handleMovieSelect(movie)}
              />
            )
          }

          {
            isInfoVisible && (
              <div className='movie-container'>
                <MovieInfo
                  movie={selectedMovie}
                  //onAdddToWathingNow = {}
                  onClose = {() => setIsInfoVisible(false)}
                />
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default ToBeWatched