import { useRef, useState, useContext } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { AuthContext } from "../context/AuthContext";
import { TodoContext } from "../context/TodoContext";
const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [msg, setMsg] = useState("");
  const { logIn, loading } = useContext(AuthContext);
  const setSelectedId = useContext(TodoContext).setSelectedId;

  const signupHandler = () => {
    setSelectedId("signup");
  };
  const signInHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const loginStatus = await logIn(username, password);
    if (loginStatus) {
      setSelectedId(null);
    } else {
      setMsg("Email or password incorrect!");
      setSelectedId("signin");
    }
  };

  return (
    <div className="mt-40 ml-2 border-2 border-slate-300 rounded-xl py-5 px-2 w-[100%]">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <p className="text-md text-slate-500 text-center mb-2">
        Login with your credentials to save your data.
      </p>
      <p className="text-md text-center text-red-500 font-semibold mb-2">
        {msg}
      </p>
      <form method="submit" onSubmit={signInHandler}>
        <Input
          title="Username"
          style="mb-3"
          labelled
          ref={usernameRef}
          name="username"
          minLength="6"
          required
        />
        <Input
          title="Password"
          type="password"
          style="mb-3"
          name="password"
          minLength="6"
          labelled
          ref={passwordRef}
          required
        />
        <div className="flex flex-col h-full items-center mt-2">
          <Button style="w-20" title={loading ? "Signing In..." : "Sign in"} />
          <p className="text-center">or</p>
          <Button
            title="Sign Up"
            type="button"
            onClick={signupHandler}
            style="bg-transparent text-slate-900 hover:bg-transparent hover:text-slate-400"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
