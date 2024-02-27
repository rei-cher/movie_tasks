import React from 'react'
import { useState } from 'react';

import MovieCard from '../cards/MovieCard';
import MovieInfo from '../movie_info/MovieInfo';

import SearchIcon from './search.svg';

import './Home.css';

const API_KEY = '76235ae4-7a77-458c-83ca-65999fc2ada4'
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const Home = () => {
  const[movies, setMovies] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");
  const[hasSearched, setHasSearched] = useState(false);
  const[selectedMovie, setSelectedMovie] = useState(null);
  const[isInfoVisible, setIsInfoVisible] = useState(false);

  const searchMovies = async(title) => {
    setHasSearched(true);
    const response = await fetch(`${API_URL}${title}`,{
      headers:{
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
      }
    });
      
    const data = await response.json();
    console.log(data);
    setMovies(data.films);
    setSearchTerm('');
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm){
      searchMovies(searchTerm);
    }
  }

  const handleMovieSelect = (movie) =>{
    setSelectedMovie(movie);
    setIsInfoVisible(true);
  }

  const handleAddToWatchLater = async(movie) => {
    const userEmail = 'p4shage@gmail.com';
    try{
      await fetch('http://localhost:5000/api/watch-later', {
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
      alert('Movie added to watch later.');
    } catch (err){ 
      console.error('Failed to add movie to watch later: ', err);
    }
  };

  const handleAddToWatchingNow = async(movie) => {
    const userEmail = 'p4shage@gmail.com';
    try{
      await fetch('http://localhost:5000/api/watching', {
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
    } catch(err){
      console.error('Failed to add movie to watching now: ', err);
    }
  }

  const handleAddToWatched = async(movie) => {
    const userEmail = 'p4shage@gmail.com';
    try{
      await fetch('http://localhost:5000/api/watched', {
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
    } catch(err){
      console.error('Failed to add movie to watched: ', err);
    }
  }

  return (
    <div className='main'>

      <div className='main-content'>
        <h1>Movie Search</h1>

        <div className='search-bar'>
            <input 
              type='text' 
              placeholder='Search for a movie'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchInputKeyPress}
            />

            <img 
              src={SearchIcon}
              alt="search"
              onClick={() => searchTerm && searchMovies(searchTerm)}
            />

        </div>

        {
          hasSearched ? (
            movies?.length > 0
              ?(
                  <div className="container">
                      {
                           movies.map((movie) => 
                              <MovieCard 
                              key={movie.filmId} 
                              movie={movie} 
                              onSelect={() => handleMovieSelect(movie)}/>
                          )
                      }
                  </div>
              ) : (
                  <div className="empty">
                      <h2>No movies found</h2>
                  </div>
              )
          ) : null          
        }

        {
          isInfoVisible && (
            <div className='movie-container'>
              <MovieInfo
                movie={selectedMovie}
                onAddToWatchLater={handleAddToWatchLater}
                onAdddToWathingNow={handleAddToWatchingNow}
                onAddToWatched = {handleAddToWatched}
                onClose={() => setIsInfoVisible(false)}
              />
            </div>
          )
        }

      </div>

    </div>
  )
}

export default Home