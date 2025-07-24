import { useRef, useContext, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { TodoContext } from "../context/TodoContext";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const setSelectedId = useContext(TodoContext).setSelectedId;
  const { signUp, signInWithGoogle } = useContext(AuthContext);

  const [msg, setMsg] = useState("");

  const signupHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (name.trim().length < 1 || password.trim().length < 6 || !email) {
      setMsg("All the fields are required to signup!");
      return;
    }
    await signUp(name, email, password);
    setSelectedId(null);
  };
  const googleSignInHandler = async () => {
    const loginStatus = await signInWithGoogle();
    if (loginStatus) {
      setSelectedId(null);
    } else {
      setSelectedId("signup");
    }
  };
  return (
    <div className="mt-40 ml-2 border-2 border-slate-300 rounded-xl py-5 px-2 w-[100%]">
      <h2 className="text-2xl font-semibold text-center">Sign up</h2>
      <p className="text-md text-slate-500 text-center mb-2">
        Enter below details to signup with Task Manager
      </p>
      <p className="text-md text-center text-red-500 font-semibold mb-2">
        {msg}
      </p>
      <p className="text-md text-center text-red-500 font-semibold mb-2"></p>
      <form method="submit" onSubmit={signupHandler}>
        <Input
          title="Name"
          style="mb-3"
          labelled
          name="name"
          minLength="2"
          ref={nameRef}
          required
        />
        <Input
          title="Email"
          type="email"
          style="mb-3"
          name="email"
          minLength="6"
          labelled
          ref={emailRef}
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
          <Button style="w-20" type="submit" title="Sign up" />
          <p className="text-center">or</p>
          <Button
            title="Continue with Google"
            type="button"
            onClick={googleSignInHandler}
            style="bg-transparent text-slate-900 hover:bg-transparent hover:text-slate-400"
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
