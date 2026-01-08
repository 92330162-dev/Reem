import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LanguageManagement = () => {
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    flag: "",
    speakers: "",
    info: ""
  });

  // جلب كل اللغات
  const fetchLanguages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/languages");
      setLanguages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  // التعامل مع الفورم
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/languages", formData);
      setFormData({ name: "", flag: "", speakers: "", info: "" });
      fetchLanguages();
    } catch (err) {
      console.log(err);
    }
  };

  // حذف اللغة
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/languages/${id}`);
      fetchLanguages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <main id="language-management" className="page">
        <div className="management-container">

          {/* Form لإضافة لغة جديدة */}
          <div className="form-container">
            <h2>➕ Add Language</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Language Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Flag:</label>
                  <input
                    type="text"
                    name="flag"
                    required
                    placeholder="🏴"
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
                    placeholder="e.g., 1,000,000"
                    value={formData.speakers}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Description:</label>
                  <textarea
                    name="info"
                    rows="3"
                    required
                    placeholder="Brief info"
                    value={formData.info}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">Add Language</button>
              </div>
            </form>
          </div>

          {/* Table لإدارة كل اللغات */}
          <div className="table-container">
            <h2>📋 Managed Languages</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Flag</th>
                  <th>Name</th>
                  <th>Speakers</th>
                  <th>Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {languages.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", fontStyle: "italic" }}>
                      No languages added yet
                    </td>
                  </tr>
                ) : (
                  languages.map((lang, idx) => (
                    <tr key={lang.id}>
                      <td>{idx + 1}</td>
                      <td>{lang.flag}</td>
                      <td>{lang.name}</td>
                      <td>{lang.speakers}</td>
                      <td>{lang.info}</td>
                      <td>
                        <Link to={`/update-languages/${lang.id}`} className="update-btn">Edit</Link>
                        <button className="delete-btn" onClick={() => handleDelete(lang.id)}>Delete</button>
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

export default LanguageManagement;
