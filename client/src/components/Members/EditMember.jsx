import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const EditMember = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const member = state.user;

  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [city, setCity] = useState(member.city);

  const updateMember = async () => {
    try {
      const response = await fetch(`http://localhost:3000/editmember/${member._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, city }),
      });

      if (!response.ok) {
        throw new Error('Failed to update member');
      }

      const data = await response.json();
      alert('Member updated successfully!');
      navigate('/allmembers');
    } catch (error) {
      alert('Error updating member: ' + error.message);
    }
  };

  return (
    <>
<div style={{marginLeft: '10px'}}>
          <h3 style={{ fontWeight: "bold" }}>Edit Member : {member.name}</h3>
          Name:{" "}
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
          />
          <br />
          Email:{" "}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email}
          />
          <br />
          City:{" "}
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            value={city}
          />
          <br />
          <button onClick={updateMember}>Update</button>
          <button onClick={() => navigate("/allmembers")}>Cancel</button>
          <br />
</div>
    </>
  );
};

export default EditMember;
