// src/components/MovieDetails/MovieDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetails.module.css';

// URL de bază pentru imaginile posterelor
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate(); // Hook pentru navigare

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  // Calculăm user score ca procent
  const userScore = Math.round(movie.vote_average * 10);

  // Extragem genurile într-o listă
  const genres = movie.genres.map((genre) => genre.name).join(', ');

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.goBackButton}>
        Go Back
      </button>
      <div className={styles.movieDetails}>
        <img
          src={movie.poster_path ? `${BASE_IMAGE_URL}${movie.poster_path}` : '/path/to/default/image.jpg'}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.movieInfo}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.userScore}>User Score: {userScore}%</p>
          <h2 className={styles.overviewHeader}>Overview</h2>
          <p className={styles.overview}>{movie.overview}</p>
          <h3 className={styles.genresHeader}>Genres</h3>
          <p className={styles.genres}>{genres}</p>
        </div>
      </div>
      {/* Adăugăm titlul pentru "Additional Information" */}
      <h2 className={styles.additionalInfoHeader}>Additional Information</h2>
      <ul className={styles.links}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
};

export default MovieDetails;
