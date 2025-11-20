import "../styles/auth.css";
const Signup = () => {
  return (
    <div>
      <h1>Signup Page</h1>
      <p>This is where the signup form will go.</p>
      <form className="signup-container">
        <input type="text" placeholder="First Name" required />
        <input type="text" placeholder="Last Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="number" placeholder="Phone Number" required />
        <input type="text" placeholder="Address" required />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
