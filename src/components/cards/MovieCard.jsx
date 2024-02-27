import React from "react";

const MovieCard = ({movie, onSelect}) => {
    return(
        <div className="movie" onClick={() => onSelect(movie)}>
            <div>
                <p>{movie.year}</p>
            </div>
            <div>
                <img src={movie.posterUrl} alt={movie.nameRu || movie.nameEn}/>
            </div>
            <div>
                <span>{movie.type}</span>
                <h3>{movie.nameRu} / {movie.nameEn}</h3>
            </div>
        </div>
    );
}

export default MovieCard;

// import React from 'react';
// //noimport './MovieCard.css'; // Ensure you have CSS for styling

// const MovieCard = ({ movie }) => {
//   return (
//     <div className="movie-card">
//       <img src={movie.posterUrlPreview} alt={movie.nameRu || movie.nameEn} className="movie-poster" />
//       <div className="movie-info">
//         <h3 className="movie-title">{movie.nameRu || movie.nameEn}</h3>
//         <p className="movie-year">Year: {movie.year}</p>
//         <p className="movie-rating">Rating: {movie.rating || 'N/A'}</p>
//         {/* Add more movie details here as needed */}
//       </div>
//     </div>
//   );
// };

// export default MovieCard;