

const API_KEY = '13b1039719f4562adeb2f96b830cbe1e';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch trending movies');
  return response.json();
};

const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  if (!response.ok) throw new Error('Failed to search movies');
  return response.json();
};

const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
};

const getMovieCredits = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch movie credits');
  return response.json();
};

const getMovieReviews = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch movie reviews');
  return response.json();
};

export {
  fetchTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
};
