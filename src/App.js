import {useState, useEffect} from 'react';
import './App.css'
import SearchIcon from './search.svg'
import Movie from './Movie'

//api key = c5a01c9a

const API_URL = 'https://www.omdbapi.com?apikey=c5a01c9a';


//ok so it's time for a very first custom component



function App() {

	const [movies, setMovies] = useState([]);
	const [searchTerm , setsearchTerm] = useState('');
  const searchmovies = async(title) => {
	const response = await fetch(`${API_URL}&s=${title}`);
	const data= await response.json();
	
	if (data.Response === 'True') {
		setMovies(data.Search);
	  } else {
		setMovies([]); // set to empty array to avoid undefined
	  }
  }
  useEffect(() =>{
	searchmovies('batman');
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchmovies(searchTerm);
    }
  };


  return(
	<div className='app'>
	   <h1>Movieland</h1>
	   <div className='search'>
			<input placeholder='Movie Name' value = {searchTerm} onChange={(e)=> setsearchTerm(e.target.value)} onKeyDown={handleKeyDown} >
			</input>
			<img src = {SearchIcon}alt = "Search"onClick={() => searchmovies(searchTerm)}>
			</img>
	   </div>
	   <div className = "container">
	   {movies.length > 0 ? (
    movies.map((movie) => <Movie key={movie.imdbID} movie1={movie} />)
  ) : (
    <h2>No movies found</h2>
  )}
	   </div>
	</div>
  )
}

export default App;
