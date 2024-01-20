// ASSETS
import { warningIcon, googleIcon } from "../../assets/MUI-icons";

// STYLES
import "./Login.scss";

// LIBRARIES
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { signInWithPopup } from "firebase/auth";

// MISC
import { useForm } from "../../hooks/useForm";
import { auth, provider } from "../../config/firebase";

// COMPONENTS
import CustomInput from "../../atoms/CustomInput";
import CustomButton from "../../atoms/CustomButton";

// CONFIGURATION
const Login = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { inputValues, handleInputChange } = useForm({
    email: "",
    password: "",
  });
  // LIFE CYCLE

  // EVENT HANDLERS
  const handleSubmit = (event, isAdmin) => {
    event.preventDefault();

    //if email does not match with the one in localStorage show error
    if (inputValues.email !== localStorage.getItem("Email", inputValues.email)) {
      setEmailError("Email is not correct");
    } else setEmailError("");

    //if password does not match with the localStorage show error
    if (inputValues.password !== localStorage.getItem("Password", inputValues.password)) {
      setPasswordError("Wrong password");
    } else setPasswordError("");

    //if both conditions are met login (navigate to main page & create a token)
    if (
      inputValues.email === localStorage.getItem("Email", inputValues.email) &&
      inputValues.password === localStorage.getItem("Password", inputValues.password)
    ) {
      navigate("/");

      isAdmin ? sessionStorage.setItem("adminToken", nanoid()) : sessionStorage.setItem("token", nanoid());
    } else console.log("login failed");
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);

    console.log(result);
    navigate("/");
    sessionStorage.setItem("token", nanoid());
  };

  return (
    <div className="login-container">
      <h1 className="login-logo" onClick={() => navigate("/")}>
        aStore
      </h1>

      <form onSubmit={(event) => handleSubmit(event, false)} className="login-form">
        <div className="login-inputs">
          <h1>Sign in</h1>

          <div className={emailError ? "login-fields red" : "login-fields"}>
            <span>Email</span>
            <CustomInput type="text" name="email" value={inputValues.email} onChange={handleInputChange} />
            {emailError && (
              <div className="login-error">
                {warningIcon} {emailError}
              </div>
            )}
          </div>

          <div className={passwordError ? "login-fields red" : "login-fields"}>
            <span>Password</span>
            <CustomInput type="password" name="password" value={inputValues.password} onChange={handleInputChange} />

            {passwordError && (
              <div className="login-error">
                {warningIcon} {passwordError}
              </div>
            )}
          </div>
        </div>

        <div className="login-inputs">
          <CustomButton type="submit" name="Login" />

          <CustomButton type="button" name="Login as Administrator" onClick={(event) => handleSubmit(event, true)} />

          <div className="login-bottom-text">
            <span>New to aStore? </span>

            <Link to="/register" className="login-link">
              Register
            </Link>
          </div>
          <div className="login-footer">
            <div className="login-break-container">
              <div className="login-break" />
              <span>OR</span>
              <div className="login-break" />
            </div>

            <CustomButton type="button" onClick={signInWithGoogle}>
              {googleIcon}

              <span>Login with Google</span>
            </CustomButton>

            <span className="login-branding">Made by Alexandru-Daniel Sarbu</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
