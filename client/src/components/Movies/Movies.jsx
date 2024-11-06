import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Movie from "./Movie";

const Movies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedMovie, setSearchedMovie] = useState(null);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies/allMovies');
        if (!response.ok) {
          throw new Error("Failed to fetch all movies");
        }
        const data = await response.json();
        setAllMovies(data);
      } catch (error) {
        console.error("Error fetching all movies:", error);
      }
    };

    fetchAllMovies();
  }, []);

  useEffect(() => {
    if (location.state && location.state.movieName) {
      setSearchQuery(location.state.movieName);
      handleSearch(location.state.movieName);
    }
  }, [location.state]);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchedMovie(null); // Show all movies when the search is empty
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/movies/search?query=${query}`);
      if (!response.ok) {
        throw new Error("Movie search failed");
      }
      const data = await response.json();
      setSearchedMovie(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  return (
    <>
      <div
        style={{
          border: "2px solid black",
          marginLeft: "10px",
          marginBottom: "10px",
        }}
      >
        <h2 style={{ marginLeft: '10px' }}>Movies</h2>
        <button onClick={() => navigate("/movies/allMovies")}>
          All Movies
        </button>
        <button onClick={() => navigate("/addMovie")}>Add Movie</button>
        
        Find Movie: <input
          type="text"
          placeholder="search here.."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value === "") {
              setSearchedMovie(null); // Re-render all movies when the input is cleared
            }
          }}
        />
        <button onClick={() => handleSearch(searchQuery)}>Find</button>
      </div>
      <div>
        {searchedMovie ? (
          <Movie movie={searchedMovie} />
        ) : (
          allMovies.map((movie) => (
            <Movie movie={movie} key={movie._id} />
          ))
        )}
      </div>
    </>
  );
};

export default Movies;
