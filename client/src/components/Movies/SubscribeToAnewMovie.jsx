import { useState, useEffect } from "react";

const SubscribeToAnewMovie = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState('');
  const [date, setDate] = useState('');

  const SubscribeToMovie = async () => {
    try {
      const response = await fetch('http://localhost:3000/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user.name, movie, date }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Display success message
        window.location.reload();
      } else {
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred subscribing to the movie.');
    }
  };

  const handleMovieChange = (e) => {
    setMovie(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movies/unwatched?user=${user.name}`);
        if (!response.ok) {
          throw new Error("Movies Fetching failed");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching movies.');
      }
    };

    fetchMovies();
  }, [user.name]);

  return (
    <div
      style={{
        backgroundColor: "cyan",
        marginLeft: "10px",
        marginRight: "50px",
        border: "2px solid red",
      }}
    >
      Add a new movie <br />
      <select onChange={handleMovieChange}>
        <option value="">Select a movie</option>
        {movies.map((movie) => (
          <option key={movie._id} value={movie.name}>{movie.name}</option>
        ))}
      </select>
      <input onChange={handleDateChange} type="date" />
      <br />
      <button onClick={SubscribeToMovie}>Subscribe</button>
    </div>
  );
};

export default SubscribeToAnewMovie;
