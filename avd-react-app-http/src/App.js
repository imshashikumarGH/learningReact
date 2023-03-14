import Movie from "./component/Movie";
import "./App.css";
import { useState } from "react";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading,setIsloading] = useState(false)

  async function fetchMovieHandler() {
    setIsloading(true)
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const movies = data.results.map((movieData) => {
      return {
        name: movieData.title,
        date: movieData.opening_crawl,
      };
    });
    setMovieList(movies);
    setIsloading(false)
  }

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch deatils</button>
        </section>
        <section>
        {!isLoading && movieList.length >= 0 && <Movie movieList={movieList} />}
        {!isLoading &&  movieList.length === 0 && <p>No movie deatils... </p>}
        {isLoading && <p>Loading... </p>}
      </section>
    </>
  );
}

export default App;
