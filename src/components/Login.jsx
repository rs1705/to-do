import Input from "../UI/Input";
import Button from "../UI/Button";
const Login = () => {
  const loginHandler = () => {};
  return (
    <div className="mt-40 ml-2 border-2 border-slate-300 rounded-xl py-5 px-2 w-[100%]">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <p className="text-sm text-slate-500 text-center mb-2">
        Login with your credentials to save your data.
      </p>
      <Input title="Username" style="mb-3" labelled />
      <Input title="Password" style="mb-3" labelled />
      <div className="flex justify-end mt-2">
        <Button
          title="Clear"
          onClick=""
          style="bg-transparent text-slate-900 hover:bg-transparent hover:text-slate-400"
        />
        <Button title="Login" onClick={loginHandler} />
      </div>
    </div>
  );
};

export default Login;
