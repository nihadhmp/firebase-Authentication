import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = getAuth();
  const navigate = useNavigate();

  const handlesignin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in'
        console.log(userCredential, "signed in succssfully ");

        navigate("/profile");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  return (
    <>
      <section className="w-screen h-screen flex flex-col justify-center items-center bg-slate-200">
        <div className="w-3/4 flex flex-col justify-center items-center gap-5 h-5/6">
          <h2 className="font-bold text-5xl text-teal-950">WELCOME</h2>
          <form className="flex flex-col gap-5 justify-center items-center border rounded-lg bg-white w-1/3 h-4/6 ">
            <p className="font-bold text-4xl mb- text-teal-900">WildView</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 bg-slate-200 rounded-lg"
              type="email"
              placeholder="Email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 bg-slate-200 rounded-lg"
              type="password"
              placeholder="Password"
              required
            />
            <button
              onClick={handlesignin}
              className="bg-teal-900 text-white font-semibold py-2 px-20 rounded-lg"
            >
              LOG IN
            </button>
            <div className="flex flex-col justify-center items-center">
              <Link
                to="/signup"
                className="text-sm  text-teal-600 hover:text-teal-900"
              >
                Forgot Password
              </Link>
              <Link to="/signup" className="text-teal-600 hover:text-teal-900">
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
