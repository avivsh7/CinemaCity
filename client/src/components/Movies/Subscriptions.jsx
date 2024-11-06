import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubscribeToAnewMovie from "./SubscribeToAnewMovie";

const Subscriptions = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/allmembers');
      if (!response.ok) {
        throw new Error('Users Fetching failed.'); 
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      alert('The Following error has occurred: ' + error.message);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('http://localhost:3000/subscriptions');
      if (!response.ok) {
        throw new Error('Fetching subscriptions failed');
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      alert('The Following error has occurred: ' + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSubscriptions();
  }, []);

  const handleUserSelection = (user) => {
    // Toggle visibility if the user is already selected
    if (selectedUser && selectedUser._id === user._id) {
      setIsVisible(!isVisible);
    } else {
      setSelectedUser(user);
      setIsVisible(true);
    }
  };

  const navigate = useNavigate();

  const handleMovieClick = (movieName) => {
    navigate('/movies/allmovies', { state: { movieName } });
  };

  return (
    <>
      <div style={{ marginLeft: '10px', border: '4px solid black' }}>
        <h2 style={{ marginLeft: '10px' }}>Subscriptions</h2>
        <button onClick={() => navigate('/allmembers')}>All Members</button>
        <button onClick={() => navigate('/addmember')}>Add User</button>
        {users.map((user) => {
          const userSubscriptions = subscriptions.filter(sub => sub.user === user.name);
          
          return (
            <div key={user._id} style={{ border: '4px double black', marginLeft: '10px', marginRight: '10px', marginBottom: '20px' }}>
              <div style={{ marginLeft: '10px' }}>
                <h2>{user.name}</h2>
                Email: {user.email} <br />
                City: {user.city} <br />
                <button onClick={() => navigate('/editmember', { state: { user } })}>Edit</button>
                <button>Delete</button>
                <div style={{ border: '3px dashed black', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
                  <h3 style={{ marginLeft: '10px' }}>Movies Watched</h3>

                  <button onClick={() => handleUserSelection(user)} style={{ marginLeft: '10px' }}>
                    {isVisible && selectedUser?._id === user._id ? 'Hide Subscription Form' : 'Subscribe to a new movie'}
                  </button>

                  {isVisible && selectedUser?._id === user._id && (
                    <SubscribeToAnewMovie user={selectedUser} />
                  )}

                  <ul>
                    {userSubscriptions.map((sub, index) => (
                      <li key={index}>
                        <a onClick={() => handleMovieClick(sub.movie)}>{sub.movie}</a> , {new Date(sub.date).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Subscriptions;
