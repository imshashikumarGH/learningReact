import Movie from "./component/Movie";
import "./App.css";
import { useState } from "react";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovieHandler() {
    setIsloading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong while hitting API");
      }
      const data = await response.json();
      const movies = data.results.map((movieData) => {
        return {
          name: movieData.title,
          date: movieData.opening_crawl,
        };
      });
      setMovieList(movies);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch deatils</button>
      </section>
      <section>
        {!isLoading && movieList.length >= 0 && <Movie movieList={movieList} />}
        {!isLoading && movieList.length === 0 && !error && <p>No movie deatils... </p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading... </p>}
      </section>
    </>
  );
}

export default App;
