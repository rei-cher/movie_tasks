import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../authentication/AuthContext';

import MovieCard from '../cards/MovieCard';
import MovieInfo from '../movie_info/MovieInfo';

import './ToBeWatched.css';

const ToBeWatched = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const {userEmail} = useAuth();
  
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

  const handleAddToWatchingNow = async(movie) => {
    const userEmail = 'p4shage@gmail.com';
    try{
      const response = await fetch('http://localhost:5000/api/watching', {
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          movieId: movie.filmId,
          movieData: movie,
        }),
      });

      if(response.ok){
        setMovies(movies.filter(m => m.filmId !== movie.filmId));
        setIsInfoVisible(false);
        alert('Movie added to watching');
      }
    } catch(err){
      console.error('Failed to add movie to watching now: ', err);
    }
  }

  const handleAddToWatched = async(movie) => {
    const userEmail = 'p4shage@gmail.com';
    try{
      const response = await fetch('http://localhost:5000/api/watched', {
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          movieId: movie.filmId,
          movieData: movie,
        }),
      });

      if(response.ok){
        setMovies(movies.filter(m => m.filmId !== movie.filmId));
        setIsInfoVisible(false);
        alert('Movie added to watched');
      }

    } catch(err){
      console.error('Failed to add movie to watched: ', err);
    }
  }

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
                  onAddToWatchingNow = {handleAddToWatchingNow}
                  onAddToWatched = {handleAddToWatched}
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