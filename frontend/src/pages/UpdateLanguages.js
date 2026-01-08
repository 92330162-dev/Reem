import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const UpdateLanguage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    flag: "",
    speakers: "",
    info: ""
  });
  const [error, setError] = useState(false);

  // Load language data by id
  useEffect(() => {
    axios.get(`http://localhost:5000/languages/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/languages/${id}`, formData);
      navigate("/language-management"); 
    
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Language</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Language Name:</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g., Klingon"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Flag / Symbol:</label>
            <input
              type="text"
              name="flag"
              required
              placeholder="e.g., 🏴"
              value={formData.flag}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Speakers:</label>
            <input
              type="text"
              name="speakers"
              required
              placeholder="e.g., 500,000"
              value={formData.speakers}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Description / Info:</label>
            <textarea
              name="info"
              rows="3"
              required
              placeholder="Brief description of the language"
              value={formData.info}
              onChange={handleChange}
            />
          </div>

        </div>

        <button type="submit" className="update-btn">Update Language</button>
        {error && <p style={{ color: 'red' }}>Something went wrong!</p>}
      </form>

      <Link to="/language-management">Back to Languages Management</Link>
    </div>
  );
};

export default UpdateLanguage;
