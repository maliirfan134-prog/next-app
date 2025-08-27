"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authTokenAtom } from "../../store/authStore";
import { useRouter } from "next/navigation";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";

export default function MainLayout({
  children,
  
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useAtom(authTokenAtom);
  console.log(auth,'token');

  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");

    if (!auth && !savedToken) {
      // 👈 agar token nahi hai to login page pe bhejo
      router.push("/");
    } else {
      // 👌 user authenticated hai
      if (savedToken && !auth) {
        setAuth(savedToken); // atom me restore bhi kar do
      }
      setCheckingAuth(false);
    }
  }, [auth, router, setAuth]);

  if (checkingAuth) {
    return <p style={{ padding: 30 }}>Checking authentication...</p>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
