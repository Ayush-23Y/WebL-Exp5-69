import React, { useState } from "react";
import "./FormComponent.css";

function FormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.name) {
      tempErrors.name = "Name is required";
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }

    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: "", email: "" });
    }
  };

  return (
    <div className="container">
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="output">
          <h3>Submitted Data</h3>
          <p><b>Name:</b> {submittedData.name}</p>
          <p><b>Email:</b> {submittedData.email}</p>
        </div>
      )}
    </div>
  );
}

export default FormComponent;