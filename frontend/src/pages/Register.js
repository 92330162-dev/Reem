import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [students, setStudents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    age: "",
    country: "",
    language: "",
    level: ""
  });

  useEffect(() => {
    api.get("/register").then(res => setStudents(res.data));
    api.get("/countries").then(res => setCountries(res.data));
    api.get("/languages").then(res => setLanguages(res.data));
  }, []);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/register", formData);
    const res = await api.get("/register");
    setStudents(res.data);
  };

  const handleDelete = async id => {
    await api.delete(/register/${id});
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="full_name" onChange={handleChange} placeholder="Name" />
        <input name="phone" onChange={handleChange} placeholder="Phone" />
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input name="age" onChange={handleChange} placeholder="Age" />

        <select name="country" onChange={handleChange}>
          <option value="">Country</option>
          {countries.map(c => <option key={c.id}>{c.name}</option>)}
        </select>

        <select name="language" onChange={handleChange}>
          <option value="">Language</option>
          {languages.map(l => <option key={l.id}>{l.name}</option>)}
        </select>

        <select name="level" onChange={handleChange}>
          <option value="">Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <table>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>{s.full_name}</td>
              <td>
                <Link to={/update-register/${s.id}}>Edit</Link>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Register;
