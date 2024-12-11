import download from "../assets/download.png";
import { useEffect, useState } from "react";
import { auth, db } from "../Configuration";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Profile() {
  console.log(auth.currentUser);

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [photo, setPhoto] = useState();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const authe = auth.currentUser;
    const docRef = doc(db, "users", authe?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document Data:", docSnap.data());
      setName(docSnap.data().name);
    } else {
      console.log("No Such Document!");
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user?.email);
        setName(user?.displayName);
        setPhoto(user.photoURL);
        fetchUser();
      }
    });
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <section className="w-screen h-screen bg-slate-200 flex  flex-col gap-7 justify-center items-center">
      <p className="text-6xl font-semibold text-teal-900">PROFILE</p>
      <div className="w-1/3 py-7 px-7 flex  justify-start items-center gap-3 bg-white rounded-lg">
        <img src={photo} alt="profile" className="w-40 rounded-full" />

        <div className="flex flex-col gap-4 ml-5">
          <p className="text-teal-900 text-xl font-bold">{name}</p>
          <p className="text-teal-900 text-xl font-bold">{email}</p>
          <button
            className="bg-teal-900 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={handleLogout}
          >
            SIGN OUT
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
