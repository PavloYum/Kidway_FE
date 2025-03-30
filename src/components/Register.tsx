import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [tel, setTel] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email,
        password,
        firstName,
        secondName,
        tel,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/organizations");
      }
    });
  };

  return (
    <div className="card">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Second Name"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
          required
        />
        <input
          type="tel"
          className="form-control"
          placeholder="Phone"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100" disabled={status === "loading"}>
          {status === "loading" ? "Registering..." : "Register"}
        </button>
        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}
      </form>
      <p className="text-center mt-3">
        Already have an account?{" "}
        <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;