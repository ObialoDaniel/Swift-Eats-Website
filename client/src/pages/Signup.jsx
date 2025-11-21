import "../styles/auth.css";
import { signupUser } from "../api/auth";
import { useState } from "react";
import signupImg from "../assets/signup-image.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signupUser(formData);
    setLoading(false);
  };
  return (
    <section className="signup-container">
      <div className="signup-left">
        <div className="signup-image">
          <img src={signupImg} alt="Signup" />
        </div>
      </div>
      <div className="signup-form-container">
        <div className="form-header">
          <h1 className="header-text">Create Account</h1>
          <p className="header-p">Enter Details below to create an account</p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="form-signupwithgoogle">
            <p className="span-text">Or sign up with Google</p>
            <button type="button" className="google-signup-button">
              <img src="images/google-icon.png" alt="Google" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
