import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Root() {
  const [userName, setUserName] = useState(sessionStorage.getItem("userName") || "");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isLoggedIn") === "true");
  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Display login successful message
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userName", userName);
        setIsLoggedIn(true);
        navigate("/movies/allMovies"); // Redirect to the desired page
      } else {
        setErrorMessage(data.message); // Display error message
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.'); // Handle network or server errors
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userName");
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    if (isLoggedIn) {
      
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
        <h1>Movies - Subscriptions Website</h1>
        {isLoggedIn && <span style={{marginLeft:'10px'}}>Welcome back, <b>{userName}</b></span>}
        {isLoggedIn && (
          <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
            <button onClick={() => navigate("/movies/allMovies")}>Movies</button>{" "}
            <button onClick={() => navigate("/subscriptions")}>
              Subscriptions
            </button>
            <button onClick={() => navigate("/allmembers")}>All Members</button>{" "}
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
        
      </div>

      {!isLoggedIn && (
        <div
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          <h2>Log in</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                value={userName}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                required
              />
            </label>
            <br />
            <input type="submit" value="Login" />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if present */}
          </form>
        </div>
      )}
      <Outlet />
    </>
  );
}
