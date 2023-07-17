import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { signup } from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

     // Validar campos vacíos
     if (
      nameRef.current.value.trim() === "" ||
      emailRef.current.value.trim() === "" ||
      passwordRef.current.value.trim() === "" ||
      passwordConfirmationRef.current.value.trim() === ""
    ) {
      setErrors({ form: ["All fields are required"] });
      return;
    }
    
    // Validaciones de campos
    let formIsValid = true;

    if (payload.name.trim() === "") {
      formIsValid = false;
      setErrors({ ...errors, name: ["Name is required"] });
    }

    if (payload.email.trim() === "") {
      formIsValid = false;
      setErrors({ ...errors, email: ["Email is required"] });
    }

    if (payload.password.trim() === "") {
      formIsValid = false;
      setErrors({ ...errors, password: ["Password is required"] });
    }

    if (payload.password !== payload.password_confirmation) {
      formIsValid = false;
      setErrors({
        ...errors,
        password_confirmation: ["Passwords do not match"],
      });
    }
    console.log(payload);
   

    if (!formIsValid) {
      return;
    }

    try {
      const { data } = await axiosClient.post("/signup", payload);
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      const response = error.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      } else {
        setErrors({ form: ["An error occurred. Please try again later."] });
      }
    }
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={nameRef} placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Repeat Password"
          />
      
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
