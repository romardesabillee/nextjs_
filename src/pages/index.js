import axios from "axios";
import { useEffect, useState } from "react"


export default function Home() {
  const [musicians, setMusicians] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.API_URL}/api/albums/`).then((resp) => {
      setAlbums(resp.data);
    })
    axios.get(`${process.env.API_URL}/api/albums/musicians/`).then((resp) => {
      setMusicians(resp.data);
    })
  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    if(!id) {
      // create 
      axios.post(`${process.env.API_URL}/api/albums/`, {
        artist: e.target.artist.value,
        name: e.target.name.value,
        date: e.target.date.value,
        stars: e.target.stars.value
      }).then((resp) => {
        setAlbums([...albums, resp.data]);
        e.target.reset();
      });
    } else {
      // update
      axios.put(`${process.env.API_URL}/api/albums/${id}/`, {
        artist: e.target.artist.value,
        name: e.target.name.value,
        date: e.target.date.value,
        stars: e.target.stars.value
      }).then((resp) => {
        setAlbums(albums.map((a) => a.id === id ? resp.data : a));
        e.target.reset();
      });
    }
  }

  function handleDelete(id) {
    axios.delete(`${process.env.API_URL}/api/albums/${id}/`).then(() => {
      setAlbums(albums.filter((a) => a.id !== id));
    });
  }

  function handleUpdate(album) {
    setId(album.id);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <input name="name" type="text" placeholder="name" />
        <br/>
        <input name="date" type="date" placeholder="date" />
        <br/>
        <input name="stars" type="number" placeholder="stars" />
        <br/>
        <select name="artist">
          {musicians.map((m) => (
            <option value={m.id} key={m.id}>
              {m.first_name} {m.last_name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">
          {id ? "Update" : "Create"}
        </button>
        {id && (
          <button 
            onClick={() => setId(null)}
            type="button">
              Cancel
          </button>
        )}
      </form>
      <br />
      <br />
      <table border="1">
        <thead>
          <tr>
            <td>id</td>
            <td>album name</td>
            <td>date</td>
            <td>stars</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {albums.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.stars}</td>
              <td>{a.date}</td>
              <td>
                <button onClick={() => handleDelete(a.id)}>Delete</button>
                <button onClick={() => handleUpdate(a)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
