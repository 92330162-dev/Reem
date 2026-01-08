import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const LanguageManagement = () => {
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    flag: "",
    speakers: "",
    info: ""
  });

  const fetchLanguages = async () => {
    const res = await api.get("/languages");
    setLanguages(res.data);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/languages", formData);
    setFormData({ name: "", flag: "", speakers: "", info: "" });
    fetchLanguages();
  };

  const handleDelete = async (id) => {
    await api.delete(/languages/${id});
    fetchLanguages();
  };

  return (
    <div className="form-container">
      <h2>➕ Add Language</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="flag" value={formData.flag} onChange={handleChange} placeholder="Flag" required />
        <input name="speakers" value={formData.speakers} onChange={handleChange} placeholder="Speakers" required />
        <textarea name="info" value={formData.info} onChange={handleChange} placeholder="Info" required />
        <button type="submit">Add</button>
      </form>

      <table>
        <tbody>
          {languages.map((l, i) => (
            <tr key={l.id}>
              <td>{i + 1}</td>
              <td>{l.flag}</td>
              <td>{l.name}</td>
              <td>
                <Link to={/update-languages/${l.id}}>Edit</Link>
                <button onClick={() => handleDelete(l.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LanguageManagement;
