import React, { useState, useEffect } from "react";
import axios from "axios";
import '../assets/register.css';
import { Link } from "react-router-dom";

const Register = () => {

 const [StudentList, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/register")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/register/${id}`);
    setStudents(StudentList.filter(std => std.id !== id));
  };
  
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        email: "",
        country: "",
        language: "",
        level: "",
        age:""
    });

   const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:5000/register", {
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      age: formData.age,
      country: formData.country,
      language: formData.language,
      level: formData.level,
    });

    const res = await axios.get("http://localhost:5000/register");
    setStudents(res.data);

    setFormData({
      full_name: "",
      phone: "",
      email: "",
      age: "",
      country: "",
      language: "",
      level: "",
    });

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
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
        <div className="App">

            <main id="register" className="page">
                <div className="management-container">

                    
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
                                    <label>Age</label>
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

                            <div className="form-actions">
                                <button type="submit" className="update-btn">Register</button>
                            </div>
                        </form>
                    </div>

                    {/* Table Section */}
                    <div className="table-container">
                        <h2>📊 Registered Students</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Country</th>
                                    <th>Language</th>
                                    <th>Level</th>
                                    <th>Age</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {StudentList.length === 0 ? (
                                    <tr>
                                        <td className="no-data" colSpan="9" style={{ textAlign: "center", fontStyle: "italic" }}>
                                            No students registered yet
                                        </td>
                                    </tr>
                                ) : (
                                    StudentList.map((StudentItem, key) => (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{StudentItem.full_name}</td>
                                            <td>{StudentItem.phone}</td>
                                            <td>{StudentItem.email}</td>
                                            <td>{StudentItem.country}</td>
                                            <td>{StudentItem.language}</td>
                                            <td>{StudentItem.level}</td>
                                            <td>{StudentItem.age}</td>
                                            <td>
                                                <Link to={`/update-register/${StudentItem.id}`} className="update-btn">Update</Link>
                                                <button className="delete-btn" onClick={() => handleDelete(StudentItem.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Register;