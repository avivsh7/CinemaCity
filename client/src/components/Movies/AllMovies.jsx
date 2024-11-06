import { useState, useEffect } from "react";
import Movie from "./Movie";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies/allMovies');
        if (!response.ok) {
          throw new Error('Movies Fetching failed');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div style={{ marginLeft: "10px" }}>
      {movies.map((movie) => (
        <Movie movie={movie} key={movie._id} />
      ))}
    </div>
  );
};

export default AllMovies;
