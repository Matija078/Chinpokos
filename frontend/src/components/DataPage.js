import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './DataPage.css';
// DataPage komponenten viser en liste over Chinpokomons fra MongoDB databasen.
function DataPage() {
  // useState hooks for å håndtere forskjellige deler av applikasjonens tilstand
  const [chinpokomons, setChinpokomons] = useState([]); // Liste over Chinpokomons
  const [isLoading, setIsLoading] = useState(true); //Laster inn data eller ikke
  const [error, setError] = useState(''); // Eventuelle feilmeldinger
  const [editItemId, setEditItemId] = useState(null); // IDen til Chinpokomon som blir redigert
  const [editedItem, setEditedItem] = useState({}); // Data for Chinpokomon som blir redigert
  // useHistory og useLocation hooks for å håndtere navigasjon og tilgang til rutenes tilstand
  const history = useHistory();
  const location = useLocation();
  const usersName = location.state?.usersName || '';
  // useEffect hook for å hente data når komponenten mountes
  useEffect(() => {
    fetchData();
  }, []);
  // Henter data fra API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chinpokomons', {
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      console.log('Data fetched:', data);
      setChinpokomons(data.slice(0, 10)); // Show only the first ten entries
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError('Failed to fetch data');
    }
  };
  // Sletter et element fra databasen
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/chinpokomons/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setChinpokomons(chinpokomons.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  // Setter en Chinpokomon til å bli redigert
  const handleEdit = (id, currentItem) => {
    setEditItemId(id);
    setEditedItem(currentItem);
  };
  // Håndterer endringer i feltene til det redigerte elementet
  const handleFieldChange = (e) => {
    setEditedItem((prevItem) => ({
      ...prevItem,
      [e.target.name]: e.target.value,
    }));
  };
  // Oppdaterer et element i databasen
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/chinpokomons/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedItem),
        }
      );
      if (response.ok) {
        const updatedItem = await response.json();
        setChinpokomons((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, ...updatedItem } : item
          )
        );
        setEditItemId(null);
        setEditedItem({});
      } else {
        setError('Failed to update data');
      }
    } catch (err) {
      console.error(err);
    }
  };
  // Logger ut brukeren
  const handleLogout = () => {
    history.push('/');
  };
  // Returnerer JSX for å vise data og interaktivitet til brukeren
  return (
    <div>
      <div className="button">
        <img
          className="img"
          src={`${process.env.PUBLIC_URL}/logo.jpg`}
          alt="Logo"
          style={{ width: '100px' }}
        />
        <button className="users">{usersName}</button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h1 className="text">Chinpokomons</h1>
      {error && <div>{error}</div>}
      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <div className="chinpokomon-container">
          {chinpokomons.map((item) => (
            <div key={item._id} className="chinpokomon-item">
              {editItemId === item._id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedItem.name || ''}
                    onChange={handleFieldChange}
                  />
                  <input
                    type="text"
                    name="type"
                    value={editedItem.type || ''}
                    onChange={handleFieldChange}
                  />
                  <input
                    type="text"
                    name="description"
                    value={editedItem.description || ''}
                    onChange={handleFieldChange}
                  />
                  <br />
                  <button onClick={() => handleUpdate(item._id)}>Update</button>
                </>
              ) : (
                <>
                  <h2>{item.name}</h2>
                  <p>
                    <b>Type: </b>
                    {item.type}
                  </p>
                  <p>
                    <b>Description:</b> {item.description}
                  </p>
                  <img src={item.imageUrl} alt={item.name} />
                  <br />
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                  <br />
                  <button onClick={() => handleEdit(item._id, item)}>
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// Export component for use in other parts of the application
export default DataPage;
