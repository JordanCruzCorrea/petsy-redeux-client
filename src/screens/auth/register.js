import React, { useState } from "react";
import Form from "../../components/form/form";

export default function Register({ register }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    register(formData);
  };

  return (
    <Form
      type="Register"
      username={username}
      email={email}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}