import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/organizations");
      }
    });
  };

  return (
    <div className="card">
      <h2 className="text-center mb-4">Login</h2>
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
        <button type="submit" className="btn btn-primary w-100" disabled={status === "loading"}>
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}
      </form>
      <p className="text-center mt-3">
        Don't have an account?{" "}
        <a href="/register" onClick={(e) => { e.preventDefault(); navigate("/register"); }}>
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;