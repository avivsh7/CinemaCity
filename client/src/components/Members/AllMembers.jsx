import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SubscribeToAnewMovie from "../Movies/SubscribeToAnewMovie";

const AllMembers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleMovieClick = (movieName) => {
    navigate('/movies/allmovies', { state: { movieName } });
  };


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

  // Extract user query parameter from URL
  const query = new URLSearchParams(location.search);
  const userName = query.get('user');

  // Filter users if a specific user is requested
  const filteredUsers = userName
    ? users.filter(user => user.name === userName)
    : users;

  const deleteMember = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/allmembers/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete member');
        }

        alert('Member deleted successfully!');
        fetchUsers(); // Refresh the list of members
    
      } catch (error) {
        alert('Error deleting member: ' + error.message);
      }
    }
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsVisible(true);
  };

  return (
    <>
      {/* <button onClick={() => navigate("/allmembers")}>All Members</button>{" "}
      <button onClick={() => navigate("/addmember")}>Add Member</button> */}

      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => {
          const userSubscriptions = subscriptions.filter(sub => sub.user === user.name);
          
          return (
            <div
              key={user._id}
              style={{
                marginBottom: "15px",
                marginLeft: "5px",
                border: "4px solid black",
              }}
            >
              <div style={{ marginLeft: '10px' }}>
                <h2>{user.name}</h2>
                Email: {user.email} <br />
                City: {user.city} <br />
                <button onClick={() => navigate("/editmember", { state: { user } })}>Edit</button>{" "}
                <button onClick={() => deleteMember(user._id)}>Delete</button>
              </div>
              <div
                style={{
                  marginBottom: "15px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  border: "2px dashed black",
                }}
              >
                <h2 style={{ marginLeft: '10px' }}>Movies Watched</h2> <br />
                <button onClick={() => handleUserSelection(user)} style={{ marginLeft: '10px' }}>
                  Subscribe to a new movie
                </button>

                {isVisible && selectedUser && selectedUser._id === user._id && (
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
          );
        })
      ) : (
        <p>No members found</p>
      )}
    </>
  );
};

export default AllMembers;
