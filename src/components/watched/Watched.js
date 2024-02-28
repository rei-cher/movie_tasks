import React, { useState, useEffect, useRef } from 'react';

import MovieCard from '../cards/MovieCard';
import MovieInfo from '../movie_info/MovieInfo';

import './Watched.css';

const Watched = ({userEmail}) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const fetchedRef = useRef(false);
  
  useEffect(() => {
    if(!fetchedRef.current){
      console.log('Fetching movies useEffect');
      fetchWatchedMovies(userEmail);
      fetchedRef.current = true; //Mark as fetched
    }
  }, [userEmail]);

  const fetchWatchedMovies = async (email) => {
    const response = await fetch(`http://localhost:5000/api/watched/${email}`);
    const data_raw = await response.json();
    const data = data_raw.map(item => item.movie_data);
    setMovies(data);
    console.log('Fetching movies fetchWatchedMovies',data);
  };

  const handleMovieSelect = (movie) =>{
    setSelectedMovie(movie);
    setIsInfoVisible(true);
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

  const handleAddToWatchLater = async(movie) => {
    const userEmail = 'p4shage@gmail.com';
    try{
      const response = await fetch('http://localhost:5000/api/watch-later', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
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
        alert('Movie added to watch later');
      };
    } catch (err){ 
      console.error('Failed to add movie to watch later: ', err);
    }
  };

  return (
    <div className='main'>
      <div className='main-content'>

        <h2>Watched List</h2>
        
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
                  onAddToWatchLater={handleAddToWatchLater}
                  onAddToWathingNow={handleAddToWatchingNow}
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

export default Watched