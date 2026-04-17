import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Button from "../components/Button";
import Link from "next/link";
import SignOutButton from "../_components/SignOut";

async function getBackendSession() {
  const incomingHeaders = await headers();
  const cookie = incomingHeaders.get("cookie") ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_URL}/api/auth/get-session`,
    {
      method: "GET",
      headers: {
        cookie,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProfilePage() {
  const session = await getBackendSession();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const defaultAvatar = "/avatar.png";

  return (
    <div className="flex p-9">
      <div className="py-10 rounded-lg">
        <div className="flex items-center justify-center border-gray-400 rounded-2xl">
          <div className="flex flex-col gap-8 rounded-lg p-6">
            <div className="flex justify-center">
              <Image
                className="rounded-full"
                src={user.image || defaultAvatar}
                width={120}
                height={120}
                alt={user.name || "Avatar"}
                priority
              />
            </div>

            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-xl font-semibold">Full Name:</h1>
              <h1 className="text-xl">{user.name || "Not provided"}</h1>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-xl font-semibold">Email:</h1>
              <p className="text-xl">{user.email || "Not provided"}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-xl font-semibold">Role:</h1>
              <p className="text-xl capitalize">{user.role || "user"}</p>
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                className="text-xl border-2 border-gray-400 rounded-md px-3 py-2 w-full text-black focus:outline-none focus:border-blue-500"
                placeholder="About me"
              />
              <Button button="Post" type="submit" />
            </div>

            {user.role === "admin" && (
              <Link href="/Adminpage">
                <Button button="Admin Panel" type="button" />
              </Link>
            )}

            <SignOutButton />
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Progress</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">XP Number:</p>
              <p className="text-xl font-bold">50</p>
            </div>
            <div>
              <p className="text-gray-600">Level:</p>
              <p className="text-xl font-bold">1</p>
            </div>
            <div>
              <p className="text-gray-600">Rank:</p>
              <p className="text-xl font-bold">Beginner</p>
            </div>
            <div>
              <p className="text-gray-600">Certificates:</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}