import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const UpdateStudents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    api.get(/register/${id}).then(res => setFormData(res.data));
  }, [id]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.put(/register/${id}, formData);
    navigate("/register");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="full_name" value={formData.full_name || ""} onChange={handleChange} />
      <button>Update</button>
    </form>
  );
};

export default UpdateStudents;
