import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const UpdateStudents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    age: "",
    country: "",
    language: "",
    level: ""
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/register/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/register/${id}`, formData);
      navigate("/register");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };
 const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/countries")
      .then(res => setCountries(res.data))
      .catch(err => console.log(err));
  }, []);

   const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/languages")
      .then(res => setLanguages(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <h2>Update Student</h2>
      <div className="form-container">
                        <h2>📝 Register to Learn a Language</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                {/*Input*/}
                                <div className="form-group">
                                    <label>Full Name:</label>
                                    <input type="text" name="full_name" required placeholder="Full Name"
                                        value={formData.full_name} onChange={handleChange} />
                                </div>

                                <div className="form-group">
                                    <label>Phone number:</label>
                                    <input type="tel" name="phone" required placeholder="Phone Number"
                                        value={formData.phone} onChange={handleChange} />
                                </div>

                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" name="email" required placeholder="Email"
                                        value={formData.email} onChange={handleChange} />
                                </div>

                                <div className="form-group">
                                    <label>Age: </label>
                                    <input type="text" name="age" required placeholder="Age"
                                        value={formData.age} onChange={handleChange} />
                                </div>


                               {/* Selects */}
                               <div className="form-group">
                                <label>Country: </label>
                                    <select name="country" value={formData.country} onChange={handleChange} > 
                                       <option value="">Select Country</option>
                                       {countries.map((c) => (
                                            <option key={c.id} value={c.name}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Language: </label>
                                    <select name="language" value={formData.language} onChange={handleChange} >
                                        <option value="">Select Language</option>
                                            {languages.map((lang) => (
                                            <option key={lang.id} value={lang.name}>
                                                {lang.name}
                                            </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Level: </label>
                                    <select name="level" value={formData.level} onChange={handleChange} required>
                                        <option value="">Select Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Elementary">Elementary</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Native">Native</option>
                                    </select>
                                </div>

                            </div>
                            <button type="submit" className="update-btn">Update</button>
                                {error && <p>Something went wrong!</p>}

                            </form>
    </div>
      <Link to="/register">Back to Students</Link>
    </div>
  );
};

export default UpdateStudents;
