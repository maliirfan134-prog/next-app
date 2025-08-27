"use client";

import { useAtom } from "jotai";
import { authTokenAtom } from "../../store/authStore";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [, setAuthToken] = useAtom(authTokenAtom);
  const router = useRouter();

  const handleLogout = () => {
    // Clear Jotai state
    setAuthToken(null);

    // Clear localStorage
    localStorage.removeItem("authToken");

    // Redirect to Login page
    router.push("/");  // 👈 replace use kiya taki back button se wapis dashboard na aaye
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
}
