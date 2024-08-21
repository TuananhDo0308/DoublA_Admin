"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import Chart from "@/components/Charts/page";

export default function Home() {
  const { user, signOut } = useAuth();

  // If the user is not logged in, show the SignIn page
  if (!user) {
    return <div style={{ height: "100vh" }}>
      <SignIn />
    </div>
  }
  useEffect(() => {
    console.log(user);
  }, [user]); // Dependency array with `user`

  
const SignUp = () => {
  signOut()
}

  return (
    <DefaultLayout>
      <Chart/>
    </DefaultLayout>
  );
}
