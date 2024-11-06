import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const EditMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const movie = state.movie;

  const [name, setName] = useState(movie.name);
  const [genres, setGenres] = useState(movie.genres.join(', ')); // Join genres to a string
  const [img, setImg] = useState(movie.img);
  const [premiered, setPremiered] = useState(movie.premiered);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/movies/editMovie/${movie._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          genres: genres.split(',').map(genre => genre.trim()), // Convert back to array
          img,
          premiered
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Display success message
        navigate('/movies/allMovies'); // Redirect to the movies list
      } else {
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the movie.');
    }
  };

  return (
    <>
      <div style={{ marginLeft: '10px', border: '2px solid black' }}>
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Movie edited: {movie.name}</span> <br />
        <div>
          Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
          Genres: <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} /> <br />
          Image URL: <input type="text" value={img} onChange={(e) => setImg(e.target.value)} /> <br />
          Premiered: <input type="text" value={premiered} onChange={(e) => setPremiered(e.target.value)} /> <br />
          <button onClick={handleUpdate} style={{ marginRight: '2px' }}>Update</button>
          <button onClick={() => navigate("/movies/allMovies")}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default EditMovie;
