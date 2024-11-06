import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddMember = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  // Handler for form submission
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/members/addMember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, city }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Display success message
        navigate('/allmembers'); // Redirect to the members list
      } else {
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the member.');
    }
  };

  return (
    <>
      <div style={{ marginLeft: '10px', border: '2px solid black' }}>
        <div style={{ marginLeft: '10px' }}>
          <h3 style={{ fontWeight: 'bold' }}>Add new Member</h3>
          Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
          Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
          City: <input type="text" value={city} onChange={(e) => setCity(e.target.value)} /> <br /> <br />
          <button onClick={handleSave} style={{ marginRight: '2px' }}>Save</button>
          <button onClick={() => navigate('/allmembers')}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default AddMember;
