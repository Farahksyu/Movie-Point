import "./App.css";
import { getMovieList , searchMovie } from "./api";
import { useEffect, useState} from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img alt="" className="Movie-image" 
          src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}></img>
          <div className="Movie-date">release: {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies (query.results)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>KSYU MOVIE POINT</h1>
        <input 
          placeholder='cari film kesukaanmu' 
          className="Movie-search"
          onChange={({target}) => search(target.value)}>
        </input>
        <div className="Movie-container">
          <PopularMovieList></PopularMovieList>
        </div>
      </header>
    </div>
  );
}

export default App;
