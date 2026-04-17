"use client";

import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/Sign-up");
        },
      },
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 rounded-md bg-red-600 text-white"
    >
      Sign Out
    </button>
  );
}