import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const UpdateLanguage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name:"",flag:"",speakers:"",info:"" });

  useEffect(() => {
    api.get(/languages/${id}).then(res => setFormData(res.data));
  }, [id]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.put(/languages/${id}, formData);
    navigate("/language-management");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="flag" value={formData.flag} onChange={handleChange} />
      <input name="speakers" value={formData.speakers} onChange={handleChange} />
      <textarea name="info" value={formData.info} onChange={handleChange} />
      <button>Update</button>
    </form>
  );
};

export default UpdateLanguage;
