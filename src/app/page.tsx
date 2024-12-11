"use client"
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";
import { useAuth, } from "@/context/AuthContext";
import { useEffect } from "react";
import Chart from "@/components/Charts/page";

export default function Home() {
  const { user } = useAuth();

  // If the user is not logged in, show the SignIn page
  if (!user) {
    return <div style={{ height: "100vh" }}>
      <SignIn />
    </div>  }

  return (
    <DefaultLayout>
      <Chart/>
    </DefaultLayout>
  );
}
