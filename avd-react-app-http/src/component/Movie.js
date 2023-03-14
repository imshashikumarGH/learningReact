import './Movie.css'
const Movie = (props) => {
  return props.movieList.map((movie) => (
    <ul className='movie'>
      <h1>{movie.name}</h1>
      <h3>{movie.date}</h3>
    </ul>
  ));
};
export default Movie;
