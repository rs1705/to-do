import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";
export const AuthContext = createContext({
  user: null,
  userLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logIn = async (username, password) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      if (user) {
        setUser(user);
        toast.success("Login successful!");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error("Invalid credentials");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (e) {
      toast.success("Error logging out!!");
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });
      if (user) {
        setUser(user);
      }
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        setUser(user);
        console.log(user);
        toast.success("Google sign in successful!");
        return true;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const authCtx = {
    user,
    userLoggedIn: !!user,
    logIn,
    logOut,
    signUp,
    signInWithGoogle,

    loading,
  };
  return (
    <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
