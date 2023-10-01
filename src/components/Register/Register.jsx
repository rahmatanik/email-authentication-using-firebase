import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/forenase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);

    // reset error

    setRegisterError(" ");
    setSuccess("");

    if (password.length < 8) {
      setRegisterError("Password should be at least 8 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one upper case characters"
      );
      return;
    } else if (!accepted) {
      setRegisterError("Please accept our terms and conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User created successfully");

        // update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => console.log("profile updated"))
          .catch((error) => console.log(error));

        //send email verification:
        sendEmailVerification(result.user).then(() => {
          alert("please check your email and verify now");
        });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className=" p-4">
      <div className="mx-auto md:w-1/2 lg:w-1/4 pt-10">
        <h2 className=" mb-5 text-3xl font-bold my-2">Please Register </h2>
        <form onSubmit={handleRegister} action="">
          <input
            className="mb-4  w-full py-2 px-4 rounded"
            required
            placeholder="Your Name"
            type="text"
            name="name"
          />
          <br />
          <input
            className="mb-4  w-full py-2 px-4 rounded"
            required
            placeholder="Your Email"
            type="email"
            name="email"
          />
          <br />
          <div className="relative">
            <input
              className=" w-full py-2 px-4 rounded"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
            />
            <span
              className="absolute top-3 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <br />
          <input
            type="checkbox"
            name="terms"
            id="terms"
            className="mb-4 mr-2"
          />
          <label htmlFor="terms">Accept our Terms & Conditions </label>
          <input
            className="mb-4  w-full py-2 px-4 rounded btn btn-secondary"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && <p className="text-red-400">{registerError}</p>}
        {success && <p className="text-green-400">{success}</p>}
        <p>
          Already have an account? Please{" "}
          <Link to="/login">
            <span className="text-green-200">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
