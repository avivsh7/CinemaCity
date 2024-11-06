    import { useNavigate } from "react-router-dom";
    import { useState } from "react";

    const AddMovie = () => {
        const [name, setName] = useState('')
        const [premiered, setPremiered] = useState('')
        const [genres, setGenres] = useState('')
        const [img, setImg] = useState('')
        const navigate = useNavigate()

        const handleSave = async () => {
            try {
                const response = await fetch('http://localhost:3000/addMovie', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        genres: genres.split(',').map(genre => genre.trim()),
                        img,
                        premiered
                    })
                });
                if (response.ok) {
                    alert("Movie added successfully!")
                    navigate('/movies/allMovies');
                } else {
                    console.error('Failed to add movie')
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }

        return (
            <>
    <div style={{marginLeft: '10px', border: '2px solid black'}}>
                    <div style={{marginLeft:'10px', marginTop:'10px'}}>
                        Name:  <input onChange={(e) => setName(e.target.value)} type="text" /> <br />
                        Genres: <input onChange={(e) => setGenres(e.target.value)} type="text" /> <br /> 
                        image url: <input onChange={(e) => setImg(e.target.value)} type="text" /> <br />
                        Premiered <input onChange={(e) => setPremiered(e.target.value)} type="date" name="" id="" /> <br />
                        <button onClick={handleSave} style={{marginRight: '2px'}}>Save</button> 
                        <button onClick={() => navigate("/movies/allMovies")}>Cancel</button>
                    </div >
    </div>

            </>
        );
    };

    export default AddMovie;
