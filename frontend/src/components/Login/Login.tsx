import { useState } from "react";
import { Link } from "react-router";
import { AuthProps, AuthType } from "./Login.types";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export const Login = ({ componentType }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await api.post(
        componentType === "signin" ? "/auth/signin" : "/auth/signup",
        {
          email,
          password,
        }
      );
      const data = resp.data;
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const authText = componentType !== AuthType.SIGNIN ? "Sign up" : "Sign in";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">{authText}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            {authText}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {componentType === AuthType.SIGNIN
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            to={componentType === AuthType.SIGNIN ? "/signup" : "/signin"}
            className="text-blue-500 hover:underline font-medium"
          >
            {componentType === AuthType.SIGNIN ? " Sign up" : " Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};
