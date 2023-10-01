import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase/forenase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    // reset error and success
    setRegisterError("");
    setSuccess("");

    // add validation
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setSuccess("User logged in successfully");
        } else {
          alert("please verify your email address");
        }
      })

      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please provide an email", emailRef.current.value);
      return;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      console.log("Please write a valid email");
    }
    // send validation email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero  ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:center"></div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl font-bold my-2">Please Login!</h1>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label"></label>
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="email"
                  name="email"
                  className="input input-bordered my-2"
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a
                    onClick={handleForgetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {registerError && <p className="text-red-400">{registerError}</p>}
            {success && <p className="text-green-400">{success}</p>}
            <p>
              New to this website? Please{" "}
              <Link to="/register">
                <span className="text-green-200">Register</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
