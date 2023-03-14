import Movie from "./component/Movie";
import "./App.css";
import { useState } from "react";

function App() {
  const [movieList, setMovieList] = useState([]);

  const fetchMovieHandler = () => {
    fetch("https://swapi.dev/api/films").then((response) => {
      return response.json();
    })
    .then(data => {
      const movieList = data.results.map(movieData => {
        return {
          name : movieData.title,
          date:movieData.opening_crawl
        };
      });
      setMovieList(movieList)
    })
  };

  return (
    <>
    
      <section>
      <button onClick={fetchMovieHandler}>Fetch deatils</button>
        <Movie movieList={movieList} />
      </section>
      
    </>
  );
}

export default App;
