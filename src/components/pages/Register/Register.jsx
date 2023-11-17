// ASSETS
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// STYLES
import "./Register.scss";

// LIBRARIES
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// MISC
import { useForm } from "../../hooks/useForm";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";

// CONFIGURATION
const Register = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState(false);
  const [confPassError, setConfPassError] = useState("");
  const { inputValues, handleInputChange } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // LIFE CYCLE

  // EVENT HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();

    // if name is empty show error else show nothing
    if (inputValues.name.trim() === "") {
      setNameError("Enter your name");
    } else {
      setNameError("");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // if email empty or is not email type show error message else show nothing
    if (inputValues.email.trim() === "") {
      setEmailError("Enter your email address");
    } else if (!emailRegex.test(inputValues.email)) {
      setEmailError("Wrong or Invalid email address. Please correct and try again.");
    } else {
      setEmailError("");
    }

    const passRegex = /^.{8,}$/;

    //if password is more than 8 characters show nothing else show error
    if (passRegex.test(inputValues.password)) {
      setPassError("");
    } else {
      setPassError("Minimum 8 characters required");
    }

    // if confirmPass empty or passwords are not the same, show error, else show nothing
    if (inputValues.confirmPassword === "") {
      setConfPassError("Type your password again");
    } else if (inputValues.password !== inputValues.confirmPassword) {
      setConfPassError("Passwords must match");
    } else {
      setConfPassError("");
    }

    // if all of the above conditions are true, save data in localStorage and redirect to login page
    if (
      inputValues.name.trim() !== "" &&
      emailRegex.test(inputValues.email) &&
      passRegex.test(inputValues.password) &&
      inputValues.password === inputValues.confirmPassword
    ) {
      localStorage.setItem("Username", inputValues.name);
      localStorage.setItem("Email", inputValues.email);
      localStorage.setItem("Password", inputValues.password);
      localStorage.setItem("Confirm Password", inputValues.confirmPassword);

      navigate("/login");
    } else console.log("register failed");
  };

  return (
    <div className="register-container">
      <h1 className="register-logo" onClick={() => navigate("/")}>
        aStore
      </h1>

      <form onSubmit={handleSubmit} className="register-form">
        <h1>Create account</h1>

        <div className={nameError ? "register-fields red" : "register-fields"}>
          <span>Your name</span>
          <CustomInput
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
            placeholder="First and last name"
          />

          {nameError && (
            <div className="register-error">
              <InfoOutlinedIcon /> {nameError}
            </div>
          )}
        </div>

        <div className={emailError ? "register-fields red" : "register-fields"}>
          <span>Email</span>
          <CustomInput type="text" name="email" value={inputValues.email} onChange={handleInputChange} />

          {emailError && (
            <div className="register-error">
              <InfoOutlinedIcon />

              {emailError}
            </div>
          )}
        </div>

        <div className={passError ? "register-fields red" : "register-fields"}>
          <span>Password</span>
          <CustomInput
            type="password"
            name="password"
            value={inputValues.password}
            onChange={handleInputChange}
            placeholder="At least 8 characters"
          />

          {passError ? (
            <div className="register-error">
              <InfoOutlinedIcon /> {passError}
            </div>
          ) : (
            <div className="register-text">
              <InfoOutlinedIcon /> Passwords must be at least 8 characters
            </div>
          )}
        </div>

        <div className={confPassError ? "register-fields red" : "register-fields"}>
          <span>Re-enter password</span>
          <CustomInput
            type="password"
            name="confirmPassword"
            value={inputValues.confirmPassword}
            onChange={handleInputChange}
          />

          {confPassError && (
            <div className="register-error">
              <InfoOutlinedIcon /> {confPassError}
            </div>
          )}
        </div>

        <CustomButton type="submit" name="Register" />

        <div className="register-footer-text">
          <span>Already have an account?</span>
          <Link to="/login" className="register-link">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
