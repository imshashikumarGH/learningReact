import Movie from "./component/Movie";
import "./App.css";
import { useState } from "react";

function App() {
  const [movieList, setMovieList] = useState([]);


  async function fetchMovieHandler() {
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const movies = data.results.map((movieData) => {
      return {
        name: movieData.title,
        date: movieData.opening_crawl,
      };
    });
    setMovieList(movies);
  }

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch deatils</button>
        </section>
        <section>
        <Movie movieList={movieList} />
      </section>
    </>
  );
}

export default App;
