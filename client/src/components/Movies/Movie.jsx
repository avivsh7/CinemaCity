import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Movie = ({ movie }) => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/subscriptions/specificMovie?movie=${encodeURIComponent(movie.name)}`);
        if (!response.ok) {
          throw new Error('Subscriptions fetching failed');
        }
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchSubscriptions();
  }, [movie.name]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/movies/allMovies/${movie._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Movie deleted successfully');
          window.location.reload();
        } else {
          console.error('Failed to delete movie');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <div
      style={{
        border: "2px solid black",
        marginBottom: "30px",
        marginLeft: '10px'
      }}
    >
      <div style={{ marginLeft: "10px" }}>
        <span style={{ fontWeight: "bold" }}>
          {movie.name}, {movie.premiered}
        </span>
        <br />
        Genres: {movie.genres.map((genre) => '"' + genre + '"').join(",")}{" "}
        <br />
        <img
          src={movie.img}
          alt=""
          style={{ width: "100px", height: "100px" }}
        />
        <div
          style={{
            border: "3px dashed black",
            marginRight:'10px'
          }}
        >
            <h3 style={{marginLeft:'10px'}}>Subscribers</h3> <br /> <br />
          <ul>
            {subscriptions.map((sub, index) => (
              <li key={index}>
                <a href={`/allmembers?user=${encodeURIComponent(sub.user)}`}>
                  {sub.user}
                </a> , {new Date(sub.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        <br />
        <button
          onClick={() => navigate("/editMovie", { state: { movie } })}
          style={{ marginRight: "2px" }}
        >
          Edit
        </button>{" "}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Movie;
