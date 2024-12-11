import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Configuration";

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [cPassword, setCpassword] = useState();
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handlesignup = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("signup successfull", userCredential);
        setDoc(doc(db, "users", userCredential?.user?.email), {
          name: name,
          email: email,
        }).then(() => {
          navigate("/profile");
        });
        // ...
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);

        navigate("/profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        const errorMessage = error.message;
        console.log(errorMessage);

        const email = error.customData.email;
        console.log(email);

        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  return (
    <>
      <section className="w-screen h-screen flex flex-col justify-center items-center bg-slate-200">
        <div className="w-3/4 flex flex-col justify-center items-center gap-3 ">
          <form className="flex flex-col gap-5 justify-center items-center border rounded-lg bg-white w-1/3  py-5">
            <p className="font-bold text-4xl mb- text-teal-900">WildView</p>
            <input
              onChange={(e) => setName(e.target.value)}
              className="py-2 px-5 bg-slate-200 rounded-lg"
              type="text"
              placeholder="Name"
              required
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-5 bg-slate-200 rounded-lg"
              type="email"
              placeholder="Email"
              required
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-5 bg-slate-200 rounded-lg"
              type="password"
              placeholder="Password"
              required
            />
            <input
              onChange={(e) => setCpassword(e.target.value)}
              className="py-2 px-5 bg-slate-200 rounded-lg"
              type="password"
              placeholder="Confirm Password"
              required
            />
            <button
              onClick={handlesignup}
              className="bg-teal-900 text-white font-semibold py-2 px-20 rounded-lg"
            >
              SIGN UP
            </button>
            <div className="flex gap-4 items-center">
              <p className="text-teal-600 ">Signup with</p>

              <FaGoogle onClick={handleGoogle} />

              <FaFacebook />
            </div>
            <Link to="/" className="text-teal-600 hover:text-teal-900 -mt-4">
              Already Have An Account
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signup;
