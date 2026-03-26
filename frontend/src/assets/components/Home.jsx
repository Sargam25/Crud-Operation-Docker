import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [getData, setData] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Optional: track loading

  useEffect(() => {
    axios.get("http://localhost:5050/")
      .then(response => {
        // Make sure data is an array
        const data = Array.isArray(response.data) ? response.data : response.data?.results || [];
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setData([]); // fallback to empty array
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5050/delete/${id}`)
      .then(() => {
        // Remove deleted item from state instead of reloading
        setData(prev => prev.filter(item => item.id !== id));
      })
      .catch(error => console.error("Error deleting:", error));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="d-flex flex-column vh-100 bg-light justify-content-center align-items-center">
      <h4>Sample Data Set</h4>
      <div className="w-50 mt-2 bg-white rounded p-3">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-dark btn-sm">Add Data</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(getData) && getData.length > 0 ? (
              getData.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <Link to={`/read/${data.id}`} className="btn btn-dark btn-sm">Read</Link>
                    <Link to={`/update/${data.id}`} className="btn btn-outline-dark btn-sm mx-2">Update</Link>
                    <button onClick={() => handleDelete(data.id)} className="btn btn-dark btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
