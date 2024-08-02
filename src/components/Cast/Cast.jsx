

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMovieCredits } from '../../services/api';
import styles from './Cast.module.css';

// URL de bază pentru imagini
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w200';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const loadMovieCredits = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        console.error('Failed to fetch movie credits:', error);
      }
    };

    loadMovieCredits();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2>Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={
                actor.profile_path
                  ? `${BASE_IMAGE_URL}${actor.profile_path}`
                  : '/path/to/default/image.jpg'
              }
              alt={actor.name}
              className={styles.actorImage}
            />
            <div className={styles.actorInfo}>
              <p className={styles.actorName}>{actor.name}</p>
              <p className={styles.characterName}>
                Character: {actor.character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
    })
  ),
};

export default Cast;
